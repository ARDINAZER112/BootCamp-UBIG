// Dijalankan di php artisan tinker
App\Models\Product::create(['name' => 'Kopi Arabika', 'price' => 45000, 'stock' => 10]);
App\Models\Product::all();
App\Models\Product::find(1);
App\Models\Product::where('price', '>', 30000)->get();
App\Models\Product::count();
