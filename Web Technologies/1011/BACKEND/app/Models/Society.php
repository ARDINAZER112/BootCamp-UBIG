<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Society extends Model
{
    protected $table = 'societies';
    public $timestamps = false;
    protected $guarded = [];

    public function regional()
    {
        return $this->belongsTo(Regional::class, 'regional_id');
    }

    // Alias for backward compatibility
    public function regionals()
    {
        return $this->belongsTo(Regional::class, 'regional_id');
    }

    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class);
    }

    public function consultation()
    {
        return $this->hasOne(Consultation::class, 'society_id');
    }

    // Alias for backward compatibility
    public function consultations()
    {
        return $this->hasOne(Consultation::class, 'society_id');
    }
}
