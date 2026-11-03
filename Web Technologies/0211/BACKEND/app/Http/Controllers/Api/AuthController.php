<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Society;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /** A1a / A1b - Login society menggunakan ID card number + password. */
    public function login(Request $request): JsonResponse
    {
        $idCard = $request->input('id_card_number');
        $password = $request->input('password');

        $society = null;
        if (is_scalar($idCard) && is_scalar($password)) {
            $society = Society::with('regional')
                ->where('id_card_number', (string) $idCard)
                ->first();

            if ($society && ! $society->passwordMatches((string) $password)) {
                $society = null;
            }
        }

        if (! $society) {
            return response()->json(['message' => 'ID Card Number or Password incorrect'], 401);
        }

        $token = $society->createToken('auth_token')->plainTextToken;

        return response()->json([
            'name' => $society->name,
            'born_date' => $society->born_date,
            'gender' => $society->gender,
            'address' => $society->address,
            'token' => $token,
            'regional' => [
                'id' => $society->regional->id,
                'province' => $society->regional->province,
                'district' => $society->regional->district,
            ],
        ]);
    }

    /** A1c - Logout: hapus token yang sedang dipakai. */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout success']);
    }
}
