#!/usr/bin/env bash
# Jalankan dari dalam folder XX_SERVER_MODULE (ganti XX sesuai nomor komputer).
# Syarat: php >= 8.2, composer, MySQL/MariaDB (XAMPP/LAMPP) sudah jalan.
set -e

DB_NAME="starlight-observatory-db"

# 1) Buat project Laravel 11 bersih
composer create-project laravel/laravel BACKEND "^11.0"

# 2) Pasang Sanctum + publish config (TANPA migrasi: tabel sudah ada di db-dump.sql)
cd BACKEND
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --tag=sanctum-config
cd ..

# 3) Timpa dengan kode dari overlay
cp -r BACKEND_OVERLAY/. BACKEND/
rm -f BACKEND/env.snippet

# 4) Konfigurasi .env
cd BACKEND
sed -i "s|^DB_CONNECTION=.*|DB_CONNECTION=mysql|" .env
sed -i "s|^#\? \?DB_HOST=.*|DB_HOST=127.0.0.1|" .env
sed -i "s|^#\? \?DB_PORT=.*|DB_PORT=3306|" .env
sed -i "s|^#\? \?DB_DATABASE=.*|DB_DATABASE=${DB_NAME}|" .env
sed -i "s|^#\? \?DB_USERNAME=.*|DB_USERNAME=root|" .env
sed -i "s|^#\? \?DB_PASSWORD=.*|DB_PASSWORD=|" .env
sed -i "s|^SESSION_DRIVER=.*|SESSION_DRIVER=file|" .env
sed -i "s|^CACHE_STORE=.*|CACHE_STORE=file|" .env
sed -i "s|^QUEUE_CONNECTION=.*|QUEUE_CONNECTION=sync|" .env
cd ..

# 5) Import database (buat DB-nya dulu, lalu import db-dump.sql)
echo "Import DB: mysql -u root -e 'CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`' && mysql -u root ${DB_NAME} < db-dump.sql"
echo "Jangan jalankan 'php artisan migrate' (tabel sudah dibuat dari dump)."
echo "Tes lokal: cd BACKEND && php artisan serve  ->  http://127.0.0.1:8000 (base_url Postman)"
