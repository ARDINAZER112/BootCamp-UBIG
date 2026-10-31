# Cara 1: Composer
composer create-project laravel/laravel tokoku

# Cara 2: Laravel Installer
composer global require laravel/installer
laravel new tokoku

cd tokoku
php artisan serve

# Alternatif: server + queue + vite sekaligus
composer run dev
