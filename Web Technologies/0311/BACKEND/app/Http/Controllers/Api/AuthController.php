<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $username = (string) $request->input('username');
        $password = (string) $request->input('password');

        $society = Society::with('regional:id,province,district')
            ->where('username', $username)
            ->first();

        if (! $society || ! $this->passwordMatches($password, $society->password)) {
            return response()->json(['message' => 'Username or Password incorrect'], 401);
        }

        $token = $society->createToken('society-token')->plainTextToken;

        return response()->json([
            'name'        => $society->name,
            'username'    => $society->username,
            'member_type' => $society->member_type,
            'born_date'   => $society->born_date,
            'gender'      => $society->gender,
            'address'     => $society->address,
            'token'       => $token,
            'regional'    => [
                'id'       => $society->regional->id,
                'province' => $society->regional->province,
                'district' => $society->regional->district,
            ],
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout success'], 200);
    }

    private function passwordMatches(string $input, string $stored): bool
    {
        if (str_starts_with($stored, '$2y$') || str_starts_with($stored, '$argon')) {
            return Hash::check($input, $stored);
        }

        return hash_equals($stored, $input);
    }
}
