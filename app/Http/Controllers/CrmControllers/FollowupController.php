<?php

namespace App\Http\Controllers\CrmControllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CrmModels\Followup;
use App\CrmModels\Customer;
use Carbon\Carbon;

class FollowupController extends Controller
{
    public function _construct(){
        $this->middleware('cors');
    }

	function getFollowups($cid){
		$customerwithfollowups = Customer::with('followups')->where('id', $cid)->orderBy('updated_at', 'desc')->get();
        return $customerwithfollowups;
	}

    public function aeFollowup(Request $request){
    	$followup = Followup::find($request->id);
        if($followup == null){
            $followup = new Followup;
            $followup->m_date = Carbon::now()->toDateTimeString();
        }		
    	$followup->customer_id = $request->customer_id;
    	$followup->m_details = $request->m_details;
    	$followup->m_next_date = $request->m_next_date;
        $followup->created_at = Carbon::now()->toDateTimeString();
        $followup->updated_at = Carbon::now()->toDateTimeString();
    	$saved = $followup->save();
    	return collect(['saved'=>$saved, 'newfollowup'=>$followup]);
    }
}
