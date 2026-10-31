<?php

Route::get('/products/{product}/label', [ProductController::class, 'label'])->name('products.label');
