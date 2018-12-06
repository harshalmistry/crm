<?php

namespace App\Http\Controllers\CrmControllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CrmModels\Customer;
use Carbon\Carbon;

class IndexController extends Controller
{
    public function _construct(){
        $this->middleware('cors');
    }

    public function getCustomers(){
    	$customers = Customer::where('type', '!=', 'A')->orderBy('updated_at', 'desc')->get();
    	return $customers;
    }

    public function deleteCustomer($id){
        $response = Customer::destroy($id);
        return $response;
    }

    public function addCustomer(Request $request){
    	$customer = Customer::find($request->id);
        if($customer == null){
            $customer = new Customer;
        }
    	$customer->name = $request->name;
    	/*$customer->imp_date = $request->imp_date;*/
    	$customer->email = $request->email;
    	$customer->type = $request->type;
    	$customer->city = $request->city;
    	$customer->contact = $request->contact;
        $customer->created_at = Carbon::now()->toDateTimeString();
        $customer->updated_at = Carbon::now()->toDateTimeString();
    	$saved = $customer->save();
    	return collect(['saved'=>$saved, 'newcustomer'=>$customer]);
    }
}
