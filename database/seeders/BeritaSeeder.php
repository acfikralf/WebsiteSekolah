<?php

namespace Database\Seeders;

use App\Models\Berita;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'judul' => 'Peringatan Maulid Nabi Muhammad SAW 1447 H',
                'ringkasan' => 'SMP Islam Watestanjung menggelar peringatan Maulid Nabi dengan berbagai kegiatan islami.',
                'konten' => 'Kegiatan peringatan Maulid Nabi diisi dengan lomba tahfidz, hadrah, dan ceramah agama oleh ustadz tamu.',
                'kategori' => 'Kegiatan',
                'status' => 'published',
                'tanggal' => '2025-09-12',
            ],
            [
                'judul' => 'Siswa Raih Juara 1 Olimpiade Sains Kabupaten',
                'ringkasan' => 'Prestasi membanggakan kembali diraih oleh siswa SMP Islam Watestanjung dalam ajang OSN.',
                'konten' => 'Ahmad Rizki, siswa kelas 9A, berhasil meraih juara 1 Olimpiade Sains bidang Matematika tingkat kabupaten.',
                'kategori' => 'Prestasi',
                'status' => 'published',
                'tanggal' => '2025-08-28',
            ],
            [
                'judul' => 'Perkemahan Pramuka Penggalang 2025',
                'ringkasan' => 'Kegiatan perkemahan untuk melatih kemandirian dan kerjasama antar siswa.',
                'konten' => 'Perkemahan berlangsung selama 3 hari di bumi perkemahan dengan berbagai kegiatan kepramukaan.',
                'kategori' => 'Ekstrakurikuler',
                'status' => 'draft',
                'tanggal' => '2025-08-15',
            ],
        ];

        foreach ($data as $item) {
            Berita::create($item + ['slug' => Str::slug($item['judul']) . '-' . time() . rand(10, 99)]);
        }
    }
}