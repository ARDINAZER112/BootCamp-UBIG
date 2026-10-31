<?php

public function store(Request $request)
{
    $validated = $request->validate(
        [
            'name' => 'required|string|min:3|max:255',
            'price' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
        ],
        [
            'name.required' => 'Nama produk wajib diisi.',
            'name.min' => 'Nama produk minimal :min karakter.',
            'price.required' => 'Harga wajib diisi.',
            'price.integer' => 'Harga harus berupa angka.',
        ]
    );

    Product::create($validated);

    return redirect()->route('products.index')->with('success', 'Produk berhasil ditambahkan');
}
