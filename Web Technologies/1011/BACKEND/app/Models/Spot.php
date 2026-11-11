<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spot extends Model
{
    protected $table = 'spots';
    public $timestamps = false;

    public function regional()
    {
        return $this->belongsTo(Regional::class, 'regional_id');
    }

    public function vaccines()
    {
        return $this->belongsToMany(Vaccine::class, 'spot_vaccines', 'spot_id', 'vaccine_id');
    }
}
