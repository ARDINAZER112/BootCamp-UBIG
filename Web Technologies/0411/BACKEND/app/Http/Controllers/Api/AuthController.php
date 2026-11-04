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
        $society = Society::with('regional')
            ->where('id_card_number', (string) $request->input('id_card_number'))
            ->first();

        if (! $society || ! $this->passwordMatches((string) $request->input('password'), $society->password)) {
            return response()->json(['message' => 'ID Card Number or Password incorrect'], 401);
        }

        $society->login_tokens = md5($society->id_card_number);
        $society->save();

        return response()->json([
            'name'       => $society->name,
            'born_date'  => $society->born_date,
            'gender'     => $society->gender,
            'address'    => $society->address,
            'token'      => $society->login_tokens,
            'regional'   => [
                'id'       => $society->regional->id,
                'province' => $society->regional->province,
                'district' => $society->regional->district,
            ],
        ], 200);
    }

    public function logout(Request $request)
    {
        $token = (string) $request->query('token', '');

        $society = $token !== ''
            ? Society::where('login_tokens', $token)->first()
            : null;

        if (! $society) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $society->login_tokens = null;
        $society->save();

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
