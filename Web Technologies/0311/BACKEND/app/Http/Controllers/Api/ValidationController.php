<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Validation;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'institution'     => 'required|string|max:255',
            'occupation'      => 'required|string|max:255',
            'reason_accepted' => 'required|string',
        ]);

        $society = $request->user();

        $exists = Validation::where('society_id', $society->id)->exists();

        if (! $exists) {
            Validation::create([
                'society_id' => $society->id,
                'status'     => 'pending',
                ...$data,
            ]);
        }

        return response()->json(['message' => 'Request data validation sent successful'], 200);
    }

    public function show(Request $request)
    {
        $validation = Validation::with('validator:id,name')
            ->where('society_id', $request->user()->id)
            ->first();

        if (! $validation) {
            return response()->json(['validation' => null], 200);
        }

        return response()->json([
            'validation' => [
                'id'              => $validation->id,
                'status'          => $validation->status === 'declined' ? 'rejected' : $validation->status,
                'institution'     => $validation->institution,
                'occupation'      => $validation->occupation,
                'reason_accepted' => $validation->reason_accepted,
                'validator_notes' => $validation->validator_notes,
                'validator'       => $validation->validator
                    ? ['id' => $validation->validator->id, 'name' => $validation->validator->name]
                    : null,
            ],
        ], 200);
    }
}
