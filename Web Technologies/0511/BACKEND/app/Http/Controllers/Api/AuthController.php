<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Administrator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    private const INVALID_CREDENTIALS_STATUS = 401;

    public function register(Request $request)
    {
        $data = $request->validate([
            'full_name' => 'required|string|max:255',
            'username'  => [
                'required', 'string', 'min:3', 'max:255',
                'regex:/^[A-Za-z0-9._]+$/',
                'unique:users,username',
                'unique:administrators,username',
            ],
            'password'  => 'required|string|min:6',
        ]);

        $user = User::create($data);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status'  => 'success',
            'message' => 'User registration successful',
            'data'    => [
                'full_name'  => $user->full_name,
                'username'   => $user->username,
                'updated_at' => $user->updated_at,
                'created_at' => $user->created_at,
                'id'         => $user->id,
                'token'      => $token,
            ],
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $username = (string) $request->input('username');
        $password = (string) $request->input('password');

        $admin = Administrator::where('username', $username)->first();

        if ($admin && Hash::check($password, $admin->password)) {
            return response()->json([
                'status'  => 'success',
                'message' => 'Login successful',
                'data'    => [
                    'id'         => $admin->id,
                    'username'   => $admin->username,
                    'created_at' => $admin->created_at,
                    'updated_at' => $admin->updated_at,
                    'token'      => $admin->createToken('auth_token')->plainTextToken,
                    'role'       => 'admin',
                ],
            ], 200);
        }

        $user = User::where('username', $username)->first();

        if ($user && Hash::check($password, $user->password)) {
            return response()->json([
                'status'  => 'success',
                'message' => 'Login successful',
                'data'    => [
                    'id'         => $user->id,
                    'full_name'  => $user->full_name,
                    'username'   => $user->username,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'token'      => $user->createToken('auth_token')->plainTextToken,
                    'role'       => 'user',
                ],
            ], 200);
        }

        return response()->json([
            'status'  => 'authentication_failed',
            'message' => 'The username or password you entered is incorrect',
        ], self::INVALID_CREDENTIALS_STATUS);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Logout successful',
        ], 200);
    }
}
