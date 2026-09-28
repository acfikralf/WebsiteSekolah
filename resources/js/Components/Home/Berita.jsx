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
        <section id="berita" className="py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Berita Terbaru</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Informasi dan kegiatan terkini sekolah</p>
                </div>

                {beritas?.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {beritas.map((item) => (
                            <article key={item.id} className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col reveal">
                                <div className="relative overflow-hidden">
                                    {item.gambar_url ? (
                                        <img
                                            src={item.gambar_url}
                                            alt={item.judul}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                                            <i className="ph ph-image text-4xl"></i>
                                        </div>
                                    )}
                                    <span className={`absolute top-3 left-3 ${BADGE_COLORS[item.kategori] || 'bg-primary-500'} text-white text-xs font-medium px-3 py-1 rounded-full shadow`}>
                                        {item.kategori}
                                    </span>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
                                        <CalendarDots size={16} className="mr-1" />
                                        <time>{new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                                    </div>
                                    <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors">
                                        {item.judul}
                                    </h3>
                                    <p className="mt-2 text-slate-600 dark:text-slate-300 line-clamp-3 flex-grow">
                                        {item.ringkasan}
                                    </p>
                                    <a href="#" className="mt-4 inline-flex items-center text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 group/link">
                                        Baca Selengkapnya
                                        <ArrowRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-500">Belum ada berita.</p>
                )}

                <div className="text-center mt-10 reveal">
                    <a href="#" className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-600/20 hover:shadow-primary-700/30 transition-all hover:-translate-y-0.5">
                        Lihat Semua Berita
                        <ArrowRight size={20} className="ml-2" />
                    </a>
                </div>
            </div>
        </section>
    );
}