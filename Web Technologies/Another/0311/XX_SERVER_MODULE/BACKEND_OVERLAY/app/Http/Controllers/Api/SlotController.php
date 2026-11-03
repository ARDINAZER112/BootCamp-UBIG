<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ObservatorySlot;
use Illuminate\Http\Request;

class SlotController extends Controller
{
    public function index(Request $request)
    {
        $slots = ObservatorySlot::with('telescope:id,name,type')
            ->filter($request->only(['search', 'type', 'min_price', 'max_price']))
            ->orderBy('event_date')
            ->get()
            ->map(fn ($slot) => $this->format($slot, false));

        return response()->json(['slots' => $slots], 200);
    }

    public function show(ObservatorySlot $slot)
    {
        $slot->load('telescope:id,name,type');

        return response()->json(['slot' => $this->format($slot, true)], 200);
    }

    private function format(ObservatorySlot $slot, bool $withDescription): array
    {
        $data = [
            'id'             => $slot->id,
            'event_name'     => $slot->event_name,
            'event_date'     => $slot->event_date,
            'price_per_slot' => (string) $slot->price_per_slot,
            'max_capacity'   => $slot->max_capacity,
            'booked_count'   => $slot->booked_count,
        ];

        if ($withDescription) {
            $data['description'] = $slot->description;
        }

        $data['telescope'] = [
            'id'   => $slot->telescope->id,
            'name' => $slot->telescope->name,
            'type' => $slot->telescope->type,
        ];

        return $data;
    }
}
