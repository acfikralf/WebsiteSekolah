import { usePage } from '@inertiajs/react';
import useReveal from '@/hooks/useReveal';
import { CalendarDots, ArrowRight } from '@phosphor-icons/react';

const BADGE_COLORS = {
    Kegiatan: 'bg-accent-500',
    Prestasi: 'bg-secondary-500',
    Ekstrakurikuler: 'bg-primary-500',
    Pengumuman: 'bg-slate-500',
};

export default function Berita() {
    const titleRef = useReveal();
    const { beritas } = usePage().props;

    return (
        <section id="berita" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-6 sm:mb-12" ref={titleRef}>
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Berita Terbaru
                    </h2>
                    <div className="w-12 sm:w-24 h-1 bg-accent-500 mx-auto mt-2 sm:mt-4 rounded-full"></div>
                    <p className="mt-2 sm:mt-4 text-[10px] sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Informasi dan kegiatan terkini sekolah
                    </p>
                </div>

                {beritas?.length > 0 ? (
                    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 md:gap-8">
                        {beritas.map((item) => (
                            <article key={item.id} className="group bg-slate-50 dark:bg-slate-800 rounded-lg sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col reveal">
                                
                                <div className="relative overflow-hidden">
                                    {item.gambar_url ? (
                                        <img
                                            src={item.gambar_url}
                                            alt={item.judul}
                                            className="w-full h-20 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-20 sm:h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                                            <i className="ph ph-image text-xl sm:text-4xl"></i>
                                        </div>
                                    )}
                                    <span className={`absolute top-1.5 left-1.5 sm:top-3 sm:left-3 ${BADGE_COLORS[item.kategori] || 'bg-primary-500'} text-white text-[7px] sm:text-xs font-medium px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow`}>
                                        {item.kategori}
                                    </span>
                                </div>

                                <div className="p-2 sm:p-6 flex flex-col flex-grow">
                                    {/* Tanggal */}
                                    <div className="flex items-center text-[7px] sm:text-sm text-slate-500 dark:text-slate-400 mb-1 sm:mb-2">
                                        <CalendarDots className="w-2.5 h-2.5 sm:w-4 sm:h-4 mr-1 shrink-0" />
                                        <time className="truncate">
                                            {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: '2-digit' })}
                                        </time>
                                    </div>

                                    {/* Judul dibesarkan sedikit di HP (text-[11px]) */}
                                    <h3 className="text-[11px] sm:text-xl font-display font-bold sm:font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors leading-snug line-clamp-2 mb-1 sm:mb-2">
                                        {item.judul}
                                    </h3>

                                    {/* Teks di bawahnya dikecilin (text-[8px]) dan dibatasi 2 baris */}
                                    <p className="text-[8px] sm:text-base text-slate-500 dark:text-slate-400 line-clamp-2 sm:line-clamp-none flex-grow leading-tight">
                                        {item.ringkasan || item.konten}
                                    </p>

                                    {/* Tombol Baca disembunyikan di HP */}
                                    <a href="#" className="hidden sm:inline-flex mt-4 items-center text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 group/link">
                                        Baca Selengkapnya
                                        <ArrowRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xs sm:text-base text-slate-500">Belum ada berita.</p>
                )}

                {/* Tombol Lihat Semua Berita */}
                <div className="text-center mt-6 sm:mt-10 reveal">
                    <a href="#" className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white text-[10px] sm:text-base font-medium rounded-md sm:rounded-xl shadow-lg shadow-primary-600/20 transition-all active:scale-95 sm:hover:-translate-y-0.5">
                        Lihat Semua Berita
                        <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}