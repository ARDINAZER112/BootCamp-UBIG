<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UpcomingWorkshopController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\WorkshopController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/workshop/upcoming', UpcomingWorkshopController::class);

Route::middleware('auth.md5')->group(function () {
    Route::middleware('roler:participant')->group(function () {
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::post('/bookings/{bookings}/pay', [BookingController::class, 'pay']);
        Route::post('/my-bookings', [BookingController::class, 'myBookings']);
    });

    Route::middleware('role:admin')->group(function () {
        Route::post('/workshop', [WorkshopController::class, 'store']);
        Route::delete('/workshop/{workshop}', [WorkshopController::class, 'destroy']);
    });
});
