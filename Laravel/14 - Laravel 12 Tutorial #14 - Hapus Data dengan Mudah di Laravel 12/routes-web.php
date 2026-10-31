<?php

Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
