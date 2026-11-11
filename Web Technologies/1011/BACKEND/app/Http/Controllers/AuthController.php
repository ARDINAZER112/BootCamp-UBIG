<?php
namespace App\Http\Controllers;

use App\Models\Society;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $society = Society::with('regionals')
            ->where('id_card_number', $request->input('id_card_number'))
            ->where('password', $request->input('password'))
            ->first();

        if (!$society) {
            return response()->json(['message' => 'ID Card Number or Password incorrect'], 401);
        }

        $society->login_tokens = md5($society->id_card_number);
        $society->save();

        return response()->json([
            'name' => $society->name,
            'born_date' => $society->born_date,
            'gender' => $society->gender,
            'address' => $society->address,
            'token' => $society->login_tokens,
            'regional' => [
                'id' => $society->regionals->id,
                'province' => $society->regionals->province,
                'district' => $society->regionals->district,
            ],
        ], 200);
    }

    public function logout(Request $request)
    {
        $token = $request->query('token');
        $society = $token ? Society::where('login_tokens', $token)->first() : null;

        if (!$society) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $society->login_tokens = null;
        $society->save();

        return response()->json(['message' => 'Logout success'], 200);
    }
}