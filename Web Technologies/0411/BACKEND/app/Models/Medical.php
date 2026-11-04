<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/** Tenaga medis (dokter / petugas) di sebuah spot. */
class Medical extends Model
{
    protected $table = 'medicals';
    public $timestamps = false;
}
