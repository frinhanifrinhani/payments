<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class BalanceController extends Controller
{

    public function createBalance(Request $request): JsonResponse
    {

        try {

            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string',  'max:255'],
                'initial_value' => ['required', 'numeric'],

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

        $balance = Balance::create($validatedData);

        return response()->json(
            [
                'message' => 'Balance created successfully!',
                'balance' => $balance
            ],
            Response::HTTP_CREATED
        );
    }

    public function getAllBalances(): JsonResponse
    {
        try {
            $balances = Balance::all();

            return response()->json(
                [
                    'message' => 'All balances retrieved successfully!',
                    'balances' => $balances
                ],
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to retrieve balances. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
