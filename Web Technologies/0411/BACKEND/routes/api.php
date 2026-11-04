<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\SpotController;
use App\Http\Controllers\Api\VaccinationController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);
    // Logout memeriksa token sendiri karena pesan errornya berbeda ("Invalid token")
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::middleware('token.auth')->group(function () {
        Route::post('/consultations', [ConsultationController::class, 'store']);
        Route::get('/consultations', [ConsultationController::class, 'show']);

        Route::get('/spots', [SpotController::class, 'index']);
        Route::get('/spots/{id}', [SpotController::class, 'show']);

        Route::post('/vaccinations', [VaccinationController::class, 'store']);
        Route::get('/vaccinations', [VaccinationController::class, 'index']);
    });
});
