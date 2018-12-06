<?php

namespace App\Http\Controllers\CrmControllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CrmModels\Transaction;
use App\CrmModels\Customer;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function _construct(){
        $this->middleware('cors');
    }

    public function getTransactions($cid){
        $customerwithtransactions = Customer::with('transactions')->where('id', $cid)->orderBy('updated_at', 'desc')->get();
        return $customerwithtransactions;
    }

    public function getTotal(){
        $lumsum = Transaction::where('investment_type','LumSum')->sum('t_amount');
        $sip = Transaction::where('investment_type','SIP')->sum('t_amount');
        $swp = Transaction::where('investment_type','SWP')->sum('t_amount');
        $stp = Transaction::where('investment_type','STP')->sum('t_amount');
        $total = $lumsum + $sip + $swp + $stp;
        return collect(['lumsum'=>$lumsum, 'sip'=>$sip, 'swp'=>$swp, 'stp'=>$stp, 'total'=>$total]);
    }

	public function aeTransaction(Request $request){
    	$transaction = Transaction::find($request->id);
        if($transaction == null){
            $transaction = new Transaction;
        }
		$transaction->customer_id = $request->customer_id;
		$transaction->t_date = $request->t_date;
    	$transaction->scheme_name = $request->scheme_name;
    	$transaction->investment_type = $request->investment_type;
    	$transaction->t_amount = $request->t_amount;
    	$transaction->kyc_status = $request->kyc_status;
    	$transaction->next_t_date = $request->next_t_date;
    	$transaction->courier_done = $request->courier_done; 
        $transaction->created_at = Carbon::now()->toDateTimeString();
        $transaction->updated_at = Carbon::now()->toDateTimeString();
    	$saved = $transaction->save();
    	return collect(['saved'=>$saved, 'newtransaction'=>$transaction]);
    }
}
