<?php

public function index(Request $request)
{
    $products = Product::query()
        ->when($request->search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return view('products.index', compact('products'));
}
