<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect()->route('products.index'));

Route::resource('products', ProductController::class);

// Variasi:
// Route::resource('products', ProductController::class)->only(['index', 'show']);
// Route::resource('products', ProductController::class)->except(['destroy']);
