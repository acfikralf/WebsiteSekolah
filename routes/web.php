<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Setting;
use App\Http\Controllers\PollingVoteController;
use App\Models\Berita;
use App\Models\Agenda;
use App\Models\Guru;
use App\Models\Ekstrakurikuler;
use App\Models\Prestasi;
use App\Models\Galeri;
use App\Http\Controllers\MadingController;



Route::get('/', function () {
    return Inertia::render('Home', [
        'kepalaSekolah' => [
            'nama'     => \App\Models\Setting::get('profil_kepala_nama', 'Nama Kepala Sekolah'),
            'foto'     => \App\Models\Setting::get('profil_kepala_foto'),
            'sambutan' => \App\Models\Setting::get('profil_sambutan', 'Teks sambutan belum diisi.'),
        ],
        'profil' => [
            'visi' => Setting::get('profil_visi', ''),
            'misi' => Setting::get('profil_misi', ''),

        ],
        'madings' => \App\Models\Mading::where('status', 'published')->latest()->take(4)->get(),
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

Route::get('/berita', function () {
    return Inertia::render('Berita/Index', [
        'beritas' => Berita::where('status', 'published')
            ->latest('tanggal')
            ->get()
            ->map(fn($b) => [
                'id'         => $b->id,
                'judul'      => $b->judul,
                'kategori'   => $b->kategori,
                'status'     => $b->status,
                'tanggal'    => $b->tanggal?->format('Y-m-d'),
                'gambar_url' => $b->gambar_url,
                'ringkasan'  => $b->ringkasan,
                'konten'     => $b->konten,
            ])
            ->values(),
    ]);
})->name('berita.index');

Route::get('/berita/{berita}', function (\App\Models\Berita $berita) {
    // Pastikan hanya berita published yang bisa dilihat publik
    if ($berita->status !== 'published') {
        abort(404);
    }

    // Ambil 3 berita lain untuk rekomendasi
    $beritaLainnya = \App\Models\Berita::where('status', 'published')
        ->where('id', '!=', $berita->id)
        ->latest('tanggal')
        ->take(3)
        ->get()
        ->map(fn($b) => [
            'id'         => $b->id,
            'judul'      => $b->judul,
            'kategori'   => $b->kategori,
            'status'     => $b->status,
            'tanggal'    => $b->tanggal?->format('Y-m-d'),
            'gambar_url' => $b->gambar_url,
            'ringkasan'  => $b->ringkasan,
            'konten'     => $b->konten,
        ])
        ->values();

    return Inertia::render('Berita/Show', [
        'berita' => [
            'id'         => $berita->id,
            'judul'      => $berita->judul,
            'kategori'   => $berita->kategori,
            'status'     => $berita->status,
            'tanggal'    => $berita->tanggal?->format('Y-m-d'),
            'gambar_url' => $berita->gambar_url,
            'ringkasan'  => $berita->ringkasan,
            'konten'     => $berita->konten,
        ],
        'beritaLainnya' => $beritaLainnya,
    ]);
})->name('berita.show');

// Rute Halaman Agenda  
Route::get('/agenda', function () {
    return Inertia::render('Agenda/Index', [
        'agendas' => Agenda::where('tanggal', '>=', now()->startOfDay())->orderBy('tanggal')->get()
    ]);
})->name('agenda.index');

Route::get('/guru', function () {
    return Inertia::render('Guru/Index', [
        'gurus' => Guru::orderBy('urutan', 'asc')->get(),
    ]);
});

Route::get('/ekstrakurikuler', function () {
    return Inertia::render('Ekstrakurikuler/Index', [
        'ekstrakurikulers' => Ekstrakurikuler::latest()->get()
    ]);
})->name('ekstrakurikuler.index');

Route::get('/prestasi', function () {
    return Inertia::render('Prestasi/Index', [
        'prestasis' => Prestasi::orderBy('tanggal', 'desc')->get()
    ]);
})->name('prestasi.index');

Route::get('/galeri', function () {
    return Inertia::render('Galeri/Index', [
        'galeris' => Galeri::ordered()
            ->get()
            ->map(fn($g) => [
                'id'         => $g->id,
                'judul'      => $g->judul,
                'kategori'   => $g->kategori,
                'gambar'     => $g->gambar,
                'gambar_url' => $g->gambar_url,
                'urutan'     => $g->urutan,
            ])
            ->values(),
    ]);
})->name('galeri.index');

Route::get('/ppdb', function () {
    return Inertia::render('Ppdb/Index');
})->name('ppdb.index');

Route::get('/kontak', function () {
    return Inertia::render('Kontak/Index', [
        // Kirim data setting untuk halaman kontak
        'kontak' => [
            'alamat'  => \App\Models\Setting::get('profil_alamat', 'Jl. Pendidikan No. 1, Watestanjung'),
            'telepon' => \App\Models\Setting::get('profil_telepon', '+62 812-3456-7890'),
            'email'   => \App\Models\Setting::get('profil_email', 'info@watestanjung.sch.id'),
        ]
    ]);
})->name('kontak.index');

Route::get('/galeri-murid', [MadingController::class, 'index'])->name('mading.index');
Route::post('/galeri-murid', [MadingController::class, 'store'])->name('mading.store');




require __DIR__ . '/auth.php';
