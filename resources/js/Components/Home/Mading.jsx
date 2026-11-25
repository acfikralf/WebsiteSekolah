import { Link } from '@inertiajs/react';
import useReveal from '@/hooks/useReveal';
import { ArrowRight, BookOpen, User, GraduationCap } from '@phosphor-icons/react';

export default function Mading({ madings = [] }) {
    const titleRef = useReveal();

    if (madings.length === 0) return null;

    return (
        <section id="mading" className="relative bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 text-white overflow-hidden py-16 md:py-24">
            {/* Ornamen Lingkaran */}
            <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section (Gaya HERO) */}
                <div className="text-center mb-12" ref={titleRef}>
                    <p className="inline-flex items-center gap-2 text-yellow-300 font-medium uppercase tracking-wider mb-4 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                        <BookOpen size={16} /> Mading Murid
                    </p>
                    <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                        Karya & Kreativitas<br />
                        <span className="text-yellow-300">Murid Kami</span>
                    </h2>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto">
                        Apresiasi karya dan kreativitas terbaru dari murid-murid kami.
                    </p>
                </div>

                {/* Grid Kartu (Tetap seperti sebelumnya) */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {madings.map((item) => (
                        <div 
                            key={item.id} 
                            className="group bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 flex flex-col reveal"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                                {item.gambar_url ? (
                                    <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                                        <BookOpen size={32} className="sm:w-12 sm:h-12" weight="duotone" />
                                    </div>
                                )}
                                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-accent-500 text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md uppercase tracking-wider shadow-md">
                                    {item.kategori}
                                </span>
                            </div>

                            <div className="p-3 sm:p-5 flex flex-col flex-grow">
                                <h3 className="font-display font-bold text-xs sm:text-lg text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2 mb-2 sm:mb-3 leading-snug">
                                    {item.judul}
                                </h3>
                                
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[9px] sm:text-xs text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
                                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                                        <User size={12} className="sm:w-3.5 sm:h-3.5 text-primary-500 dark:text-accent-400" /> {item.nama_murid}
                                    </span>
                                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                                        <GraduationCap size={12} className="sm:w-3.5 sm:h-3.5 text-primary-500 dark:text-accent-400" /> {item.kelas}
                                    </span>
                                </div>

                                {item.konten && (
                                    <p className="text-[10px] sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 italic font-serif mt-auto border-l-2 border-slate-200 dark:border-slate-700 pl-2 sm:pl-3">
                                        "{item.konten}"
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tombol Lihat Semua Karya */}
                <div className="mt-10 text-center">
                    <Link
                        href="/galeri-murid"
                        className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-emerald-950 font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        Lihat Semua Karya
                        <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>

            </div>
        </section>
    );
}