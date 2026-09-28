<?php

namespace Database\Seeders;

use App\Models\Prestasi;
use Illuminate\Database\Seeder;

class PrestasiSeeder extends Seeder
{
    public function run(): void
    {
        // Bersihkan data lama (opsional)
        // Prestasi::truncate();

        $items = [
            [
                'judul'     => 'Juara 1 Olimpiade Matematika',
                'siswa'     => 'Ahmad Rizki',
                'kategori'  => 'Akademik',
                'tingkat'   => 'Kabupaten',
                'tanggal'   => now()->subDays(30)->toDateString(),
                'deskripsi' => 'Meraih juara 1 dalam Olimpiade Matematika tingkat Kabupaten.',
                'foto'      => null,
            ],
            [
                'judul'     => 'Juara 2 Lomba Hadrah',
                'siswa'     => 'Tim Hadrah Al-Falah',
                'kategori'  => 'Seni',
                'tingkat'   => 'Provinsi',
                'tanggal'   => now()->subDays(45)->toDateString(),
                'deskripsi' => 'Tim hadrah meraih juara 2 di tingkat Provinsi.',
                'foto'      => null,
            ],
            [
                'judul'     => 'Juara 3 Futsal',
                'siswa'     => 'Tim Futsal SMP Islam',
                'kategori'  => 'Olahraga',
                'tingkat'   => 'Kabupaten',
                'tanggal'   => now()->subDays(60)->toDateString(),
                'deskripsi' => 'Tim futsal meraih juara 3 tingkat Kabupaten.',
                'foto'      => null,
            ],
            [
                'judul'     => 'Juara 1 Olimpiade Sains (IPA)',
                'siswa'     => 'Siti Nurhaliza',
                'kategori'  => 'Akademik',
                'tingkat'   => 'Kabupaten',
                'tanggal'   => now()->subDays(20)->toDateString(),
                'deskripsi' => 'Meraih juara 1 Olimpiade Sains bidang IPA.',
                'foto'      => null,
            ],
            [
                'judul'     => 'Juara 2 Lomba Pidato Bahasa Arab',
                'siswa'     => 'Muhammad Farhan',
                'kategori'  => 'Akademik',
                'tingkat'   => 'Provinsi',
                'tanggal'   => now()->subDays(15)->toDateString(),
                'deskripsi' => 'Meraih juara 2 lomba pidato Bahasa Arab tingkat Provinsi.',
                'foto'      => null,
            ],
            [
                'judul'     => 'Juara 1 Musabaqah Tilawatil Qur\'an',
                'siswa'     => 'Aisyah Zahra',
                'kategori'  => 'Keagamaan',
                'tingkat'   => 'Kabupaten',
                'tanggal'   => now()->subDays(10)->toDateString(),
                'deskripsi' => 'Meraih juara 1 MTQ tingkat Kabupaten.',
                'foto'      => null,
            ],
            [
                'judul'     => 'Juara 1 Lomba Cerdas Cermat Islam',
                'siswa'     => 'Tim Cerdas Cermat',
                'kategori'  => 'Keagamaan',
                'tingkat'   => 'Provinsi',
                'tanggal'   => now()->subDays(7)->toDateString(),
                'deskripsi' => 'Tim cerdas cermat meraih juara 1 tingkat Provinsi.',
                'foto'      => null,
            ],
            [
                'judul'     => 'Juara 2 Turnamen Bola Voli',
                'siswa'     => 'Tim Voli Putra',
                'kategori'  => 'Olahraga',
                'tingkat'   => 'Kabupaten',
                'tanggal'   => now()->subDays(5)->toDateString(),
                'deskripsi' => 'Tim voli putra meraih juara 2 tingkat Kabupaten.',
                'foto'      => null,
            ],
            [
                'judul'     => 'Juara 1 Lomba Kaligrafi',
                'siswa'     => 'Fatimah Az-Zahra',
                'kategori'  => 'Seni',
                'tingkat'   => 'Kabupaten',
                'tanggal'   => now()->subDays(3)->toDateString(),
                'deskripsi' => 'Meraih juara 1 lomba kaligrafi tingkat Kabupaten.',
                'foto'      => null,
            ],
        ];

        foreach ($items as $item) {
            Prestasi::create($item);
        }
    }
}