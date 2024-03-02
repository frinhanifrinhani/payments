<?php

namespace Tests\Unit\routes;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Models\User;
use Illuminate\Http\Response;
use App\Models\Balance;

class ApiTest extends TestCase
{
    use DatabaseTransactions;


    public function testRegisterRouteSuccess()
    {
        $response = $this->post('/api/register', [
            'name' => 'Test User',
            'email' => 'user.to.regitser@payments.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertStatus(Response::HTTP_CREATED);
    }

    public function testLoginRouteSuccess()
    {
        $user = User::factory()->create([
            'email' => 'test.user@payment.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->post('/api/login', [
            'email' =>  $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testUnauthorizedLogoutError()
    {
        $response = $this->post('/api/logout');
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);

        $response->assertJson([
            'message' => 'Unauthorized.'
        ]);
    }

    public function testUnauthorizedBalancePostRouteError()
    {
        $response = $this->post('/api/balance');
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);

        $response->assertJson([
            'message' => 'Unauthorized.'
        ]);
    }

    public function testBalancePostRouteSuccess()
    {
        $user = User::factory()->create();
        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post('/api/balance', [
            'name' => 'Balance Test',
            'description' => 'Balance Test description',
            'initial_value' => 10000.99,
        ]);

        $response->assertStatus(Response::HTTP_CREATED);
    }

    public function testBalanceGetRouteSuccess()
    {
        $user = User::factory()->create();
        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/balance');

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testBalanceGetByIdRouteSuccess()
    {

        $user = User::factory()->create();
        $balance = Balance::factory()->create();

        $token = $user->createToken('token')->plainTextToken;

        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/balance/' . $balance->id);

        $response->assertStatus(Response::HTTP_OK);
    }
}
