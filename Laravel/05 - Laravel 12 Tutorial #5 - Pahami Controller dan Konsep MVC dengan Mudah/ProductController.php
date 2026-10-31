<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = [
            ['id' => 1, 'name' => 'Kopi Arabika', 'price' => 45000],
            ['id' => 2, 'name' => 'Teh Hijau', 'price' => 25000],
        ];

        return view('products.index', compact('products'));
    }
}
