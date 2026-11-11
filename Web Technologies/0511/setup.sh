#!/usr/bin/env bash
# Jalankan dari DALAM folder XX_SERVER_MODULE (ganti XX sesuai nomor komputer).
# Syarat: php >= 8.2, composer, internet. Membuat folder BACKEND.
set -e

if [ ! -d overlay ]; then echo "Folder overlay/ tidak ditemukan. Jalankan dari XX_SERVER_MODULE."; exit 1; fi

DB_NAME="wtid_academy"

# 1) Project Laravel 11 bersih di BACKEND
composer create-project laravel/laravel BACKEND "^11.0"

# 2) Sanctum + publish config (TANPA migrasi: tabel sudah ada di db-dump.sql)
cd BACKEND
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --tag=sanctum-config
cd ..

# 3) Timpa dengan kode dari overlay
cp -a overlay/. BACKEND/
rm -rf overlay

# 4) Konfigurasi .env
cd BACKEND
sed -i "s|^DB_CONNECTION=.*|DB_CONNECTION=mysql|" .env
sed -i "s|^#\? \?DB_HOST=.*|DB_HOST=127.0.0.1|" .env
sed -i "s|^#\? \?DB_PORT=.*|DB_PORT=3306|" .env
sed -i "s|^#\? \?DB_DATABASE=.*|DB_DATABASE=${DB_NAME}|" .env
sed -i "s|^#\? \?DB_USERNAME=.*|DB_USERNAME=lks|" .env
sed -i "s|^#\? \?DB_PASSWORD=.*|DB_PASSWORD=lks123|" .env
sed -i "s|^SESSION_DRIVER=.*|SESSION_DRIVER=file|" .env
sed -i "s|^CACHE_STORE=.*|CACHE_STORE=file|" .env
sed -i "s|^QUEUE_CONNECTION=.*|QUEUE_CONNECTION=sync|" .env

php artisan config:clear
echo
echo "Selesai. Lanjut: import database, lalu 'cd BACKEND && php artisan serve' (lihat PETUNJUK.md)."
echo "Jangan jalankan 'php artisan migrate'."
