<?php

namespace App\http\Controller;

use App\Models\Booking;
use App\Models\Workshop;
use App\Http\Request\StoreBookingRequest;
use Illuminate\Http\Request;
Use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function myBookings(Request $request)
    {
        $bookings = Booking::with([
            'workshop:id, category_id,title,slug,event_date',
            'workshop.category:id,name',
            'payment'
        ])->where('user_id', $request->user()->id)->get();

        return response()->json(['data' => $bookings]);
    }

    public function store(StoreBookingRequest $request)
    {
        try {
            $booking = DB::transaction(function () use ($request) {
                $workshop = Workshop::where('id', $request->workshop_id);

                if ($workshop->status === 'closed') {
                    throw new \Exception('Workshop is already closed');
                }
                if (($workshop->quota - $workshop->booked_count) < $request->tickets) {
                    throw new \Exception('Not enough quota available');
                }

                $workshop->increment('booking_count', $request->tickets);

                return Booking::create([
                    'user_id'       => $request->user()->id,
                    'workshop_id'   => $workshop->id,
                    'booking_code'  => 'BK-' . strtoupper(uniqid()),
                    'tickets'       => $request->tickets,
                    'status'        => 'pending',
                ]);
            });

            return response()->json(['message' => 'Success', 'data' => $booking], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function pay(Request $request, Booking $booking)
    {
        DB::transaction(function () use ($request, $booking) {
            $totalPrice = $booking->tickets * $booking->workshop->price;

            $booking->payment()->create([
                'amount'    => $request->amount,
                'paid_at'   => now()
            ]);

            $booking->update(['status' => 'paid']);

            if ($request->amount < $totalPrice) {
                throw new \Exception('Insufficient amount');
            }
        });

        return response()->json(['message' => 'Payment successful']);
    }
}