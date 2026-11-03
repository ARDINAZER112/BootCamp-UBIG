<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InstalmentController;
use App\Http\Controllers\Api\TestHelperController;
use App\Http\Controllers\Api\ValidationController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // A1 - Login (publik)
    Route::post('auth/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        // A1 - Logout
        Route::post('auth/logout', [AuthController::class, 'logout']);

        // A2 - Data validation
        Route::post('validation', [ValidationController::class, 'store']);
        Route::get('validations', [ValidationController::class, 'show']);

        // A3 - Instalment cars
        Route::get('instalment_cars', [InstalmentController::class, 'index']);
        Route::get('instalment_cars/{id}', [InstalmentController::class, 'show']);

        // A4 - Applications
        Route::post('applications', [ApplicationController::class, 'store']);
        Route::get('applications', [ApplicationController::class, 'index']);

        // Endpoint bantu untuk pengujian Postman (dipakai pre-request script A4a).
        // Hanya aktif jika ENABLE_TEST_HELPERS=true di .env
        if (config('app.test_helpers')) {
            Route::post('validator/reset', [TestHelperController::class, 'reset']);
            Route::post('validator/approve', [TestHelperController::class, 'approve']);
        }
    });
});
