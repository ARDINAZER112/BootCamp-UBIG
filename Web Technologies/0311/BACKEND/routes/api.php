<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\SlotController;
use App\Http\Controllers\Api\ValidationController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::post('/validation', [ValidationController::class, 'store']);
        Route::get('/validations', [ValidationController::class, 'show']);

        Route::get('/slots', [SlotController::class, 'index']);
        Route::get('/slots/{slot}', [SlotController::class, 'show']);

        Route::get('/reservations', [ReservationController::class, 'index']);
        Route::post('/reservations', [ReservationController::class, 'store']);

        Route::post('/testing/reset-reservation', [ReservationController::class, 'resetForTesting']);
    });
});
