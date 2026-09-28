
<?php

use App\Http\Controllers\Admin\BeritaController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\AgendaController;
use App\Http\Controllers\Admin\EkstrakurikulerController;
use App\Http\Controllers\Admin\PrestasiController;
use Illuminate\Support\Facades\Route;


Route::middleware('guest')->group(function () {

    // Login
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->name('login.store');

    // Register
    Route::get('/register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('/register', [RegisteredUserController::class, 'store']);

    // Forgot Password
    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    // Reset Password
    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('/reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});


Route::middleware('auth')->group(function () {

    //Logout

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');


    //Admin Dadhboard

    Route::get('/dashboard', [SettingController::class, 'index'])
        ->name('admin.dashboard');


    //Admin

    Route::get('/admin/settings', [SettingController::class, 'index'])
        ->name('admin.settings');

    Route::put('/admin/settings', [SettingController::class, 'update'])
        ->name('admin.settings.update');

    //Statistik
    Route::put('/admin/statistik', [SettingController::class, 'updateStatistik'])->name('admin.statistik.update');

    //Ekstra
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::post('ekstrakurikuler', [EkstrakurikulerController::class, 'store'])->name('ekstrakurikuler.store');
        Route::put('ekstrakurikuler/{ekstrakurikuler}', [EkstrakurikulerController::class, 'update'])->name('ekstrakurikuler.update');
        Route::delete('ekstrakurikuler/{ekstrakurikuler}', [EkstrakurikulerController::class, 'destroy'])->name('ekstrakurikuler.destroy');
    });

    //Berita

    Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
        Route::post('berita', [BeritaController::class, 'store'])->name('berita.store');
        Route::post('berita/{berita}', [BeritaController::class, 'update'])->name('berita.update'); // pakai POST + _method=PUT untuk file upload
        Route::delete('berita/{berita}', [BeritaController::class, 'destroy'])->name('berita.destroy');
    });

    //Profile

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Agenda 
     Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
        Route::post('agenda', [AgendaController::class, 'store'])->name('agenda.store');
        Route::put('agenda/{agenda}', [AgendaController::class, 'update'])->name('agenda.update'); // pakai POST + _method=PUT untuk file upload
        Route::delete('agenda/{agenda}', [AgendaController::class, 'destroy'])->name('agenda.destroy');
    });

    // Prestasi
     Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
        Route::post('prestasi', [PrestasiController::class, 'store'])->name('prestasi.store');
        Route::post('prestasi/{prestasi}', [PrestasiController::class, 'update'])->name('prestasi.update'); // pakai POST + _method=PUT untuk file upload
        Route::delete('prestasi/{prestasi}', [PrestasiController::class, 'destroy'])->name('prestasi.destroy');
    });

    //Password Confirm

    Route::get('/confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store']);


    //Password Update

    Route::put('/password', [PasswordController::class, 'update'])
        ->name('password.update');


    //Email Verifikasi

    Route::get('/verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
});
