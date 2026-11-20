<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class WebsiteContentSeeder extends Seeder
{
    public function run(): void
    {
        $file = database_path('seeders/data/website-content.json');

        if (!file_exists($file)) {
            throw new RuntimeException(
                'File website-content.json tidak ditemukan.'
            );
        }

        $data = json_decode(
            file_get_contents($file),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        $tables = [
            'settings',
            'beritas',
            'agendas',
            'prestasis',
            'gurus',
            'galeris',
            'ekstrakurikulers',
            'pollings',
            'polling_options',
        ];

        DB::transaction(function () use ($data, $tables) {
            foreach ($tables as $table) {
                $rows = $data[$table] ?? [];

                if (empty($rows)) {
                    continue;
                }

                // Settings menggunakan key sebagai identitas.
                if ($table === 'settings') {
                    foreach ($rows as $row) {
                        DB::table('settings')->updateOrInsert(
                            ['key' => $row['key']],
                            [
                                'value' => $row['value'],
                                'created_at' => $row['created_at'],
                                'updated_at' => $row['updated_at'],
                            ]
                        );
                    }
                } else {
                    // Tabel lainnya menggunakan ID.
                    $updateColumns = array_values(
                        array_diff(
                            array_keys($rows[0]),
                            ['id']
                        )
                    );

                    DB::table($table)->upsert(
                        $rows,
                        ['id'],
                        $updateColumns
                    );
                }

                $this->command->info(
                    "Berhasil memasukkan data {$table}: "
                    . count($rows) . ' baris'
                );
            }
        });

        $this->command->info(
            'Semua konten website berhasil di-seed!'
        );
    }
}
