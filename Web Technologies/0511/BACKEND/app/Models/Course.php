<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    protected $table = 'courses';

    // is_published sengaja tidak di-cast: B4/B5/E2 mengembalikan angka (1/0)
    protected $fillable = ['name', 'slug', 'description', 'is_published'];

    public function sets(): HasMany
    {
        return $this->hasMany(CourseSet::class, 'course_id');
    }
}
