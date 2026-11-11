<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\Http\Foundation\Response;
use App\Models\Society;

class SocietyToken
{
    public function handle(Request $request, Closure $next)
    {

        $token = $request->query('token');
        $society = $token ? Society::where('login_tokens', $token)->first() : null;

        if (!$society) {
            return response()->json(['message' => 'Unauthorized user'], 401);
        }

        $request->attributes->set('society', $society);
        return $next($request);
    }
}
