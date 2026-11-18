import MainLayout from '@/Layouts/MainLayout';
import useReveal from '@/hooks/useReveal';

export default function GuruIndex({ gurus = [] }) {
    const revealRef = useReveal();
    console.log('Guru data:', gurus);

    return (
        <MainLayout>
            {/* ===== HERO — gradient hijau ke kuning (disamakan dengan Profil) ===== */}
            <section className="relative bg-gradient-to-r from-emerald-900 via-emerald-700 to-yellow-500 text-white overflow-hidden">
                <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 text-yellow-300 font-medium uppercase tracking-wider mb-4 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                            <i className="ph ph-users"></i> Tenaga Pendidik
                        </p>
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                            Guru Profesional &<br />
                            <span className="text-yellow-300">
                                Berdedikasi
                            </span>
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl">
                            Guru-guru profesional dan berdedikasi di SMP Islam Watestanjung.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== BODY WRAPPER ===== */}
            <div className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]" ref={revealRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-4 gap-2 sm:gap-6">
                        {gurus.map((t) => (
                            <div key={t.id} className="group bg-white dark:bg-slate-900 rounded-lg sm:rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 reveal">
                                <div className="aspect-[3/4] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                                    {/* PERBAIKAN DI SINI: Cek foto_url, lalu foto, lalu tambahkan /storage/ jika perlu */}
                                    {t.foto_url || t.foto ? (
                                        <img 
                                            src={t.foto_url ? t.foto_url : `/storage/${t.foto}`} 
                                            alt={t.nama} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            loading="lazy" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <i className="ph ph-user text-lg sm:text-5xl"></i>
                                        </div>
                                    )}
                                </div>
                                <div className="p-1.5 sm:p-5 text-center flex flex-col flex-grow">
                                    <h3 className="font-display font-bold sm:font-semibold text-[9px] sm:text-lg text-slate-900 dark:text-white leading-tight line-clamp-2">
                                        {t.nama}
                                    </h3>
                                    <p className="text-[7px] sm:text-sm text-primary-600 dark:text-accent-400 mt-0.5 sm:mt-1 line-clamp-1">
                                        {t.jabatan}
                                    </p>
                                    <p className="text-[6px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                        {t.mapel}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {gurus.length === 0 && <p className="col-span-full text-center text-slate-500">Belum ada data guru.</p>}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}