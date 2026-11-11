<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $table = 'options';

    // is_correct tidak di-cast: D3 mengembalikan angka (1/0)
    protected $fillable = ['lesson_content_id', 'option_text', 'is_correct'];
}
