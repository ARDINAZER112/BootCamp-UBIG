<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Validation extends Model
{
    protected $fillable = [
        'developer_id',
        'auditor_id',
        'github_url',
        'tech_stack',
        'monthly_income',
        'status',
        'auditor_notes',
    ];

    public function developer(): BelongsTo
    {
        return $this->belongsTo(Developer::class);
    }

    public function auditor(): BelongsTo
    {
        return $this->belongsTo(Auditor::class);
    }
}