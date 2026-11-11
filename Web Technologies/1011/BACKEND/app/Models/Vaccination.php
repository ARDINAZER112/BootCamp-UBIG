<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vaccination extends Model
{
    protected $table = 'vaccinations';
    public $timestamps = false;
    protected $guarded = [];

    public function doctor()
    {
        return $this->belongsTo(Medical::class, 'doctor_id');
    }

    public function spot()
    {
        return $this->belongsTo(Spot::class);
    }

    public function vaccine()
    {
        return $this->belongsTo(Vaccine::class);
    }

    public function society()
    {
        return $this->belongsTo(Society::class);
    }
}
