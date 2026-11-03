<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class Society extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'societies';

    public $timestamps = false;

    protected $hidden = ['password', 'login_tokens'];

    public function regional(): BelongsTo
    {
        return $this->belongsTo(Regional::class, 'regional_id');
    }

    public function validation(): HasOne
    {
        return $this->hasOne(Validation::class, 'society_id');
    }

    public function applications(): HasMany
    {
        return $this->hasMany(InstallmentApplySociety::class, 'society_id');
    }

    /**
     * Data seed memakai password plain text ("121212"), tetapi hash bcrypt
     * juga didukung supaya aman jika password di-hash di kemudian hari.
     */
    public function passwordMatches(string $plain): bool
    {
        $stored = (string) $this->password;

        if (str_starts_with($stored, '$2y$') || str_starts_with($stored, '$argon')) {
            return Hash::check($plain, $stored);
        }

        return hash_equals($stored, $plain);
    }
}
