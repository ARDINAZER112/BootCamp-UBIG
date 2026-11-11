<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Spot;
use App\Models\Vaccination;
use App\Models\Vaccine;
use Carbon\Carbon;

class SpotController extends Controller
{
    public function index(Request $request)
    {
        $society = $request->attributes->get('society');
        $vaccines = Vaccine::all();

        $spots = Spot::with('vaccines')
            ->where('regional_id', $society->regional_id)
            ->get()
            ->map(function ($spot) use ($vaccines) {
                $ownedIds = $spot->vaccines->pluck('id');
                $available = [];
                foreach ($vaccines as $v) {
                    $available[$v->name] = $ownedIds->contains($v->id);
                }
                return [
                    'id' => $spot->id,
                    'name' => $spot->name,
                    'address' => $spot->address,
                    'serve' => $spot->serve,
                    'capacity' => $spot->capacity,
                    'available_vaccines' => $available,
                ];
            });

        return response()->json(['spots' => $spots], 200);
    }

    public function show(Request $request, $id)
    {
        $spot = Spot::find($id);
        if (!$spot) {
            return response()->json(['message' => 'Spot not found'], 404);
        }

        $date = $request->query('date', Carbon::today()->toDateString());
        $count = Vaccination::where('spot_id', $spot->id)->where('date', $date)->count();

        return response()->json([
            'date' => Carbon::parse($date)->format('F j, Y'),
            'spot' => [
                'id' => $spot->id,
                'name' => $spot->name,
                'address' => $spot->address,
                'serve' => $spot->serve,
                'capacity' => $spot->capacity,
            ],
            'vaccinations_count' => $count,
        ], 200);
    }
}
