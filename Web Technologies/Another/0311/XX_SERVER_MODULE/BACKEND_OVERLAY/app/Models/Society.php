<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Society extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'societies';
    public $timestamps = false;

    protected $fillable = [
        'username', 'password', 'name', 'member_type', 'born_date',
        'gender', 'address', 'regional_id', 'login_tokens',
    ];

    protected $hidden = ['password', 'login_tokens'];

    public function regional(): BelongsTo
    {
        return $this->belongsTo(Regional::class);
    }

    public function validation(): HasOne
    {
        return $this->hasOne(Validation::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
