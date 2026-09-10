<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Tambahkan route lain jika diperlukan, misalnya:
// Route::get('/profil', function () {
//     return Inertia::render('Profil');
// })->name('profil');

require __DIR__.'/auth.php';