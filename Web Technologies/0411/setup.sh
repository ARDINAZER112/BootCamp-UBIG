#!/usr/bin/env bash
# Jalankan dari DALAM folder XX_module_rest_api (ganti XX sesuai nomor komputer).
# Syarat: php >= 8.2, composer, internet. Tidak butuh Sanctum (token md5 kustom).
set -e

if [ ! -d overlay ]; then echo "Folder overlay/ tidak ditemukan. Jalankan dari XX_module_rest_api."; exit 1; fi

# 1) Project Laravel 11 bersih ke folder sementara, lalu pindahkan ke folder ini
composer create-project laravel/laravel _tmp "^11.0"
cp -a _tmp/. .
rm -rf _tmp

# 2) Timpa dengan kode dari overlay
cp -a overlay/. .
rm -rf overlay

# 3) Konfigurasi .env
sed -i "s|^DB_CONNECTION=.*|DB_CONNECTION=mysql|" .env
sed -i "s|^#\? \?DB_HOST=.*|DB_HOST=127.0.0.1|" .env
sed -i "s|^#\? \?DB_PORT=.*|DB_PORT=3306|" .env
sed -i "s|^#\? \?DB_DATABASE=.*|DB_DATABASE=vaccinify|" .env
sed -i "s|^#\? \?DB_USERNAME=.*|DB_USERNAME=lks|" .env
sed -i "s|^#\? \?DB_PASSWORD=.*|DB_PASSWORD=lks123|" .env
sed -i "s|^SESSION_DRIVER=.*|SESSION_DRIVER=file|" .env
sed -i "s|^CACHE_STORE=.*|CACHE_STORE=file|" .env
sed -i "s|^QUEUE_CONNECTION=.*|QUEUE_CONNECTION=sync|" .env

php artisan config:clear
echo
echo "Selesai. Langkah berikutnya (lihat PETUNJUK.md): import database, lalu 'php artisan serve'."
echo "Jangan jalankan 'php artisan migrate'."
