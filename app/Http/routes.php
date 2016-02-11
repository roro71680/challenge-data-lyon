<?php

use Illuminate\Http\Response;

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/recherche', 'RechercheController@index');

Route::post('/recherche/rechercher', 'RechercheController@rechercher');
//Route::post('/recherche/rechercher', ['uses' => 'RechercheController@rechercher', 'as' => 'home']);

// create auto-completion
Route::get('/autocomplete', function () {
    return view('autocomplete');
});

// get Towns data
Route::get('/town', 'AutoCompleteController@getTown');


// get Init (initialisation de la map)
Route::get('/init/', 'GeometryController@getValues');


// get Values 
Route::get('/days/{days}', 'GeometryController@getDays');


// get Towns data
Route::get('/towns/{town}', 'GeometryController@getTowns');

/*Route::get('/towns/{days}/{town?}', function ($town = null) {
    return $name;
});
*/

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});
