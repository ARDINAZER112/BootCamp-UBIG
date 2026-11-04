<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Spot extends Model
{
    protected $table = 'spots';
    public $timestamps = false;

    public function regional(): BelongsTo
    {
        return $this->belongsTo(Regional::class);
    }

    public function vaccines(): BelongsToMany
    {
        return $this->belongsToMany(Vaccine::class, 'spot_vaccines', 'spot_id', 'vaccine_id');
    }
}
