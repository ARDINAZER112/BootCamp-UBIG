<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Developer;
use App\Models\Validation;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'github_url'     => 'required|url',
            'tech_stack'     => 'required|string',
            'monthly_income' => 'required|numeric',
        ]);

        $developer = $request->user();

        if (! $developer instanceof Developer) {
            return response()->json(['message' => 'Forbidden access'], 403);
        }

        $alreadySubmitted = Validation::where('developer_id', $developer->id)
            ->whereIn('status', ['pending', 'accepted'])
            ->exists();

        if ($alreadySubmitted) {
            return response()->json([
                'message' => 'A validation request has already been submitted and is either pending or already approved',
            ], 400);
        }

        Validation::create($data + [
            'developer_id' => $developer->id,
            'status'       => 'pending',
        ]);

        return response()->json([
            'message' => 'Request data validation sent successful',
        ], 200);
    }
}