<?php

namespace Tests\Unit\app\Http\Controllers;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Http\Controllers\BalanceController;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Balance;

class BalanceControllerTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    protected $balanceController;

    public function setUp(): void
    {
        parent::setUp();
        $this->balanceController = new BalanceController();
    }

    /**
     *  @test
     */
    public function testCreateBalanceSuccess()
    {
        $requestData = [
            'name' => 'Balance Test',
            'description' => 'Balance Test description',
            'initial_value' => 10000.99,
        ];

        $request = new Request($requestData);

        $response = $this->balanceController->createBalance($request);

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Balance created successfully!', $responseData['message']);
        $this->assertArrayHasKey('balance', $responseData);
        $this->assertEquals($requestData['name'], $responseData['balance']['name']);
        $this->assertEquals($requestData['description'], $responseData['balance']['description']);
        $this->assertEquals($requestData['initial_value'], $responseData['balance']['initial_value']);

        $balance = Balance::where('id', $responseData['balance']['id'])->first();
        $this->assertNotNull($balance);

        $this->assertEquals($requestData['name'], $balance->name);
        $this->assertEquals($requestData['description'], $balance->description);
        $this->assertEquals($requestData['initial_value'], $balance->initial_value);
    }

    /**
     *  @test
     */
    public function testValidationEmptyFieldsBalanceError()
    {
        $requestData = [
            'name' => '',
            'description' => '',
            'initial_value' => '',
        ];

        $request = new Request($requestData);

        $response = $this->balanceController->createBalance($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The name field is required.', $responseData['message']['name'][0]);
        $this->assertEquals('The description field is required.', $responseData['message']['description'][0]);
        $this->assertEquals('The initial value field is required.', $responseData['message']['initial_value'][0]);

        $this->assertArrayHasKey('name', $responseData['message']);
        $this->assertArrayHasKey('description', $responseData['message']);
        $this->assertArrayHasKey('initial_value', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testValidationFieldInicialValueNumberError()
    {
        $requestData = [
            'name' => 'Balance Test',
            'description' => 'Balance Test description',
            'initial_value' => 'needs-be-a-number',
        ];

        $request = new Request($requestData);

        $response = $this->balanceController->createBalance($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The initial value field must be a number.', $responseData['message']['initial_value'][0]);

        $this->assertArrayHasKey('initial_value', $responseData['message']);
    }

    /**
     *  @test
     */
    public function testBalanceGetAllSuccess()
    {

        Balance::factory()->count(3)->create();

        $response = $this->balanceController->getAllBalances();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $this->assertArrayHasKey('message', $response->original);
        $this->assertArrayHasKey('balances', $response->original);

        $balances = Balance::all()->count();
        $this->assertCount($balances, $response->original['balances']);
    }

    public function testBalanceGetByIdSucess()
    {
        $balance = Balance::factory()->create();

        $response = $this->balanceController->getBalanceById($balance->id);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $this->assertArrayHasKey('message', $response->original);
        $this->assertArrayHasKey('balance', $response->original);
    }
}
