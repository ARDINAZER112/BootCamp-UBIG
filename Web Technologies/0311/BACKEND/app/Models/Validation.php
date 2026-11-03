<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Validation extends Model
{
    protected $table = 'validations';
    public $timestamps = false;

    protected $fillable = [
        'society_id', 'validator_id', 'status',
        'institution', 'occupation', 'reason_accepted', 'validator_notes',
    ];

    public function validator(): BelongsTo
    {
        return $this->belongsTo(Validator::class, 'validator_id');
    }
}
