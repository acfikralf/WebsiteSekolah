<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            SettingSeeder::class,
            EkstrakurikulerSeeder::class,
            BeritaSeeder::class,
            AgendaSeeder::class,
            PrestasiSeeder::class,
            GuruSeeder::class,
            GaleriSeeder::class,

        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
