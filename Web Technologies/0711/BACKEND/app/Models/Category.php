<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relation\HasMany;

class Category extends Model
{
    public function workshops(): HasMany
    {
        return $this->hasMany(Workshops::class);
    }
}
