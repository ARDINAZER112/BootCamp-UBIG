<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LessonContent extends Model
{
    protected $table = 'lesson_contents';

    protected $fillable = ['lesson_id', 'type', 'content', 'order'];

    public function options(): HasMany
    {
        return $this->hasMany(Option::class, 'lesson_content_id');
    }
}
