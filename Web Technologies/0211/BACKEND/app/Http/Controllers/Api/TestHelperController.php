<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InstallmentApplySociety;
use App\Models\InstallmentApplyStatus;
use App\Models\Validation;
use App\Models\Validator as ValidatorModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestHelperController extends Controller
{
    public function reset(Request $request): JsonResponse
    {
        $societyId = (int) $request->input('society_id', $request->user()->id);

        DB::transaction(function () use ($societyId) {
            InstallmentApplyStatus::where('society_id', $societyId)->delete();
            InstallmentApplySociety::where('society_id', $societyId)->delete();
        });

        return response()->json(['message' => 'Application history reset']);
    }

    public function approve(Request $request): JsonResponse
    {
        $societyId = (int) $request->input('society_id', $request->user()->id);
        $validatorId = ValidatorModel::where('role', 'validator')->orderBy('id')->value('id');

        $validation = Validation::firstOrNew(['society_id' => $societyId]);

        if (!$validation->exists) {
            $validation->job = 'Programmer';
            $validation->job_description = 'Software developer web';
            $validation->income = 5000000;
            $validation->reason_accepted = 'Auto-created by test helper';
        }

        $validation->status = 'accepted';
        $validation->validator_id = $validatorId;
        $validation->validator_notes = $validation->validator_notes ?: 'Approved by test helper';
        $validation->save();

        return response()->json(['message' => 'Validation approved']);
    }
}
