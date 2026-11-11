<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InstalmentController;
use App\Http\Controllers\Api\TestHelperController;
use App\Http\Controllers\Api\ValidationController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('auth/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('auth/logout', [AuthController::class, 'logout']);

        Route::post('validation', [ValidationController::class, 'store']);
        Route::get('validations', [ValidationController::class, 'show']);

        Route::get('instalment_cars', [InstalmentController::class, 'index']);
        Route::get('instalment_cars/{id}', [InstalmentController::class, 'show']);

        Route::post('applications', [ApplicationController::class, 'store']);
        Route::get('applications', [ApplicationController::class, 'index']);

        if (config('app.test_helpers')) {
            Route::post('validator/reset', [TestHelperController::class, 'reset']);
            Route::post('validator/approve', [TestHelperController::class, 'approve']);
        }
    });
});
