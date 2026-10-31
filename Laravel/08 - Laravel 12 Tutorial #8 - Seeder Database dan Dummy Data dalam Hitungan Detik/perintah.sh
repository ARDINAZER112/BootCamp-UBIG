php artisan make:factory ProductFactory --model=Product
php artisan make:seeder ProductSeeder

php artisan db:seed
php artisan db:seed --class=ProductSeeder
php artisan migrate:fresh --seed
