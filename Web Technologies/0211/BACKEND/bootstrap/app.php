<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Semua request ke API selalu dijawab dalam bentuk JSON.
        $exceptions->shouldRenderJsonWhen(fn (Request $request, Throwable $e) => true);

        // Token salah / tidak ada -> 401 sesuai spesifikasi modul.
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            $message = $request->is('api/v1/auth/logout') ? 'Invalid token' : 'Unauthorized user';

            return response()->json(['message' => $message], 401);
        });

        $exceptions->render(function (HttpExceptionInterface $e, Request $request) {
            $status = $e->getStatusCode();
            $message = match ($status) {
                404 => 'Not found',
                405 => 'Method not allowed',
                default => $e->getMessage() ?: 'Error',
            };

            return response()->json(['message' => $message], $status);
        });
    })->create();
