<?php

namespace Database\Seeders;

use App\Models\Ekstrakurikuler;
use Illuminate\Database\Seeder;

class EkstrakurikulerSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['nama' => 'Tahfidz Al-Qur\'an', 'pembina' => 'Ust. Abdullah', 'icon' => 'ph-book-open-text', 'deskripsi' => 'Program hafalan Al-Qur\'an dengan metode yang menyenangkan.'],
            ['nama' => 'Pramuka', 'pembina' => 'Kak Budi', 'icon' => 'ph-tent', 'deskripsi' => 'Melatih kepemimpinan, kedisiplinan, dan kemandirian.'],
            ['nama' => 'Hadrah', 'pembina' => 'Ust. Rahman', 'icon' => 'ph-music-notes', 'deskripsi' => 'Seni musik islami untuk mengembangkan kreativitas.'],
            ['nama' => 'Futsal', 'pembina' => 'Pak Andi', 'icon' => 'ph-soccer-ball', 'deskripsi' => 'Olahraga untuk kesehatan dan sportivitas.'],
        ];

        foreach ($data as $item) {
            Ekstrakurikuler::create($item);
        }
    }
}