<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'site' => fn() => [
                'title'       => \App\Models\Setting::get('site_title', 'SMP Islam Watestanjung'),
                'tagline'     => \App\Models\Setting::get('site_tagline', 'Unggul dalam Prestasi, Berakhlak Mulia'),
                'description' => \App\Models\Setting::get('site_description', ''),
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
            ],
            'ekstrakurikulers' => fn() => \App\Models\Ekstrakurikuler::latest()->get(),
            'beritas' => fn() => \App\Models\Berita::where('status', 'published')
                ->latest('tanggal')
                ->take(3)
                ->get()
                ->map(fn($b) => [
                    'id'         => $b->id,
                    'judul'      => $b->judul,
                    'ringkasan'  => $b->ringkasan,
                    'kategori'   => $b->kategori,
                    'tanggal'    => $b->tanggal->format('Y-m-d'),
                    'gambar_url' => $b->gambar_url,
                ]),

            'stats' => fn() => [
                'siswa'           => (int) \App\Models\Setting::get('stat_siswa', 450),
                'guru'            => (int) \App\Models\Setting::get('stat_guru', 32),
                'prestasi'        => (int) \App\Models\Setting::get('stat_prestasi', 57),
                'ekstrakurikuler' => (int) \App\Models\Setting::get('stat_ekstrakurikuler', 12),
            ],
            'agendas' => \App\Models\Agenda::where('tanggal', '>=', now()->startOfDay())->orderBy('tanggal')->take(4)->get(),
            'prestasis' => fn() => \App\Models\Prestasi::latest('tanggal')
                ->take(4)
                ->get()
                ->map(fn($prestasi) => [
                    'id' => $prestasi->id,
                    'judul' => $prestasi->judul,
                    'siswa' => $prestasi->siswa,
                    'kategori' => $prestasi->kategori,
                    'tingkat' => $prestasi->tingkat,
                    'tanggal' => $prestasi->tanggal->format('Y-m-d'),
                    'foto' => $prestasi->foto,
                    'deskripsi' => $prestasi->deskripsi,
                ]),
        ]);
    }
}
