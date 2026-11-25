import { Link } from '@inertiajs/react';
import useReveal from '@/hooks/useReveal';
import { ArrowRight, BookOpen, User, GraduationCap } from '@phosphor-icons/react';

export default function Mading({ madings = [] }) {
    const titleRef = useReveal();

    // Jika belum ada karya yang di-approve, jangan tampilkan section ini
    if (madings.length === 0) return null;

    return (
        // Section background dibuat slate-50 / slate-950 agar kontras dengan section sebelumnya
        <section id="mading" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12" ref={titleRef}>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                            Mading Murid
                        </h2>
                        <div className="w-24 h-1 bg-accent-500 mt-4 rounded-full"></div>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                            Apresiasi karya dan kreativitas terbaru dari murid-murid kami.
                        </p>
                    </div>
                    <Link
                        href="/galeri-murid"
                        className="mt-4 md:mt-0 inline-flex items-center text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 dark:hover:text-accent-300 transition-colors group"
                    >
                        Lihat Semua Karya
                        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {madings.map((item, index) => (
                        <div 
                            key={item.id} 
                            // Card dibuat putih (light) dan slate-900 (dark) dengan border tipis
                            className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 flex flex-col reveal"
                        >
                            {/* Gambar / Placeholder */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                                {item.gambar_url ? (
                                    <img 
                                        src={item.gambar_url} 
                                        alt={item.judul} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                                        <BookOpen size={48} weight="duotone" />
                                    </div>
                                )}
                                <span className="absolute top-3 left-3 bg-accent-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                                    {item.kategori}
                                </span>
                            </div>

                            {/* Konten */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2 mb-3">
                                    {item.judul}
                                </h3>
                                
                                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-4">
                                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                                        <User size={14} className="text-primary-500 dark:text-accent-400" /> {item.nama_murid}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                                        <GraduationCap size={14} className="text-primary-500 dark:text-accent-400" /> {item.kelas}
                                    </span>
                                </div>

                                {item.konten && (
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 italic font-serif mt-auto border-l-2 border-slate-200 dark:border-slate-700 pl-3">
                                        "{item.konten}"
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}