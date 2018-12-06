<?php

namespace App\Http\Controllers\CrmControllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CrmModels\Task;

class TaskController extends Controller
{
    public function _construct(){
        $this->middleware('cors');
    }

    public function getTasks(){
        $tasks = Task::orderBy('updated_at', 'desc')->get();
        return $tasks;
    }

    public function aeTask(Request $request){
    	$task = Task::find($request->id);
        if($task == null){
            $task = new Task;
        }

        $task->t_brief = $request->t_brief;
        $task->t_details = $request->t_details;
        $task->t_deadline = $request->t_deadline;
        $task->t_status = $request->t_status;
        $task->t_start_date = $request->t_start_date;
        $saved = $task->save();
    	return collect(['saved'=>$saved, 'newtask'=>$task]);
    }
}
