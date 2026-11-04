<?php

namespace App\Http\Middleware;

use App\Models\Society;
use Closure;
use Illuminate\Http\Request;

/**
 * Autentikasi token md5 (dikirim lewat query param ?token=...).
 * Token disimpan di kolom societies.login_tokens saat login.
 */
class TokenAuth
{
    public function handle(Request $request, Closure $next)
    {
        $token = (string) $request->query('token', '');

        $society = $token !== ''
            ? Society::where('login_tokens', $token)->first()
            : null;

        if (! $society) {
            return response()->json(['message' => 'Unauthorized user'], 401);
        }

        $request->setUserResolver(fn () => $society);

        return $next($request);
    }
}
