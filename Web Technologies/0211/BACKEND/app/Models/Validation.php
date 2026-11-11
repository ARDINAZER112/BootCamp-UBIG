<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Validation extends Model
{
    protected $table = 'validations';

    public $timestamps = false;

    protected $fillable = [
        'society_id',
        'validator_id',
        'status',
        'job',
        'job_description',
        'income',
        'reason_accepted',
        'validator_notes',
    ];

    public function society(): BelongsTo
    {
        return $this->belongsTo(Society::class, 'society_id');
    }

    public function validator(): BelongsTo
    {
        return $this->belongsTo(Validator::class, 'validator_id');
    }

    public function apiStatus(): string
    {
        return $this->status === 'declined' ? 'rejected' : $this->status;
    }
}
