php artisan make:model Category -mf
php artisan make:migration add_category_id_to_products_table --table=products
php artisan migrate
