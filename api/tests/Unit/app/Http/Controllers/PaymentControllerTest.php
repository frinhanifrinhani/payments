<?php

namespace Tests\Unit\app\Http\Controllers;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Http\Controllers\PaymentController;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Payment;
use App\Models\Balance;

class PaymentControllerTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    protected $paymentController;

    public function setUp(): void
    {
        parent::setUp();
        $this->paymentController = new PaymentController();
    }

    /**
     *  @test
     */
    public function testCreatePaymentSuccess()
    {
        $balance = Balance::factory()->create();

        $requestData = [
            'name' => 'Payment Test',
            'description' => 'Payment Test description',
            'value' => 10000.99,
            'balance_id' => $balance->id
        ];

        $request = new Request($requestData);

        $response = $this->paymentController->createPayment($request);

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('Payment created successfully!', $responseData['message']);
        $this->assertArrayHasKey('payment', $responseData);
        $this->assertEquals($requestData['name'], $responseData['payment']['name']);
        $this->assertEquals($requestData['description'], $responseData['payment']['description']);
        $this->assertEquals($requestData['value'], $responseData['payment']['value']);
        $this->assertEquals($requestData['balance_id'], $responseData['payment']['balance_id']);

        $payment = Payment::where('id', $responseData['payment']['id'])->first();
        $this->assertNotNull($payment);

        $this->assertEquals($requestData['name'], $payment->name);
        $this->assertEquals($requestData['description'], $payment->description);
        $this->assertEquals($requestData['value'], $payment->value);
        $this->assertEquals($requestData['balance_id'], $payment->balance_id);
    }

    /**
     *  @test
     */
    public function testValidationEmptyFieldsPaymentError()
    {
        $requestData = [
            'name' => '',
            'description' => '',
            'value' => '',
            'balance_id' => '',
        ];

        $request = new Request($requestData);

        $response = $this->paymentController->createPayment($request);

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $response->getStatusCode());

        $responseData = $response->getData(true);

        $this->assertEquals('The name field is required.', $responseData['message']['name'][0]);
        $this->assertEquals('The description field is required.', $responseData['message']['description'][0]);
        $this->assertEquals('The value field is required.', $responseData['message']['value'][0]);
        $this->assertEquals('The balance id field is required.', $responseData['message']['balance_id'][0]);

        $this->assertArrayHasKey('name', $responseData['message']);
        $this->assertArrayHasKey('description', $responseData['message']);
        $this->assertArrayHasKey('value', $responseData['message']);
        $this->assertArrayHasKey('balance_id', $responseData['message']);
    }
}
