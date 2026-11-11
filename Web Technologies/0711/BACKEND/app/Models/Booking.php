<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relation\HasOne;
use Illuminate\Database\Eloquent\Relation\BelongsTo;

class Booking extends Model
{
    protected $guarded = ['id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

        public function workshop(): BelongsTo
    {
        return $this->belongsTo(Workshop::class);
    }

        public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }
}
