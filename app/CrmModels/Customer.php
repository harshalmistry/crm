<?php

namespace App\CrmModels;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';

    public function queries()
    {
        return $this->hasMany('App\CrmModels\Query');
    }

    public function reviews()
    {
    	return $this->hasMany('App\CrmModels\Review');
    }

    public function followups()
    {
    	return $this->hasMany('App\CrmModels\Followup');
    }

    public function transactions(){
        return $this->hasMany('App\CrmModels\Transaction');
    }
}
