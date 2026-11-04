<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Consultation extends Model
{
    protected $table = 'consultations';
    public $timestamps = false;

    protected $fillable = ['society_id', 'doctor_id', 'status', 'disease_history', 'current_symptoms', 'doctor_notes'];

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Medical::class, 'doctor_id');
    }
}
