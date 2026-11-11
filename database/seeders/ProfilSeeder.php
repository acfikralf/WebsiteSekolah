<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class ProfilSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'profil_sejarah' => 'SMP Islam Watestanjung didirikan pada tahun 1998 dengan visi mulia untuk mencetak generasi muslim yang berilmu dan berakhlak mulia. Berawal dari sebuah madrasah kecil, kini kami telah berkembang menjadi salah satu sekolah Islam unggulan di wilayah Watestanjung dan sekitarnya.',
            
            'profil_sambutan' => "Assalamu'alaikum warahmatullahi wabarakatuh. Selamat datang di website resmi SMP Islam Watestanjung. Kami berkomitmen untuk mendidik generasi yang tidak hanya unggul dalam akademik, tetapi juga berakhlak mulia sesuai tuntunan Islam.",
            'profil_kepala_nama' => 'Ust. Ahmad Fauzi, S.Pd.I.',
            'profil_kepala_foto' => null,

            // Format: Tahun | Deskripsi (satu per baris)
            'profil_timeline' => "1998 | Berdiri sebagai Madrasah Diniyah dengan 1 ruang kelas.\n2005 | Mendapatkan akreditasi pertama dan berganti nama menjadi SMP Islam Watestanjung.\n2012 | Pembangunan gedung 2 lantai dan penambahan laboratorium komputer.\n2020 | Meraih Akreditasi A dan meluncurkan program Tahfidz intensif.\n2024 | Pembukaan gedung baru dan pengembangan Smart Class.",

            'profil_visi' => 'Menjadi sekolah Islam unggulan yang membentuk generasi berilmu, berakhlak mulia, dan berwawasan global.',
            
            'profil_misi' => "Menyelenggarakan pendidikan Islam yang terpadu.\nMengembangkan potensi akademik dan non-akademik siswa.\nMenanamkan nilai-nilai akhlak mulia dalam kehidupan sehari-hari.\nMenjalin kerjasama dengan orang tua dan masyarakat.",
            
            'profil_tujuan' => "1. Terselenggaranya pendidikan yang berkualitas dan islami.\n2. Terbentuknya siswa yang hafal Al-Qur'an minimal 3 juz.\n3. Lulusan yang mampu bersaing di tingkat SMA/MA favorit.",

            // Format: Nama Program | Deskripsi (satu per baris)
            'profil_program' => "Tahfidz Al-Qur'an | Program hafalan Al-Qur'an dengan metode yang menyenangkan.\nPramuka | Melatih kepemimpinan, kedisiplinan, dan kemandirian.\nHadrah | Seni musik islami untuk mengembangkan kreativitas.\nFutsal | Olahraga untuk kesehatan dan sportivitas.",

            'profil_npsn' => '20512345',
            'profil_status' => 'Swasta',
            'profil_alamat' => 'Jl. Pendidikan No. 1, Watestanjung, Jawa Timur',
            'profil_telepon' => '+62 812-3456-7890',
            'profil_email' => 'info@watestanjung.sch.id',
            'profil_tahun_berdiri' => '1998',
        ];

        foreach ($defaults as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}