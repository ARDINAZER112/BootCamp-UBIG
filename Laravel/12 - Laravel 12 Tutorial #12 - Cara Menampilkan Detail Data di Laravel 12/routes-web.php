<?php

Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
