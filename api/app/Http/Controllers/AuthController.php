<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:6', 'confirmed'],
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors()->toArray();
            return response()->json(
                [
                    'message' => $errors
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        return response()->json(
            [
                'message' => 'User registered successfully!',
                'user' => $user
            ],
            Response::HTTP_CREATED
        );
    }

    public function login(Request $request)
    {

        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors()->toArray();
            return response()->json(
                [
                    'message' => $errors
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;

            return response()->json(
                [
                    'message' => 'Login successfully!',
                    'user' => $user,
                    'token' =>  $token
                ],
                Response::HTTP_OK
            );
        }

        return response()->json(
            [
                'message' => 'Incorrect email or password.'
            ],
            Response::HTTP_UNAUTHORIZED
        );
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(
            [
                'message' => 'Logout successful!'
            ],
            Response::HTTP_OK
        );
    }

    public function teste()
    {

        return response()->json(
            [
                'message' => 'teste'
            ],
            Response::HTTP_OK
        );
    }
}
