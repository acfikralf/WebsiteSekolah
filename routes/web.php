<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Setting;
use App\http\Controllers\PollingVoteController;


Route::get('/', function () {
    return Inertia::render('Home', [
        'kepalaSekolah' => [
            'nama'     => \App\Models\Setting::get('profil_kepala_nama', 'Nama Kepala Sekolah'),
            'foto'     => \App\Models\Setting::get('profil_kepala_foto'),
            'sambutan' => \App\Models\Setting::get('profil_sambutan', 'Teks sambutan belum diisi.'),
        ],
    ]);
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/polling/vote', [PollingVoteController::class, 'vote'])->name('polling.vote');

// Route publik
Route::get('/profil', function () {
    return Inertia::render('Profil', [
        'profil' => [
            'sejarah'       => \App\Models\Setting::get('profil_sejarah', ''),
            'sambutan'      => \App\Models\Setting::get('profil_sambutan', ''),
            'kepala_nama'   => \App\Models\Setting::get('profil_kepala_nama', ''),
            'kepala_foto'   => \App\Models\Setting::get('profil_kepala_foto', null),
            'timeline'      => \App\Models\Setting::get('profil_timeline', ''),
            'visi'          => \App\Models\Setting::get('profil_visi', ''),
            'misi'          => \App\Models\Setting::get('profil_misi', ''),
            'tujuan'        => \App\Models\Setting::get('profil_tujuan', ''),
            'program'       => \App\Models\Setting::get('profil_program', ''),
            'npsn'          => \App\Models\Setting::get('profil_npsn', ''),
            'status'        => \App\Models\Setting::get('profil_status', ''),
            'alamat'        => \App\Models\Setting::get('profil_alamat', ''),
            'telepon'       => \App\Models\Setting::get('profil_telepon', ''),
            'email'         => \App\Models\Setting::get('profil_email', ''),
            'tahun_berdiri' => \App\Models\Setting::get('profil_tahun_berdiri', ''),
        ],
    ]);
})->name('profil');

Route::middleware('auth')->group(function () {
    // ...
    Route::post('/admin/profil', [\App\Http\Controllers\Admin\ProfilController::class, 'update'])
        ->name('admin.profil.update');
});



require __DIR__.'/auth.php';