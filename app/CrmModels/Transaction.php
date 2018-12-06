<?php

namespace App\CrmModels;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = "transactions";

    public function customer()
    {
        return $this->belongsTo('App\CrmModels\Customer');
    }
}
