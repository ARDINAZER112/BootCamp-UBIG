<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vaccination extends Model
{
    protected $table = 'vaccinations';
    public $timestamps = false;

    protected $fillable = ['dose', 'date', 'society_id', 'spot_id', 'vaccine_id', 'doctor_id', 'officer_id'];

    protected $casts = ['date' => 'date:Y-m-d'];

    public function spot(): BelongsTo
    {
        return $this->belongsTo(Spot::class);
    }

    public function vaccine(): BelongsTo
    {
        return $this->belongsTo(Vaccine::class);
    }

    /** Vaccinator = dokter yang ditunjuk petugas. */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Medical::class, 'doctor_id');
    }
}
