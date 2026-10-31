php artisan migrate
php artisan migrate:status
php artisan migrate:rollback
php artisan migrate:fresh            # hapus semua tabel lalu migrate ulang

# migration tambahan untuk tabel yang sudah ada
php artisan make:migration add_sku_to_products_table --table=products
