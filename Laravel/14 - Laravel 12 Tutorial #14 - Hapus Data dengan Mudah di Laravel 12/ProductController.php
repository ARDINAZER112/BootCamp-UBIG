<?php

public function destroy(Product $product)
{
    $product->delete();

    return redirect()->route('products.index')
        ->with('success', 'Produk berhasil dihapus');
}
