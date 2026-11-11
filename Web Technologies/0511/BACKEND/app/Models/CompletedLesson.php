<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompletedLesson extends Model
{
    protected $table = 'completed_lessons';

    protected $fillable = ['user_id', 'lesson_id'];
}
