<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use Illuminate\Http\Request;
use App\Http\Models\Society;

class ConsultationController extends Controller
{
    public function store(Request $request)
    {
        $society = $request->attributes->get('society');

        if ($society->consultation) {
            return response()->json(['message' => 'Consultation already requested'], 401);
        }

        Consultation::create([
            'society_id' => $society->id,
            'disease_history' => $request->input('disease_history'),
            'current_symptoms' => $request->input('current_symptoms'),
        ]);

        return response()->json(['message' => 'Request consultation sent successful'], 200);
    }

    public function show(Request $request)
    {
        $society = $request->attributes->get('society');

        $c = Consultation::with('doctor')
            ->where('society_id', $society->id)
            ->first();

        if (!$c) {
            return response()->json(['consultation' => null], 200);
        }

        return response()->json([
            'consultation' => [
                'id' => $c->id,
                'status' => $c->status === 'declined' ? 'rejected' : $c->status,
                'disease_history' => $c->disease_history,
                'current_symptoms' => $c->current_symptoms,
                'doctor_notes' => $c->doctor_notes,
                'doctor' => $c->doctor ? [
                    'id' => $c->doctor->id,
                    'role' => $c->doctor->role,
                    'name' => $c->doctor->name,
                ] : null,
            ],
        ], 200);
    }
}