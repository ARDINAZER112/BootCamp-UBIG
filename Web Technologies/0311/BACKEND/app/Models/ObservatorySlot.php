<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ObservatorySlot extends Model
{
    protected $table = 'observatory_slots';
    public $timestamps = false;

    protected $fillable = [
        'telescope_id', 'event_name', 'event_date', 'price_per_slot',
        'max_capacity', 'booked_count', 'description',
    ];

    public function telescope(): BelongsTo
    {
        return $this->belongsTo(Telescope::class);
    }

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query
            ->when($filters['search'] ?? null, function ($q, $search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('event_name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhereHas('telescope', fn ($t) => $t->where('name', 'like', "%{$search}%"));
                });
            })
            ->when($filters['type'] ?? null, fn ($q, $type) =>
                $q->whereHas('telescope', fn ($t) => $t->where('type', $type)))
            ->when($filters['min_price'] ?? null, fn ($q, $min) => $q->where('price_per_slot', '>=', $min))
            ->when($filters['max_price'] ?? null, fn ($q, $max) => $q->where('price_per_slot', '<=', $max));
    }
}
