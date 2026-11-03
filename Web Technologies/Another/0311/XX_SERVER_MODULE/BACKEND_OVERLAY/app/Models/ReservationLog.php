<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationLog extends Model
{
    protected $table = 'reservation_logs';
    public $timestamps = false; // created_at diisi default DB (current_timestamp)

    protected $fillable = ['reservation_id', 'action', 'notes'];
}
