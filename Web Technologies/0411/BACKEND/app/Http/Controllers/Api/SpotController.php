<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Spot;
use App\Models\Vaccination;
use App\Models\Vaccine;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SpotController extends Controller
{
    public function index(Request $request)
    {
        $vaccines = Vaccine::orderBy('id')->get();

        $spots = Spot::with('vaccines')
            ->where('regional_id', $request->user()->regional_id)
            ->orderBy('id')
            ->get()
            ->map(fn ($spot) => [
                'id'                 => $spot->id,
                'name'               => $spot->name,
                'address'            => $spot->address,
                'serve'              => $spot->serve,
                'capacity'           => $spot->capacity,
                // Semua vaksin ditampilkan: true jika tersedia di spot ini
                'available_vaccines' => $vaccines->mapWithKeys(fn ($v) => [
                    $v->name => $spot->vaccines->contains('id', $v->id),
                ]),
            ]);

        return response()->json(['spots' => $spots], 200);
    }

    public function show(Request $request, $id)
    {
        $request->validate(
            ['date' => 'nullable|date_format:Y-m-d'],
            ['date.date_format' => 'The date does not match the format Y-m-d.']
        );

        $spot = Spot::findOrFail($id);

        $date = $request->filled('date')
            ? Carbon::createFromFormat('Y-m-d', $request->query('date'))
            : Carbon::today();

        $count = Vaccination::where('spot_id', $spot->id)
            ->whereDate('date', $date->toDateString())
            ->count();

        return response()->json([
            'date' => $date->format('F j, Y'),
            'spot' => [
                'id'       => $spot->id,
                'name'     => $spot->name,
                'address'  => $spot->address,
                'serve'    => $spot->serve,
                'capacity' => $spot->capacity,
            ],
            'vaccinations_count' => $count,
        ], 200);
    }
}
