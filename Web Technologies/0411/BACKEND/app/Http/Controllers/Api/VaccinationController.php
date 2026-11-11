<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\Society;
use App\Models\Vaccination;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class VaccinationController extends Controller
{
    public function store(Request $request)
    {
        $society = $request->user();

        $accepted = Consultation::where('society_id', $society->id)
            ->where('status', 'accepted')
            ->exists();

        if (! $accepted) {
            return $this->fail('Your consultation must be accepted by doctor before');
        }

        $validator = Validator::make($request->all(), [
            'spot_id' => 'required|integer|exists:spots,id',
            'date'    => 'required|date_format:Y-m-d',
        ], [
            'date.date_format' => 'The date does not match the format Y-m-d.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors'  => $validator->errors(),
            ], 401);
        }

        return DB::transaction(function () use ($request, $society) {
            Society::where('id', $society->id)->lockForUpdate()->first();

            $existing = Vaccination::where('society_id', $society->id)->orderBy('dose')->get();

            if ($existing->count() >= 2) {
                return $this->fail('Society has been 2x vaccinated');
            }

            $date = Carbon::createFromFormat('Y-m-d', $request->input('date'))->startOfDay();

            // A4e - dosis kedua minimal 30 hari setelah dosis pertama
            if ($existing->count() === 1) {
                $first = $existing->first();

                if ($date->lt($first->date->copy()->startOfDay()->addDays(30))) {
                    return $this->fail('Wait at least +30 days from 1st Vaccination');
                }
            }

            $dose = $existing->count() + 1;

            Vaccination::create([
                'dose'       => $dose,
                'date'       => $date->toDateString(),
                'society_id' => $society->id,
                'spot_id'    => (int) $request->input('spot_id'),
            ]);

            return response()->json([
                'message' => ($dose === 1 ? 'First' : 'Second') . ' vaccination registered successful',
            ], 200);
        });
    }

    public function index(Request $request)
    {
        $items = Vaccination::with(['spot.regional', 'vaccine', 'doctor'])
            ->where('society_id', $request->user()->id)
            ->orderBy('dose')
            ->get()
            ->keyBy('dose');

        return response()->json([
            'vaccinations' => [
                'first'  => $this->format($items->get(1)),
                'second' => $this->format($items->get(2)),
            ],
        ], 200);
    }

    private function format(?Vaccination $v): ?array
    {
        if (! $v) {
            return null;
        }

        // Nomor antrian: urutan pendaftaran di spot dan tanggal yang sama
        $queue = $v->spot_id
            ? Vaccination::where('spot_id', $v->spot_id)
                ->whereDate('date', $v->date->toDateString())
                ->where('id', '<=', $v->id)
                ->count()
            : null;

        return [
            'queue'            => $queue,
            'dose'             => $v->dose,
            'vaccination_date' => $v->date->toDateString(),
            'spot'             => $v->spot ? [
                'id'       => $v->spot->id,
                'name'     => $v->spot->name,
                'address'  => $v->spot->address,
                'serve'    => $v->spot->serve,
                'capacity' => $v->spot->capacity,
                'regional' => [
                    'id'       => $v->spot->regional->id,
                    'province' => $v->spot->regional->province,
                    'district' => $v->spot->regional->district,
                ],
            ] : null,
            // Belum diproses petugas (vaksin belum diberikan) = pending
            'status'           => $v->vaccine_id ? 'done' : 'pending',
            'vaccine'          => $v->vaccine ? ['id' => $v->vaccine->id, 'name' => $v->vaccine->name] : null,
            'vaccinator'       => $v->doctor ? [
                'id'   => $v->doctor->id,
                'role' => $v->doctor->role,
                'name' => $v->doctor->name,
            ] : null,
        ];
    }

    private function fail(string $message)
    {
        return response()->json(['message' => $message], 401);
    }
}
