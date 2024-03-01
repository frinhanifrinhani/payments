<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthControllerTest extends TestCase
{
    use DatabaseTransactions;

    /**
     *  @test
     */
    public function testRegisterSuccess()
    {
        $controller = new AuthController();

        $requestData = [
            'name' => 'Test User',
            'email' => 'user.to.regitser@payments.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ];
        $request = new Request($requestData);

        $response = $controller->register($request);

        $this->assertEquals(201, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('User registered successfully!', $responseData['message']);
        $this->assertArrayHasKey('user', $responseData);
        $this->assertEquals($requestData['name'], $responseData['user']['name']);
        $this->assertEquals($requestData['email'], $responseData['user']['email']);

        $user = User::where('email', $requestData['email'])->first();
        $this->assertNotNull($user);
        $this->assertEquals($requestData['name'], $user->name);
        $this->assertTrue(Hash::check($requestData['password'], $user->password));
    }

    /**
     *  @test
     */
    public function testRegisterValidationEmptyFildsError()
    {
        $controller = new AuthController();

        $requestData = [
            'name' => '',
            'email' => '',
            'password' => '',
        ];

        $request = new Request($requestData);

        $response = $controller->register($request);

        $this->assertEquals(422, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The name field is required.', $responseData['message']['name'][0]);
        $this->assertEquals('The email field is required.', $responseData['message']['email'][0]);
        $this->assertEquals('The password field is required.', $responseData['message']['password'][0]);

        $this->assertArrayHasKey('name', $responseData['message']);
        $this->assertArrayHasKey('email', $responseData['message']);
        $this->assertArrayHasKey('password', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testRegisterValidationEmailTypeError()
    {
        $controller = new AuthController();

        $requestData = [
            'name' => 'Test User',
            'email' => 'invalidemail',
            'password' => 'password',
            'password_confirmation' => 'password'
        ];

        $request = new Request($requestData);

        $response = $controller->register($request);

        $this->assertEquals(422, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The email field must be a valid email address.', $responseData['message']['email'][0]);

        $this->assertArrayHasKey('email', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testRegisterValidationEmailExistsError()
    {
        $controller = new AuthController();

        $requestData = [
            'name' => 'Test User',
            'email' => 'test.user@payments.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ];

        $request = new Request($requestData);

        $response = $controller->register($request);

        $this->assertEquals(422, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The email has already been taken.', $responseData['message']['email'][0]);

        $this->assertArrayHasKey('email', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testRegisterValidationPasswordAndConfirmPasswordDifferentError()
    {
        $controller = new AuthController();

        $requestData = [
            'name' => 'Test User',
            'email' => 'user.to.regitser@payments.com',
            'password' => 'password',
            'password_confirmation' => 'different_password'
        ];

        $request = new Request($requestData);

        $response = $controller->register($request);

        $this->assertEquals(422, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The password field confirmation does not match.', $responseData['message']['password'][0]);

        $this->assertArrayHasKey('password', $responseData['message']);
    }
}
