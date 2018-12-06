<?php

namespace App\Http\Controllers\CrmControllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CrmModels\Review;
use App\CrmModels\Customer;
use Carbon\Carbon;

class ReviewController extends Controller
{
    public function _construct(){
        $this->middleware('cors');
    }

	public function getReviews($cid){
        $customerwithreviews = Customer::with('reviews')->where('id', $cid)->orderBy('updated_at', 'desc')->get();
        return $customerwithreviews;
	}

    public function aeReview(Request $request){
    	$review = Review::find($request->id);
        if($review == null){
            $review = new Review;
            $review->r_date = Carbon::now()->toDateTimeString();
        }
    	$review->customer_id = $request->customer_id;
    	$review->suggestions = $request->suggestions;
    	$review->followup_date = $request->followup_date;
        $review->created_at = Carbon::now()->toDateTimeString();
        $review->updated_at = Carbon::now()->toDateTimeString();
    	$saved = $review->save();
    	return collect(['saved'=>$saved, 'newreview'=>$review]);
    }
}
