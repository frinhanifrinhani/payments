<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BalanceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::middleware('auth:sanctum')->post('/logout', 'logout');
});

Route::controller(BalanceController::class)->group(function () {
    Route::middleware('auth:sanctum')->post('/balance', 'createBalance');
    Route::middleware('auth:sanctum')->get('/balance', 'getAllBalances');
    Route::middleware('auth:sanctum')->get('/balance/{id}', 'getBalanceById');
});
