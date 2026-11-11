<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Auditor;
use App\Models\Developer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'full_name' => 'required|string',
            'username'  => 'required|string|unique:developers,username',
            'password'  => 'required|string|min:6',
        ]);

        $developer = Developer::create($data);

        return response()->json([
            'message' => 'Registration successful',
            'user'    => [
                'id'        => $developer->id,
                'full_name' => $developer->full_name,
                'username'  => $developer->username,
                'role'      => 'developer',
            ],
            'token'   => $developer->createToken('auth_token')->plainTextToken,
        ], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $auditor = Auditor::where('username', $data['username'])->first();

        if ($auditor && Hash::check($data['password'], $auditor->password)) {
            return $this->loginResponse($auditor, 'auditor');
        }

        $developer = Developer::where('username', $data['username'])->first();

        if ($developer && Hash::check($data['password'], $developer->password)) {
            return $this->loginResponse($developer, 'developer');
        }

        return response()->json([
            'message' => 'Username or password incorrect',
        ], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout success',
        ], 200);
    }

    private function loginResponse($account, string $role)
    {
        return response()->json([
            'message' => 'Login successful',
            'user'    => [
                'id'       => $account->id,
                'username' => $account->username,
                'role'     => $role,
            ],
            'token'   => $account->createToken('auth_token')->plainTextToken,
        ], 200);
    }
}