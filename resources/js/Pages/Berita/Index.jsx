import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import useReveal from '@/hooks/useReveal';
import { CalendarDots, ArrowRight, Newspaper } from '@phosphor-icons/react';

export default function BeritaIndex({ beritas = [] }) {
    const titleRef = useReveal();

    return (
        <MainLayout>
            {/* Hero Header */}
            <div className="bg-primary-700 dark:bg-primary-900 text-white py-16 relative overflow-hidden islamic-pattern">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Berita & Informasi</h1>
                    <p className="text-lg text-primary-100 max-w-2xl">
                        Ikuti perkembangan terbaru seputar kegiatan dan prestasi SMP Islam Watestanjung.
                    </p>
                </div>
            </div>

            {/* List Berita */}
            <div className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {beritas.length === 0 ? (
                        <div className="text-center py-20 text-slate-500">
                            <Newspaper size={64} className="mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Belum ada berita yang dipublikasikan.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {beritas.map((item) => (
                                <article key={item.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col reveal">
                                    <div className="relative overflow-hidden">
                                        {item.gambar_url ? (
                                            <img src={item.gambar_url} alt={item.judul} className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                        ) : (
                                            <div className="w-full h-52 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                                <Newspaper size={48} />
                                            </div>
                                        )}
                                        <span className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                                            {item.kategori}
                                        </span>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                                            <CalendarDots size={16} className="mr-1.5" />
                                            <time>{new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                                        </div>
                                        <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2 mb-3">
                                            {item.judul}
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-300 line-clamp-3 flex-grow mb-4">
                                            {item.ringkasan || 'Tidak ada ringkasan.'}
                                        </p>
                                        {/* Nanti kita buat route /berita/{id} untuk detailnya */}
                                        <Link href="#" className="inline-flex items-center text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 group/link mt-auto">
                                            Baca Selengkapnya
                                            <ArrowRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}