<?php

use App\Models\Product;
use Picqer\Barcode\BarcodeGeneratorSVG;

public function label(Product $product)
{
    // Kode barcode: id produk dengan padding nol, mis. 00000012
    $kode = str_pad((string) $product->id, 8, '0', STR_PAD_LEFT);

    $generator = new BarcodeGeneratorSVG();
    $barcodeSvg = $generator->getBarcode($kode, $generator::TYPE_CODE_128, 2, 60);

    return view('products.label', compact('product', 'kode', 'barcodeSvg'));
}
