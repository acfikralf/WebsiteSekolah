<?php

namespace Database\Seeders;

use App\Models\Agenda;
use Illuminate\Database\Seeder;

class AgendaSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'judul'     => 'Rapat Orang Tua Siswa',
                'tanggal'   => now()->addDays(5)->toDateString(),
                'waktu'     => '08:00 - 10:00',
                'lokasi'    => 'Aula Sekolah',
                'deskripsi' => 'Rapat koordinasi antara pihak sekolah dengan orang tua/wali siswa.',
            ],
            [
                'judul'     => 'Lomba Tahfidz Internal',
                'tanggal'   => now()->addDays(10)->toDateString(),
                'waktu'     => '09:00 - 12:00',
                'lokasi'    => 'Masjid Sekolah',
                'deskripsi' => 'Kompetisi hafalan Al-Qur\'an antar kelas.',
            ],
            [
                'judul'     => 'Upacara Hari Kesaktian Pancasila',
                'tanggal'   => now()->addDays(15)->toDateString(),
                'waktu'     => '07:00 - 08:00',
                'lokasi'    => 'Lapangan Upacara',
                'deskripsi' => 'Upacara peringatan Hari Kesaktian Pancasila.',
            ],
            [
                'judul'     => 'Peringatan Maulid Nabi',
                'tanggal'   => now()->addDays(20)->toDateString(),
                'waktu'     => '08:00 - 11:00',
                'lokasi'    => 'Aula Sekolah',
                'deskripsi' => 'Kegiatan peringatan Maulid Nabi Muhammad SAW.',
            ],
            [
                'judul'     => 'Study Tour ke Museum',
                'tanggal'   => now()->addDays(30)->toDateString(),
                'waktu'     => '07:00 - 15:00',
                'lokasi'    => 'Museum Nasional',
                'deskripsi' => 'Kunjungan edukatif ke museum nasional.',
            ],
        ];

        foreach ($items as $item) {
            Agenda::create($item);
        }
    }
}