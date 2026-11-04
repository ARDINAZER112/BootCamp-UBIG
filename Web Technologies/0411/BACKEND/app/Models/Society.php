<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Society extends Model
{
    protected $table = 'societies';
    public $timestamps = false;

    protected $hidden = ['password', 'login_tokens'];

    public function regional(): BelongsTo
    {
        return $this->belongsTo(Regional::class);
    }

    public function consultation(): HasOne
    {
        return $this->hasOne(Consultation::class);
    }

    public function vaccinations(): HasMany
    {
        return $this->hasMany(Vaccination::class);
    }
}
