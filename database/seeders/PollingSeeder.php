<?php

namespace Database\Seeders;

use App\Models\Polling;
use App\Models\PollingOption;
use Illuminate\Database\Seeder;

class PollingSeeder extends Seeder
{
    public function run(): void
    {
        PollingOption::query()->delete();
        Polling::query()->delete();

        $polling = Polling::create([
            'pertanyaan' => 'Menurut Anda, informasi apa yang paling bermanfaat?',
            'aktif'      => true,
        ]);

        $options = [
            ['opsi' => 'Berita',   'votes' => 45],
            ['opsi' => 'Prestasi', 'votes' => 30],
            ['opsi' => 'Agenda',   'votes' => 25],
            ['opsi' => 'PPDB',     'votes' => 15],
        ];

        foreach ($options as $i => $opt) {
            PollingOption::create([
                'polling_id' => $polling->id,
                'opsi'       => $opt['opsi'],
                'votes'      => $opt['votes'],
                'urutan'     => $i + 1,
            ]);
        }
    }
}
