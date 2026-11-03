<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Validation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ValidationController extends Controller
{
    /** A2a - Request data validation (hanya boleh sekali per society). */
    public function store(Request $request): JsonResponse
    {
        $society = $request->user();

        $validator = Validator::make($request->all(), [
            'job' => 'nullable|string|max:255',
            'job_description' => 'nullable|string',
            'income' => 'nullable|integer|min:0|max:2147483647',
            'reason_accepted' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors(),
            ], 401);
        }

        if (Validation::where('society_id', $society->id)->exists()) {
            return response()->json(['message' => 'Request data validation can only be once'], 401);
        }

        Validation::create([
            'society_id' => $society->id,
            'status' => 'pending',
            'job' => $request->input('job'),
            'job_description' => $request->input('job_description'),
            'income' => $request->input('income'),
            'reason_accepted' => $request->input('reason_accepted'),
        ]);

        return response()->json(['message' => 'Request data validation sent successful']);
    }

    /** A2c - Ambil data validation milik society yang sedang login. */
    public function show(Request $request): JsonResponse
    {
        $validation = Validation::with('validator')
            ->where('society_id', $request->user()->id)
            ->first();

        if (! $validation) {
            return response()->json(['validation' => null]);
        }

        return response()->json([
            'validation' => [
                'id' => $validation->id,
                'status' => $validation->apiStatus(),
                'job' => $validation->job,
                'job_description' => $validation->job_description,
                'income' => $validation->income === null ? null : (string) $validation->income,
                'reason_accepted' => $validation->reason_accepted,
                'validator_notes' => $validation->validator_notes,
                'validator' => $validation->validator ? [
                    'id' => $validation->validator->id,
                    'role' => $validation->validator->role,
                    'name' => $validation->validator->name,
                ] : null,
            ],
        ]);
    }
}
