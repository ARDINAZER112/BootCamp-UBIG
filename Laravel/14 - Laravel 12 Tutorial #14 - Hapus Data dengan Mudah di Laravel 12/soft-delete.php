<?php
// Opsional: Soft Delete
// 1) Migration:   $table->softDeletes();
// 2) Model:

use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;
}

// Pemakaian:
// Product::withTrashed()->get();
// $product->restore();
// $product->forceDelete();
