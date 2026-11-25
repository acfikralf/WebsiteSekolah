import useReveal from '@/hooks/useReveal';
import { Medal, MusicNotes, SoccerBall, Trophy, ArrowRight } from '@phosphor-icons/react';
import { usePage } from '@inertiajs/react';

const iconMap = {
    Akademik: Medal,
    Seni: MusicNotes,
    Olahraga: SoccerBall,
    Keagamaan: Trophy,
};

export default function Prestasi({ prestasiList = [] }) {
    const titleRef = useReveal();
    const { prestasis } = usePage().props;

    return (
        <section id="prestasi" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12" ref={titleRef}>
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Prestasi Terbaru
                    </h2>
                    <div className="w-12 sm:w-24 h-1 bg-accent-500 mx-auto mt-2 sm:mt-4 rounded-full"></div>
                    <p className="mt-2 sm:mt-4 text-[9px] sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Raihan gemilang siswa kami
                    </p>
                </div>

                {/* Grid 3 Kolom (Mobile), 2 (Tablet), 3 (Desktop) */}
                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
                    {prestasis.length === 0 && (
                        <p className="col-span-full text-center text-xs sm:text-base text-slate-500">Belum ada prestasi.</p>
                    )}

                    {prestasis.map((item) => {
                        const Icon = iconMap[item.kategori] || Trophy;
                        return (
                            <div
                                key={item.id}
                                className="group bg-slate-50 dark:bg-slate-800 rounded-lg sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col reveal"
                            >
                                {/* Foto */}
                                <div className="relative aspect-[4/3] sm:aspect-auto sm:h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                                    {item.foto ? (
                                        <img
                                            src={`/storage/${item.foto}`}
                                            alt={item.judul}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <i className="ph ph-image text-xl sm:text-4xl"></i>
                                        </div>
                                    )}
                                    
                                    {/* Badge kategori - Diperkecil drastis di HP */}
                                    <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-accent-500 text-white text-[7px] sm:text-xs font-medium px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                                        {item.kategori}
                                    </span>
                                    
                                    {/* Badge tingkat - Diperkecil drastis di HP */}
                                    {item.tingkat && (
                                        <span className="absolute bottom-1.5 right-1.5 sm:bottom-3 sm:right-3 bg-primary-600/90 backdrop-blur-sm text-white text-[7px] sm:text-xs font-medium px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                                            {item.tingkat}
                                        </span>
                                    )}
                                </div>

                                {/* Body */}
                                <div className="p-2 sm:p-5 flex flex-col flex-grow">
                                    {/* Ikon Kategori - Disembunyikan di HP agar hemat tempat, atau dikecilkan */}
                                    <div className="hidden sm:flex items-center gap-2 mb-2 text-primary-600 dark:text-accent-400">
                                        <Icon size={20} />
                                        <span className="text-xs uppercase tracking-wider font-semibold">
                                            {item.kategori}
                                        </span>
                                    </div>

                                    {/* Judul - Dibesarkan sedikit di HP (text-[11px]) */}
                                    <h3 className="text-[11px] sm:text-xl font-display font-bold sm:font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors leading-snug line-clamp-2 mb-1 sm:mb-2">
                                        {item.judul}
                                    </h3>

                                    {/* Nama Siswa - Dikecilkan (text-[8px]) */}
                                    {item.siswa && (
                                        <p className="text-[8px] sm:text-sm text-slate-500 dark:text-slate-400 mb-1 sm:mb-0">
                                            oleh <span className="font-medium text-slate-700 dark:text-slate-300">{item.siswa}</span>
                                        </p>
                                    )}

                                    {/* Deskripsi - Dikecilkan (text-[8px]) dan dibatasi 2 baris */}
                                    {item.deskripsi && (
                                        <p className="text-[8px] sm:text-base text-slate-500 dark:text-slate-400 line-clamp-2 sm:line-clamp-none flex-grow leading-tight">
                                            {item.deskripsi}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center mt-6 sm:mt-10 reveal">
                    <a href="/prestasi" className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white text-[10px] sm:text-base font-medium rounded-md sm:rounded-xl shadow-lg shadow-primary-600/20 transition-all active:scale-95 sm:hover:-translate-y-0.5">
                        Lihat Semua Prestasi
                        <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}