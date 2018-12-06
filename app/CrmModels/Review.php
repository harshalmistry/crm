<?php

namespace App\CrmModels;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = "reviews";

    public function customer()
    {
        return $this->belongsTo('App\CrmModels\Customer');
    }
}
