<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // data tetap
        Product::create([
            'name' => 'Kopi Arabika',
            'description' => 'Kopi pilihan dari dataran tinggi',
            'price' => 45000,
            'stock' => 20,
        ]);

        // data dummy
        Product::factory()->count(30)->create();
    }
}
