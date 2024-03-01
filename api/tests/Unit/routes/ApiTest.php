<?php

namespace Tests\Unit\routes;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

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
}
