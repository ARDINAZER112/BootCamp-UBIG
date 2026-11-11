<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
    protected $table = 'lessons';

    protected $fillable = ['set_id', 'name', 'order'];

    public function set(): BelongsTo
    {
        return $this->belongsTo(CourseSet::class, 'set_id');
    }

    public function contents(): HasMany
    {
        return $this->hasMany(LessonContent::class, 'lesson_id');
    }
}
