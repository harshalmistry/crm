<?php

namespace App\CrmModels;

use Illuminate\Database\Eloquent\Model;

class Followup extends Model
{
    protected $table = "followups";

    public function customer()
    {
        return $this->belongsTo('App\CrmModels\Customer');
    }
}
