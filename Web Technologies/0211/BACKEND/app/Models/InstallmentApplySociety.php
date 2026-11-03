<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class InstallmentApplySociety extends Model
{
    protected $table = 'installment_apply_societies';

    public $timestamps = false;

    protected $fillable = ['notes', 'available_month_id', 'date', 'society_id', 'installment_id'];

    public function installment(): BelongsTo
    {
        return $this->belongsTo(Installment::class, 'installment_id');
    }

    public function availableMonth(): BelongsTo
    {
        return $this->belongsTo(AvailableMonth::class, 'available_month_id');
    }

    public function status(): HasOne
    {
        return $this->hasOne(InstallmentApplyStatus::class, 'installment_apply_societies_id');
    }
}
