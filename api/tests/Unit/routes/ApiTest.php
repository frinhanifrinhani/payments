<?php

namespace Tests\Unit\routes;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Models\User;

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

        $response->assertStatus(201);
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

        $response->assertStatus(200);
    }
}
