<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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

    public function getBalanceById($id): JsonResponse
    {
        try {
            $balance = Balance::findOrFail($id);

            return response()->json(
                [
                    'message' => 'Balance retrieved successfully!',
                    'balance' => $balance
                ],
                JsonResponse::HTTP_OK
            );
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'message' => 'Balance not found.'
                ],
                JsonResponse::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to retrieve balance. Please try again later.'
                ],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
