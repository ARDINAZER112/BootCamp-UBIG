<?php

public function edit(Product $product)
{
    return view('products.edit', compact('product'));
}

public function update(Request $request, Product $product)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|integer|min:0',
        'stock' => 'required|integer|min:0',
    ]);

    $product->update($validated);

    return redirect()->route('products.index')
        ->with('success', 'Produk berhasil diperbarui');
}
