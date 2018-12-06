<?php

namespace App\Http\Controllers\CrmControllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CrmModels\Profile;
use Carbon\Carbon;

class ProfilesController extends Controller
{
    public function getCrmProfiles(){
    	$profiles = Profile::where('type', '!=', 'A')->orderBy('updated_at', 'desc')->get();
    	return $profiles;
    }

    public function deleteCrmProfile($id){
    	$response = Profile::destroy($id);
    	return $response;
    }

    public function addCrmProfile(Request $request){
        $profile = Profile::find($request->id);
        if($profile == null){
            $profile = new Profile;
        }
    	$profile->name = $request->name;
    	$profile->imp_date = $request->imp_date;
    	$profile->email = $request->email;
    	$profile->type = $request->type;
    	$profile->city = $request->city;
    	$profile->contact = $request->contact;
        $profile->created_at = Carbon::now()->toDateTimeString();
        $profile->updated_at = Carbon::now()->toDateTimeString();
    	$saved = $profile->save();
    	return collect(['saved'=>$saved, 'newobject'=>$profile]);
    }

}
