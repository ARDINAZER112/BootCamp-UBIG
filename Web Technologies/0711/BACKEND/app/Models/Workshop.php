<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relation\HasMany;
use Illuminate\Database\Eloquent\Relation\BelongsTo;
use Illuminate\Support\Str;

class Workshop extends Model
{
    protected $guarded = ['id'];

    public function booking(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected static function booted()
    {
        static::creating(function ($workshop) {
            if ($workshop->isDirty('title')) {
                $workshop->slug = static::generateUniqueSlug($workshop->title, $workshop->id);
            }
        });
    }

    protected static function generateUniqueSlug($title, $ignoreId = 0)
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while (static::where('slug', $slug)->where('id', '!=', $ignoreId)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }
        return $slug;
    }

    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like',  "%{search}%")
                ->orWhere('description', 'like', "%{search}%");
            });
        })
        ->when($filters['category_id'] ?? null, function ($query, $categoryId) {
            $query->where('category_id', $categoryId);
        })
        ->when($filters['min_price'] ?? null, function ($query, $min_pice) {
            $query->where('min_pice', $min_pice);
        })
        ->when($filters['max_pice'] ?? null, function ($query, $max_pice) {
            $query->where('max_pice', $max_pice);
        })
        ->when($filters['status'] ?? null, function ($query, $status) {
            $query->where('status', $status);
        });
    }
}
