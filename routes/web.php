<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Setting;
use App\http\Controllers\PollingVoteController;

Route::get('/', function () {
    return Inertia::render('Home', [
         
    ]);
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/polling/vote', [PollingVoteController::class, 'vote'])->name('polling.vote');



require __DIR__.'/auth.php';