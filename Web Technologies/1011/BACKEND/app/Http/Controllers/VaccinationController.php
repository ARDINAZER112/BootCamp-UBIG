<?php
namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\Vaccination;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VaccinationController extends Controller
{
    public function store(Request $request)
    {
        $society = $request->attributes->get('society');

        $consultation = Consultation::where('society_id', $society->id)->first();
        if (!$consultation || $consultation->status !== 'accepted') {
            return response()->json(['message' => 'Your consultation must be accepted by doctor before'], 401);
        }

        $validator = Validator::make($request->all(), [
            'spot_id' => 'required|exists:spots,id',
            'date' => 'required|date_format:Y-m-d',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors(),
            ], 401);
        }

        $count = Vaccination::where('society_id', $society->id)->count();

        if ($count >= 2) {
            return response()->json(['message' => 'Society has been 2x vaccinated'], 401);
        }

        if ($count === 1) {
            $first = Vaccination::where('society_id', $society->id)->where('dose', 1)->first();
            $gap = Carbon::parse($first->date)->diffInDays(Carbon::parse($request->date), false);
            if ($gap < 30) {
                return response()->json(['message' => 'Wait at least +30 days from 1st Vaccination'], 401);
            }
        }

        $dose = $count + 1;
        Vaccination::create([
            'dose' => $dose,
            'date' => $request->date,
            'society_id' => $society->id,
            'spot_id' => $request->spot_id,
        ]);

        $label = $dose === 1 ? 'First' : 'Second';
        return response()->json(['message' => "$label vaccination registered successful"], 200);
    }

    public function index(Request $request)
    {
        $society = $request->attributes->get('society');

        $list = Vaccination::with(['spot.regional', 'vaccine', 'doctor'])
            ->where('society_id', $society->id)
            ->get()
            ->keyBy('dose');

        return response()->json([
            'vaccinations' => [
                'first' => $this->format($list->get(1)),
                'second' => $this->format($list->get(2)),
            ],
        ], 200);
    }

    private function format($v)
    {
        if (!$v)
            return null;

        $queue = Vaccination::where('spot_id', $v->spot_id)
            ->where('date', $v->date)
            ->where('id', '<=', $v->id)
            ->count();

        return [
            'queue' => $queue,
            'dose' => $v->dose,
            'vaccination_date' => $v->date,
            'spot' => [
                'id' => $v->spot->id,
                'name' => $v->spot->name,
                'address' => $v->spot->address,
                'serve' => $v->spot->serve,
                'capacity' => $v->spot->capacity,
                'regional' => [
                    'id' => $v->spot->regional->id,
                    'province' => $v->spot->regional->province,
                    'district' => $v->spot->regional->district,
                ],
            ],
            'status' => $v->vaccine_id ? 'done' : 'pending',
            'vaccine' => $v->vaccine ? ['id' => $v->vaccine->id, 'name' => $v->vaccine->name] : null,
            'vaccinator' => $v->doctor ? [
                'id' => $v->doctor->id,
                'role' => $v->doctor->role,
                'name' => $v->doctor->name,
            ] : null,
        ];
    }
}