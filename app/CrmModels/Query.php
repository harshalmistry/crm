<?php

namespace App\CrmModels;

use Illuminate\Database\Eloquent\Model;

class Query extends Model
{
    protected $table = 'queries';

    public function customer()
    {
        return $this->belongsTo('App\CrmModels\Customer');
    }
}
