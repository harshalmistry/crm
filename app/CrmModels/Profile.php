<?php

namespace App\CrmModels;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profile';

     public function queries()
    {
        return $this->hasMany('App\CrmModels\Query');
    }
}
