<?php

/*
 | Front controller untuk XAMPP/LAMPP.
 | Dengan file ini API bisa dijangkau di http://localhost/XX_SERVER_MODULE/BACKEND/api/v1/...
 | tanpa /public. (public/index.php tetap ada untuk `php artisan serve`.)
 */

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/vendor/autoload.php';

/** @var \Illuminate\Foundation\Application $app */
$app = require_once __DIR__.'/bootstrap/app.php';

$app->handleRequest(Request::capture());
