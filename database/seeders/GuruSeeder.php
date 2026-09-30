<?php

namespace Database\Seeders;

use App\Models\Guru;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class GuruSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['nama' => 'Ust. Ahmad Fauzi, S.Pd.I.',  'jabatan' => 'Kepala Sekolah',         'mapel' => 'Pendidikan Agama Islam'],
            ['nama' => 'Siti Aminah, S.Pd.',         'jabatan' => 'Guru Matematika',        'mapel' => 'Wali Kelas 9A'],
            ['nama' => 'Budi Santoso, S.Pd.',        'jabatan' => 'Guru IPA',               'mapel' => 'Pembina OSN'],
            ['nama' => 'Dewi Lestari, S.Pd.',        'jabatan' => 'Guru Bahasa Inggris',    'mapel' => 'Wali Kelas 7B'],
            ['nama' => 'Ust. Abdullah, S.Ag.',       'jabatan' => 'Guru Al-Qur\'an',        'mapel' => 'Pembina Tahfidz'],
            ['nama' => 'Rina Kartika, S.Pd.',        'jabatan' => 'Guru Bahasa Indonesia',  'mapel' => 'Wali Kelas 8A'],
            ['nama' => 'Hendra Wijaya, S.Pd.',       'jabatan' => 'Guru IPS',               'mapel' => 'Pembina Pramuka'],
            ['nama' => 'Nurul Hidayah, S.Pd.',       'jabatan' => 'Guru Seni Budaya',       'mapel' => 'Pembina Hadrah'],
            ['nama' => 'Muhammad Rizal, S.Pd.',      'jabatan' => 'Guru Penjaskes',         'mapel' => 'Pembina Futsal'],
            ['nama' => 'Khadijah Ummu, S.Pd.',       'jabatan' => 'Guru Biologi',           'mapel' => 'Wali Kelas 9B'],
        ];

        foreach ($items as $i => $item) {
            // Coba download foto placeholder (opsional)
            $filename = null;
            try {
                $url = 'https://picsum.photos/seed/guru' . ($i + 1) . '/400/500';
                $content = @file_get_contents($url);
                if ($content !== false) {
                    $filename = 'guru/guru_' . ($i + 1) . '.jpg';
                    Storage::disk('public')->put($filename, $content);
                }
            } catch (\Exception $e) {
                $filename = null;
            }

            Guru::create([
                'nama'    => $item['nama'],
                'jabatan' => $item['jabatan'],
                'mapel'   => $item['mapel'],
                'foto'    => $filename,
                'urutan'  => $i + 1,
            ]);
        }
    }
}