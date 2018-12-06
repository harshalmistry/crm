<?php

Route::get('/', function () {
    return view('index');
});


Route::get('/crm/customers', 'CrmControllers\IndexController@getCustomers');
Route::post('crm/customer', 'CrmControllers\IndexController@addCustomer');
Route::get('crm/customer/{id}', 'CrmControllers\IndexController@deleteCustomer');

Route::get('crm/meetings', 'CrmControllers\MeetingController@getMeetings');
Route::post('crm/meeting', 'CrmControllers\MeetingController@addMeeting');

Route::get('/crm/profiles', 'CrmControllers\ProfilesController@getCrmProfiles');
Route::get('/crm/profiles/{id}', 'CrmControllers\ProfilesController@deleteCrmProfile');
Route::post('/crm/profiles', 'CrmControllers\ProfilesController@addCrmProfile');

Route::get('/crm/queries/{pid}', 'CrmControllers\QueriesController@getQueries');
Route::post('/crm/query', 'CrmControllers\QueriesController@addQuery');

Route::get('/crm/reviews/{cid}', 'CrmControllers\ReviewController@getReviews');
Route::post('/crm/review', 'CrmControllers\ReviewController@aeReview');

Route::get('/crm/followups/{cid}', 'CrmControllers\FollowupController@getFollowups');
Route::post('/crm/followup', 'CrmControllers\FollowupController@aeFollowup');

Route::post('/crm/transaction', 'CrmControllers\TransactionController@aeTransaction');
Route::get('/crm/transactions/{cid}', 'CrmControllers\TransactionController@getTransactions');
Route::get('/crm/total', 'CrmControllers\TransactionController@getTotal');

Route::get('crm/tasks', 'CrmControllers\TaskController@getTasks');
Route::post('crm/task', 'CrmControllers\TaskController@aeTask');