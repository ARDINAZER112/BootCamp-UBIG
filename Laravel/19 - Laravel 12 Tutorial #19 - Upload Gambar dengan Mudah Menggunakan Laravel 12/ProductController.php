<?php

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|integer|min:0',
        'stock' => 'required|integer|min:0',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')->store('products', 'public');
    }

    Product::create($validated);

    return redirect()->route('products.index')->with('success', 'Produk berhasil ditambahkan');
}

public function update(Request $request, Product $product)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|integer|min:0',
        'stock' => 'required|integer|min:0',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    if ($request->hasFile('image')) {
        // hapus gambar lama
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $validated['image'] = $request->file('image')->store('products', 'public');
    }

    $product->update($validated);

    return redirect()->route('products.index')->with('success', 'Produk berhasil diperbarui');
}

public function destroy(Product $product)
{
    if ($product->image) {
        Storage::disk('public')->delete($product->image);
    }

    $product->delete();

    return redirect()->route('products.index')->with('success', 'Produk berhasil dihapus');
}
