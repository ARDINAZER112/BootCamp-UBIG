<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Installment;
use Illuminate\Http\JsonResponse;

class InstalmentController extends Controller
{
    public function index(): JsonResponse
    {
        $cars = Installment::with(['brand', 'availableMonths'])
            ->orderBy('id')
            ->get()
            ->map(fn(Installment $i) => $this->format($i))
            ->values();

        return response()->json(['cars' => $cars]);
    }

    public function show(string $id): JsonResponse
    {
        $installment = Installment::with(['brand', 'availableMonths'])->find($id);

        if (!$installment) {
            return response()->json(['message' => 'Instalment not found'], 404);
        }

        return response()->json(['instalment' => $this->format($installment)]);
    }

    private function format(Installment $installment): array
    {
        return $installment->toCarArray() + [
            'available_month' => $installment->availableMonths->map(fn($m) => [
                'month' => $m->month,
                'description' => $m->description,
                'nominal' => (string) $m->nominal,
            ])->values(),
        ];
    }
}
