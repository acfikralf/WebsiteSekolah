import useReveal from '@/hooks/useReveal';
import { usePage } from '@inertiajs/react';

export default function Guru() {
    const titleRef = useReveal();
    const { gurus } = usePage().props;

    return (
        <section id="guru" className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12" ref={titleRef}>
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Guru Kami
                    </h2>
                    <div className="w-12 sm:w-24 h-1 bg-accent-500 mx-auto mt-2 sm:mt-4 rounded-full"></div>
                    <p className="mt-2 sm:mt-4 text-[10px] sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Pendidik profesional dan berdedikasi
                    </p>
                </div>

                <div className="grid grid-rows-2 grid-flow-col gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:grid-rows-none sm:grid-flow-row sm:grid-cols-3 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
                    
                    {gurus.length === 0 && (
                        <p className="col-span-full text-center text-xs sm:text-base text-slate-500">
                            Belum ada data guru.
                        </p>
                    )}

                    {gurus.map((t) => (
                        <div
                            key={t.id}
                            className="w-[85px] sm:w-auto group bg-white dark:bg-slate-900 rounded-lg sm:rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col reveal snap-start"
                        >
                            {/* Foto */}
                            <div className="aspect-[3/4] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                                
                                {/* ====== PERUBAHAN DI SINI ====== */}
                                {/* Menggunakan logika yang sama persis dengan GuruIndex */}
                                {t.foto_url ? (
    <img
        src={t.foto_url}
        alt={t.nama}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        onError={(e) => {
            // Jika gambar gagal dimuat (404), ganti dengan ikon user
            e.target.onerror = null;
            e.target.style.display = 'none';
            // Memunculkan div fallback di belakangnya
            e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-400"><i class="ph ph-user text-lg sm:text-5xl"></i></div>';
        }}
    />
) : (
    <div className="w-full h-full flex items-center justify-center text-slate-400">
        <i className="ph ph-user text-lg sm:text-5xl"></i>
    </div>
)}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            {/* Body Text */}
                            <div className="p-1.5 sm:p-4 text-center flex flex-col flex-grow">
                                <h3 className="font-display font-bold text-[9px] sm:text-base text-slate-900 dark:text-white leading-tight line-clamp-2">
                                    {t.nama}
                                </h3>
                                
                                {t.jabatan && (
                                    <p className="text-[7px] sm:text-xs text-primary-600 dark:text-accent-400 mt-0.5 line-clamp-1">
                                        {t.jabatan}
                                    </p>
                                )}
                                
                                {t.mapel && (
                                    <p className="text-[6px] sm:text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                        {t.mapel}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Teks bantuan geser (opsional, hanya muncul di HP) */}
                <p className="text-center text-[9px] text-slate-400 mt-2 sm:hidden">
                    ← Geser untuk melihat lainnya →
                </p>

            </div>
        </section>
    );
}