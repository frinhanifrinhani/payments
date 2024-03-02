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

        $validatedData['remaining_value'] =  $validatedData['initial_value'];

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
                Response::HTTP_OK
            );
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'message' => 'Balance not found.'
                ],
                Response::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to retrieve balance. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function updateBalance(Request $request, $id): JsonResponse
    {

        try {
            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
            ]);

            $balance = Balance::findOrFail($id);
            $balance->update($validatedData);

            return response()->json(
                [
                    'message' => 'Balance updated successfully!'
                ],
                Response::HTTP_OK
            );
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'message' => 'Balance not found.'
                ],
                Response::HTTP_NOT_FOUND
            );
        } catch (ValidationException $e) {
            $errors = $e->validator->errors()->toArray();
            return response()->json(
                [
                    'message' => $errors
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to update balance. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function deleteBalance($id): JsonResponse
    {


        try {
            $balance = Balance::findOrFail($id);
            $balance->delete();

            return response()->json(
                [
                    'message' => 'Balance deleted successfully!'
                ],
                Response::HTTP_OK
            );
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'message' => 'Balance not found.'
                ],
                Response::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Failed to delete balance. Please try again later.'
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
