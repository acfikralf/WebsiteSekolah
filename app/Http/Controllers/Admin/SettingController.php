<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return \Inertia\Inertia::render('Admin/Dashboard', [
            'settings'         => \App\Models\Setting::all_as_array(),
            'ekstrakurikulers' => \App\Models\Ekstrakurikuler::latest()->get(),
            'beritas'          => \App\Models\Berita::latest('tanggal')->get()->map(fn($b) => [
                'id' => $b->id,
                'judul' => $b->judul,
                'kategori' => $b->kategori,
                'status' => $b->status,
                'tanggal' => $b->tanggal->format('Y-m-d'),
                'gambar_url' => $b->gambar_url,
                'ringkasan' => $b->ringkasan,
                'konten' => $b->konten,
            ]),
            'agendas' => \App\Models\Agenda::latest('tanggal')->get()->map(fn($agenda) => [
                'id' => $agenda->id,
                'judul' => $agenda->judul,
                'tanggal' => $agenda->tanggal->format('Y-m-d'),
                'waktu' => $agenda->waktu,
                'lokasi' => $agenda->lokasi,
                'deskripsi' => $agenda->deskripsi,
            ]),
            'prestasis' => \App\Models\Prestasi::latest('tanggal')->get()->map(fn($prestasi) => [
                'id' => $prestasi->id,
                'judul' => $prestasi->judul,
                'siswa' => $prestasi->siswa,
                'kategori' => $prestasi->kategori,
                'tingkat' => $prestasi->tingkat,
                'tanggal' => $prestasi->tanggal->format('Y-m-d'),
                'foto' => $prestasi->foto,
                'deskripsi' => $prestasi->deskripsi,
            ]),
            'gurus'     => \App\Models\Guru::ordered()->get()->map(fn($g) => [
                'id'       => $g->id,
                'nama'     => $g->nama,
                'jabatan'  => $g->jabatan,
                'mapel'    => $g->mapel,
                'foto_url' => $g->foto_url,
                'urutan'   => $g->urutan,
            ]),
            'galeris' => \App\Models\Galeri::ordered()->get()->map(fn($g) => [
                'id'         => $g->id,
                'judul'      => $g->judul,
                'kategori'   => $g->kategori,
                'gambar'     => $g->gambar,
                'gambar_url' => $g->gambar_url,
                'urutan'     => $g->urutan,
            ]),
            'polling' => (function () {
                $p = \App\Models\Polling::with('options')->latest()->first();
                return $p ? [
                    'id'         => $p->id,
                    'pertanyaan' => $p->pertanyaan,
                    'aktif'      => $p->aktif,
                    'options'    => $p->options->map(fn($o) => [
                        'id'    => $o->id,
                        'opsi'  => $o->opsi,
                        'votes' => $o->votes,
                    ]),
                ] : null;
            })(),
            'stats' => [
            'berita'   => \App\Models\Berita::count(),
            'guru'     => \App\Models\Guru::count(),
            'prestasi' => \App\Models\Prestasi::count(),
            'agenda'   => \App\Models\Agenda::count(),
            'galeri'   => \App\Models\Galeri::count(),
            'polling'  => \App\Models\Polling::count(),
        ],

        'recentBerita' => \App\Models\Berita::latest('tanggal')->take(5)->get()->map(fn ($b) => [
            'id'      => $b->id,
            'judul'   => $b->judul,
            'status'  => $b->status,
            'tanggal' => $b->tanggal?->format('Y-m-d'),
        ]),

        'recentAgenda' => \App\Models\Agenda::where('tanggal', '>=', now()->startOfDay())
            ->orderBy('tanggal')
            ->take(3)
            ->get()
            ->map(fn ($a) => [
                'id'      => $a->id,
                'judul'   => $a->judul,
                'tanggal' => $a->tanggal?->format('Y-m-d'),
                'waktu'   => $a->waktu,
                'lokasi'  => $a->lokasi,
            ]),

        'recentPrestasi' => \App\Models\Prestasi::orderBy('tanggal', 'desc')->take(4)->get()->map(fn ($p) => [
            'id'       => $p->id,
            'judul'    => $p->judul,
            'siswa'    => $p->siswa,
            'kategori' => $p->kategori,
            'tingkat'  => $p->tingkat,
            'tanggal'  => $p->tanggal?->format('Y-m-d'),
            'foto_url' => $p->foto ? asset('storage/' . $p->foto) : null,
        ]),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_title'       => 'required|string|max:255',
            'site_tagline'     => 'required|string|max:255',
            'site_description' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return back()->with('success', 'Pengaturan berhasil disimpan.');
    }

    public function updateStatistik(Request $request)
    {
        $validated = $request->validate([
            'stat_siswa'           => 'required|integer|min:0',
            'stat_guru'            => 'required|integer|min:0',
            'stat_prestasi'        => 'required|integer|min:0',
            'stat_ekstrakurikuler' => 'required|integer|min:0',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return back()->with('success', 'Statistik berhasil disimpan.');
    }
}
