<?php

use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', function () {
    return view('dashboard', ['totalProduk' => Product::count()]);
})->name('dashboard');
