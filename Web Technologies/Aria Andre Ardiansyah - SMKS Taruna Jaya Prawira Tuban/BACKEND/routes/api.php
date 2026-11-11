<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ValidationController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::post('/validation', [ValidationController::class, 'store']);
    });
});