<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Installment extends Model
{
    protected $table = 'installment';

    public $timestamps = false;

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function availableMonths(): HasMany
    {
        return $this->hasMany(AvailableMonth::class, 'installment_id')->orderBy('month');
    }

    /** Bentuk umum satu mobil untuk response API. */
    public function toCarArray(): array
    {
        return [
            'id' => $this->id,
            'car' => $this->cars,
            'brand' => $this->brand?->brand,
            'price' => (string) $this->price,
            'description' => $this->description,
        ];
    }
}
