<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AvailableMonth;
use App\Models\InstallmentApplySociety;
use App\Models\InstallmentApplyStatus;
use App\Models\Validation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    /** A4a-A4e - Mengajukan instalment (hanya sekali, validation harus accepted). */
    public function store(Request $request): JsonResponse
    {
        $society = $request->user();

        // A4c - data validation harus sudah diterima validator
        $accepted = Validation::where('society_id', $society->id)
            ->where('status', 'accepted')
            ->exists();

        if (! $accepted) {
            return response()->json([
                'message' => 'Your data validator must be accepted by validator before',
            ], 401);
        }

        // A4d - validasi field
        $validator = Validator::make($request->all(), [
            'instalment_id' => 'required|integer|exists:installment,id',
            'months' => 'required|integer',
            'notes' => 'nullable|string',
        ]);

        $month = null;
        if (! $validator->fails()) {
            $month = AvailableMonth::where('installment_id', $request->input('instalment_id'))
                ->where('month', $request->input('months'))
                ->first();

            if (! $month) {
                $validator->errors()->add('months', 'The selected months is invalid for this instalment.');
            }
        }

        if ($validator->errors()->isNotEmpty()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors(),
            ], 401);
        }

        // A4e - hanya boleh mengajukan sekali
        if (InstallmentApplySociety::where('society_id', $society->id)->exists()) {
            return response()->json([
                'message' => 'Application for a instalment can only be once',
            ], 401);
        }

        DB::transaction(function () use ($request, $society, $month) {
            $apply = InstallmentApplySociety::create([
                'notes' => $request->input('notes'),
                'available_month_id' => $month->id,
                'date' => now()->toDateString(),
                'society_id' => $society->id,
                'installment_id' => $month->installment_id,
            ]);

            InstallmentApplyStatus::create([
                'date' => now()->toDateString(),
                'society_id' => $society->id,
                'installment_id' => $month->installment_id,
                'available_month_id' => $month->id,
                'installment_apply_societies_id' => $apply->id,
                'status' => 'pending',
            ]);
        });

        return response()->json(['message' => 'Applying for Instalment successful']);
    }

    /** A4f - Semua pengajuan instalment milik society, dikelompokkan per mobil. */
    public function index(Request $request): JsonResponse
    {
        $instalments = InstallmentApplySociety::with(['installment.brand', 'availableMonth', 'status'])
            ->where('society_id', $request->user()->id)
            ->orderBy('id')
            ->get()
            ->filter(fn ($a) => $a->installment !== null)
            ->groupBy('installment_id')
            ->map(fn ($items) => $items->first()->installment->toCarArray() + [
                'applications' => $items->map(fn ($a) => [
                    'month' => (string) $a->availableMonth?->month,
                    'nominal' => (string) $a->availableMonth?->nominal,
                    'apply_status' => $a->status?->status ?? 'pending',
                    'notes' => $a->notes,
                    'date' => $a->date,
                ])->values(),
            ])
            ->values();

        return response()->json(['instalments' => $instalments]);
    }
}
