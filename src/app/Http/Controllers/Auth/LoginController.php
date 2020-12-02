<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * Login
     *
     * @param  Request  $request
     * @return Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if (Auth::attempt($request->only('email', 'password'))) {
            return response()->json(Auth::user(), 200);
        }
        throw ValidationException::withMessages([
            'email' => [__('auth.failed')]
        ]);
    }

    /**
     * Logout
     *
     * @return Response
     */
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'successful logout'
        ], 200);
    }
}
