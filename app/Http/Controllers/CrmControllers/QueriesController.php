<?php

namespace App\Http\Controllers\CrmControllers;
use App\CrmModels\Query;
use App\CrmModels\Customer;
use Carbon\Carbon;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class QueriesController extends Controller
{
    public function _construct(){
        $this->middleware('cors');
    }

    public function getQueries($cid){
    	$customerwithqueries = Customer::with('queries')->where('id', $cid)->orderBy('updated_at', 'desc')->get();
    	return $customerwithqueries;
    }

    public function addQuery(Request $request){
        $query = Query::find($request->id);
        if($query == null){
            $query = new Query;
            $query->q_date = Carbon::now()->toDateTimeString();
            $query->q_solved_date = null;
        }
        $query->q_type = $request->q_type;
        if($query->q_type == 'Closed'){
            $query->q_solved_date = Carbon::now()->toDateTimeString();
        }

    	$query->customer_id = $request->customer_id;
    	$query->q_details = $request->q_details;
    	$query->q_gap_reason = $request->q_gap_reason;
        $query->created_at = Carbon::now()->toDateTimeString();
        $query->updated_at = Carbon::now()->toDateTimeString();
    	$saved = $query->save();
    	return collect(['saved'=>$saved, 'newquery'=>$query]);
    }
}
