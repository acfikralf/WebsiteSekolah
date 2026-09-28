<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            // Pengaturan Website
            'site_title'       => 'SMP Islam Watestanjung',
            'site_tagline'     => 'Unggul dalam Prestasi, Berakhlak Mulia',
            'site_description' => 'Website resmi SMP Islam Watestanjung. Sekolah Islam yang mengintegrasikan pendidikan umum dengan nilai-nilai keislaman.',

            // Statistik Sekolah
            'stat_siswa'          => '450',
            'stat_guru'           => '32',
            'stat_prestasi'       => '57',
            'stat_ekstrakurikuler'=> '12',
        ];

        foreach ($defaults as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}