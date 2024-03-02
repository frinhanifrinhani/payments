<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'value',
        'balance_id'
    ];

    public function balance()
    {
        return $this->belongsTo(Balance::class);
    }
}
