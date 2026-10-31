<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

// Eager loading
public function index()
{
    $products = Product::with('category')->latest()->paginate(10);
    return view('products.index', compact('products'));
}

public function create()
{
    $categories = Category::orderBy('name')->get();
    return view('products.create', compact('categories'));
}

// Query Builder join (tanpa relasi Eloquent)
public function laporan()
{
    $rows = DB::table('products')
        ->join('categories', 'categories.id', '=', 'products.category_id')
        ->select('products.name', 'products.price', 'categories.name as category_name')
        ->orderBy('categories.name')
        ->get();

    return view('products.laporan', compact('rows'));
}

// Menghitung relasi
// $categories = Category::withCount('products')->get();
// echo $category->products_count;
