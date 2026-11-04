<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'disease_history'  => 'nullable|string',
            'current_symptoms' => 'nullable|string',
        ]);

        Consultation::firstOrCreate(
            ['society_id' => $request->user()->id],
            [
                'status'           => 'pending',
                'disease_history'  => $data['disease_history'] ?? null,
                'current_symptoms' => $data['current_symptoms'] ?? null,
            ]
        );

        return response()->json(['message' => 'Request consultation sent successful'], 200);
    }

    public function show(Request $request)
    {
        $consultation = Consultation::with('doctor:id,role,name')
            ->where('society_id', $request->user()->id)
            ->first();

        if (! $consultation) {
            return response()->json(['consultation' => null], 200);
        }

        return response()->json([
            'consultation' => [
                'id'               => $consultation->id,
                'status'           => $consultation->status === 'declined' ? 'rejected' : $consultation->status,
                'disease_history'  => $consultation->disease_history,
                'current_symptoms' => $consultation->current_symptoms,
                'doctor_notes'     => $consultation->doctor_notes,
                'doctor'           => $consultation->doctor
                    ? [
                        'id'   => $consultation->doctor->id,
                        'role' => $consultation->doctor->role,
                        'name' => $consultation->doctor->name,
                    ]
                    : null,
            ],
        ], 200);
    }
}
