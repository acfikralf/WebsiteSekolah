import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import useReveal from '@/hooks/useReveal';
import { CalendarDots, ArrowRight, Newspaper } from '@phosphor-icons/react';

export default function BeritaIndex({ beritas = [] }) {
    const titleRef = useReveal();

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
                            <Newspaper size={16} /> Berita & Informasi
                        </p>
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                            Kabar Terbaru<br />
                            <span className="text-yellow-300">
                                Sekolah Kami
                            </span>
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl">
                            Ikuti perkembangan terbaru seputar kegiatan dan prestasi SMP Islam Watestanjung.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== BODY WRAPPER ===== */}
            <div className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {beritas.length === 0 ? (
                        <div className="text-center py-20 text-slate-500">
                            <Newspaper className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-xs sm:text-lg">Belum ada berita yang dipublikasikan.</p>
                        </div>
                    ) : (
                        /* Grid 3 kolom di HP */
                        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 md:gap-8">
                            {beritas.map((item) => (
                                <article key={item.id} className="group bg-white dark:bg-slate-900 rounded-lg sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col reveal">
                                    
                                    {/* Gambar - Tinggi dipangkas di HP */}
                                    <div className="relative overflow-hidden">
                                        {item.gambar_url ? (
                                            <img src={item.gambar_url} alt={item.judul} className="w-full h-20 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                        ) : (
                                            <div className="w-full h-20 sm:h-52 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                                <Newspaper className="w-6 h-6 sm:w-12 sm:h-12" />
                                            </div>
                                        )}
                                        {/* Badge Kategori - Dikecilkan */}
                                        <span className="absolute top-1.5 left-1.5 sm:top-4 sm:left-4 bg-accent-500 text-white text-[7px] sm:text-xs font-medium px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                                            {item.kategori}
                                        </span>
                                    </div>

                                    {/* Body Teks */}
                                    <div className="p-2 sm:p-6 flex flex-col flex-grow">
                                        {/* Tanggal - Dikecilkan */}
                                        <div className="flex items-center text-[7px] sm:text-sm text-slate-500 dark:text-slate-400 mb-1 sm:mb-3">
                                            <CalendarDots className="w-2.5 h-2.5 sm:w-4 sm:h-4 mr-1 shrink-0" />
                                            <time className="truncate">
                                                {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: '2-digit' })}
                                            </time>
                                        </div>

                                        {/* Judul - Lebih tegas di HP */}
                                        <h2 className="text-[10px] sm:text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2 mb-1 sm:mb-3 leading-snug">
                                            {item.judul}
                                        </h2>

                                        {/* Ringkasan - Kecil dan dibatasi 2 baris di HP */}
                                        <p className="text-[8px] sm:text-base text-slate-500 dark:text-slate-400 line-clamp-2 flex-grow mb-2 sm:mb-4 leading-tight">
                                            {item.ringkasan || 'Tidak ada ringkasan.'}
                                        </p>

                                        {/* Tombol Baca - Disembunyikan di HP agar hemat tempat */}
                                        <Link href="#" className="hidden sm:inline-flex items-center text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 group/link mt-auto">
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