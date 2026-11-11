<?php

namespace App\Http\Middleware;

use App\Models\Administrator;
use Closure;
use Illuminate\Http\Request;

/**
 * Pembatasan peran. Pemakaian: ->middleware('role:admin') atau 'role:user'.
 * Admin = model Administrator (tabel administrators), user = model User (tabel users).
 */
class EnsureRole
{
    public function handle(Request $request, Closure $next, string $role)
    {
        $isAdmin = $request->user() instanceof Administrator;

        if (($role === 'admin') !== $isAdmin) {
            return response()->json([
                'status'  => 'insufficient_permissions',
                'message' => 'Access forbidden',
            ], 403);
        }

        return $next($request);
    }
}
