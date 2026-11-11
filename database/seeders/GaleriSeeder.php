<?php

namespace Database\Seeders;

use App\Models\Galeri;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class GaleriSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['judul' => 'Kegiatan Keagamaan',   'kategori' => 'Keagamaan'],
            ['judul' => 'Upacara Bendera',      'kategori' => 'Kegiatan'],
            ['judul' => 'Perkemahan Pramuka',   'kategori' => 'Ekstrakurikuler'],
            ['judul' => 'Lomba Tahfidz',        'kategori' => 'Keagamaan'],
            ['judul' => 'Turnamen Futsal',      'kategori' => 'Olahraga'],
            ['judul' => 'Pentas Hadrah',        'kategori' => 'Seni'],
            ['judul' => 'Study Tour',           'kategori' => 'Kegiatan'],
            ['judul' => 'Peringatan Maulid',    'kategori' => 'Keagamaan'],
            ['judul' => 'Lomba Kaligrafi',      'kategori' => 'Seni'],
            ['judul' => 'Class Meeting',        'kategori' => 'Olahraga'],
            ['judul' => 'Wisuda Siswa',         'kategori' => 'Kegiatan'],
            ['judul' => 'Mabit (Malam Bina Iman)', 'kategori' => 'Keagamaan'],
        ];

        foreach ($items as $i => $item) {
            // Coba download gambar placeholder
            $filename = null;
            try {
                $url = 'https://picsum.photos/seed/galeri' . ($i + 1) . '/600/400';
                $content = @file_get_contents($url);
                if ($content !== false) {
                    $filename = 'galeri/galeri_' . ($i + 1) . '.jpg';
                    Storage::disk('public')->put($filename, $content);
                }
            } catch (\Exception $e) {
                $filename = null;
            }

            // Skip kalau gambar gagal diunduh
            if (!$filename) {
                continue;
            }

            Galeri::create([
                'judul'    => $item['judul'],
                'kategori' => $item['kategori'],
                'gambar'   => $filename,
                'urutan'   => $i + 1,
            ]);
        }
    }
}