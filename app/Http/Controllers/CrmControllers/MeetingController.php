<?php

namespace App\Http\Controllers\CrmControllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CrmModels\Meeting;

class MeetingController extends Controller
{
    public function _construct(){
        $this->middleware('cors');
    }
    
    public function getMeetings(){
    	$meetings = Meeting::get();
    	return $meetings;
    }

    public function addMeeting(Request $request){
    	try{
    		$meeting = Meeting::where('mn', $request->mn)->get();
    		$meeting[0]->nos = $request->nos;
    		$meeting[0]->save();
    	}
    	catch(Exception $e){
    		return 0;
    	}
    	return 1;
    }
}
