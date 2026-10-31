<?php

public function show(Product $product)
{
    return view('products.show', compact('product'));
}
