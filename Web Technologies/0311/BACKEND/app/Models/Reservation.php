<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    protected $table = 'reservations';
    public $timestamps = false;

    protected $fillable = [
        'society_id', 'observatory_slot_id', 'booking_code',
        'total_tickets', 'total_price', 'status', 'notes',
    ];

    public function slot(): BelongsTo
    {
        return $this->belongsTo(ObservatorySlot::class, 'observatory_slot_id');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(ReservationLog::class);
    }
}
