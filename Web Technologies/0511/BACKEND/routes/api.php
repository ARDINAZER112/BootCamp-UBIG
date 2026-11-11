<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\SetController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin dan user
    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/{slug}', [CourseController::class, 'show']);

    // Hanya admin
    Route::middleware('role:admin')->group(function () {
        Route::post('/courses', [CourseController::class, 'store']);
        Route::put('/courses/{slug}', [CourseController::class, 'update']);
        Route::delete('/courses/{slug}', [CourseController::class, 'destroy']);

        Route::post('/courses/{slug}/sets', [SetController::class, 'store']);
        Route::delete('/courses/{slug}/sets/{setId}', [SetController::class, 'destroy']);

        Route::post('/lessons', [LessonController::class, 'store']);
        Route::delete('/lessons/{id}', [LessonController::class, 'destroy']);
    });

    // Hanya user
    Route::middleware('role:user')->group(function () {
        Route::post('/lessons/{lesson}/contents/{content}/check', [QuizController::class, 'check']);
        Route::post('/lesson-contents/{content}/check', [QuizController::class, 'check']);
        Route::post('/lesson-contents/{content}/check-answer', [QuizController::class, 'check']);

        Route::put('/lessons/{id}/complete', [LessonController::class, 'complete']);

        Route::post('/courses/{slug}/register', [UserController::class, 'registerCourse']);
        Route::get('/users/progress', [UserController::class, 'progress']);
    });
});
