import MainLayout from '@/Layouts/MainLayout';
import { Trophy, Medal, MusicNotes, SoccerBall } from '@phosphor-icons/react';

const iconMap = { Akademik: Medal, Seni: MusicNotes, Olahraga: SoccerBall, Keagamaan: Trophy };

export default function PrestasiIndex({ prestasis = [] }) {
    return (
        <MainLayout>
            {/* ===== HERO — gradient hijau ke kuning (disamakan dengan Profil) ===== */}
            <section className="relative bg-gradient-to-r from-emerald-900 via-emerald-700 to-yellow-500 text-white overflow-hidden">
                {/* Hiasan lingkaran tipis, bukan blur */}
                <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 text-yellow-300 font-medium uppercase tracking-wider mb-4 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                            <Trophy size={16} /> Prestasi Siswa
                        </p>
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                            Raihan Gemilang<br />
                            <span className="text-yellow-300">
                                Siswa-Siswi Kami
                            </span>
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl">
                            Raihan gemilang siswa-siswi kami di berbagai tingkat kompetisi.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== BODY WRAPPER ===== */}
            <div className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Grid 3 kolom di HP, sama seperti Berita */}
                    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 md:gap-8">
                        {prestasis.map((item) => {
                            const Icon = iconMap[item.kategori] || Trophy;
                            return (
                                <div key={item.id} className="group bg-white dark:bg-slate-900 rounded-lg sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                                    
                                    {/* Foto - Tinggi dipangkas di HP */}
                                    <div className="relative h-24 sm:h-auto sm:aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800">
                                        {item.foto ? (
                                            <img src={`/storage/${item.foto}`} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <Icon className="w-6 h-6 sm:w-12 sm:h-12" />
                                            </div>
                                        )}
                                        
                                        {/* Badge Kategori - Dikecilkan */}
                                        <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-accent-500 text-white text-[7px] sm:text-xs font-medium px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                                            {item.kategori}
                                        </span>
                                        
                                        {/* Badge Tingkat - Dikecilkan */}
                                        {item.tingkat && (
                                            <span className="absolute bottom-1.5 right-1.5 sm:bottom-3 sm:right-3 bg-primary-600/90 text-white text-[7px] sm:text-xs font-medium px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                                                {item.tingkat}
                                            </span>
                                        )}
                                    </div>

                                    {/* Teks */}
                                    <div className="p-2 sm:p-5 flex flex-col flex-grow">
                                        {/* Judul */}
                                        <h3 className="font-display font-bold text-[10px] sm:text-lg text-slate-900 dark:text-white leading-snug line-clamp-2 mb-1 sm:mb-1">
                                            {item.judul}
                                        </h3>
                                        
                                        {/* Nama Siswa */}
                                        <p className="text-[8px] sm:text-sm text-slate-600 dark:text-slate-400 mb-1 sm:mb-3 line-clamp-1">
                                            oleh {item.siswa}
                                        </p>
                                        
                                        {/* Deskripsi */}
                                        <p className="text-[8px] sm:text-sm text-slate-500 line-clamp-2 mt-auto leading-tight">
                                            {item.deskripsi}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        {prestasis.length === 0 && <p className="col-span-full text-center text-xs sm:text-base text-slate-500">Belum ada data prestasi.</p>}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}