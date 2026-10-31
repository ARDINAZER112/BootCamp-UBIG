<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $kategori = collect(['Makanan', 'Minuman', 'Elektronik'])
            ->map(fn ($nama) => Category::create(['name' => $nama]));

        Product::factory()->count(30)->create([
            'category_id' => fn () => $kategori->random()->id,
        ]);
    }
}
