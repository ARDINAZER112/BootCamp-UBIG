<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ObservatorySlot;
use App\Models\Reservation;
use App\Models\ReservationLog;
use App\Models\Validation;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $reservations = Reservation::with('slot.telescope:id,name')
            ->where('society_id', $request->user()->id)
            ->orderBy('id')
            ->get()
            ->map(fn ($r) => [
                'id'            => $r->id,
                'booking_code'  => $r->booking_code,
                'total_tickets' => $r->total_tickets,
                'total_price'   => (string) $r->total_price,
                'status'        => $r->status,
                'notes'         => $r->notes,
                'slot'          => [
                    'id'         => $r->slot->id,
                    'event_name' => $r->slot->event_name,
                    'event_date' => $r->slot->event_date,
                    'telescope'  => $r->slot->telescope->name,
                ],
            ]);

        return response()->json(['reservations' => $reservations], 200);
    }

    public function store(Request $request)
    {
        $society = $request->user();

        // A4c - validasi data harus sudah accepted
        $accepted = Validation::where('society_id', $society->id)
            ->where('status', 'accepted')
            ->exists();

        if (! $accepted) {
            return response()->json([
                'message' => 'Your data validation must be accepted by validator before',
            ], 401);
        }

        // A4d - field tidak valid (soal meminta 401, bukan 422)
        $validator = Validator::make($request->all(), [
            'observatory_slot_id' => 'required|integer|exists:observatory_slots,id',
            'requested_tickets'   => 'required|integer|min:1',
            'notes'               => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors'  => $validator->errors(),
            ], 401);
        }

        $slotId  = (int) $request->observatory_slot_id;
        $tickets = (int) $request->requested_tickets;

        DB::transaction(function () use ($society, $slotId, $tickets, $request) {
            // Pessimistic locking: kunci baris slot sampai transaksi selesai
            $slot = ObservatorySlot::where('id', $slotId)->lockForUpdate()->firstOrFail();

            // A4e - hanya sekali per slot (reservasi cancelled tidak dihitung)
            $already = Reservation::where('society_id', $society->id)
                ->where('observatory_slot_id', $slot->id)
                ->where('status', '!=', 'cancelled')
                ->exists();

            if ($already) {
                throw new HttpResponseException(response()->json([
                    'message' => 'Application for a reservation can only be once',
                ], 401));
            }

            // A4f - kuota tiket
            if ($tickets > ($slot->max_capacity - $slot->booked_count)) {
                throw new HttpResponseException(response()->json([
                    'message' => 'Requested ticket quantity exceeds available slot capacity',
                ], 422));
            }

            $slot->increment('booked_count', $tickets);

            $reservation = Reservation::create([
                'society_id'          => $society->id,
                'observatory_slot_id' => $slot->id,
                'booking_code'        => $this->generateBookingCode(),
                'total_tickets'       => $tickets,
                'total_price'         => $slot->price_per_slot * $tickets,
                'status'              => 'pending',
                'notes'               => $request->notes,
            ]);

            ReservationLog::create([
                'reservation_id' => $reservation->id,
                'action'         => 'CREATED',
                'notes'          => "Reservation submitted successfully by society ID {$society->id}",
            ]);
        });

        return response()->json(['message' => 'Applying for reservation successful'], 200);
    }

    /**
     * Endpoint bantu untuk Postman (dipanggil di pre-request A4a):
     * menghapus reservasi society pada slot tertentu dan mengembalikan kuota,
     * supaya skenario "apply berhasil" bisa diulang.
     */
    public function resetForTesting(Request $request)
    {
        $societyId = (int) ($request->input('society_id') ?? $request->user()->id);
        $slotId    = (int) $request->input('observatory_slot_id');

        DB::transaction(function () use ($societyId, $slotId) {
            $slot = ObservatorySlot::where('id', $slotId)->lockForUpdate()->first();

            $reservations = Reservation::where('society_id', $societyId)
                ->where('observatory_slot_id', $slotId)
                ->get();

            foreach ($reservations as $reservation) {
                if ($slot) {
                    $slot->booked_count = max(0, $slot->booked_count - $reservation->total_tickets);
                }
                $reservation->delete(); // reservation_logs ikut terhapus (ON DELETE CASCADE)
            }

            $slot?->save();
        });

        return response()->json(['message' => 'Reservation reset'], 200);
    }

    /** Format OBS-YYYYMMDD-NNN, nomor urut per hari. */
    private function generateBookingCode(): string
    {
        $prefix = 'OBS-' . now()->format('Ymd') . '-';

        $last = Reservation::where('booking_code', 'like', $prefix . '%')
            ->lockForUpdate()
            ->orderByDesc('booking_code')
            ->value('booking_code');

        $next = $last ? ((int) substr($last, -3)) + 1 : 1;

        return $prefix . str_pad((string) $next, 3, '0', STR_PAD_LEFT);
    }
}
