<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Developer extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = ['full_name', 'username', 'password'];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return ['password' => 'hashed'];
    }

    public function validations(): HasMany
    {
        return $this->hasMany(Validation::class);
    }
}