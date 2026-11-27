import { usePage } from '@inertiajs/react';
import useReveal from '@/hooks/useReveal';

export default function Program() {
    const titleRef = useReveal();
    const { ekstrakurikulers } = usePage().props;

    return (
        <section id="ekstrakurikuler" className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12" ref={titleRef}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Program Unggulan
                    </h2>
                    <div className="w-16 sm:w-24 h-1 bg-accent-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
                    <p className="mt-3 sm:mt-4 text-[11px] sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Berbagai program untuk mengembangkan bakat dan karakter siswa
                    </p>
                </div>

                {ekstrakurikulers?.length > 0 ? (
                    /* Grid 3 kolom di HP, 4 kolom di Desktop */
                    <div className="grid grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-6">
                        {ekstrakurikulers.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 reveal flex flex-col h-full"
                            >
                                {/* Ikon */}
                                <div className="w-8 h-8 sm:w-14 sm:h-14 bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-md sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-accent-400 transition-colors shrink-0">
                                    <i className={`ph ${item.icon || 'ph-tent'} text-base sm:text-3xl`}></i>
                                </div>
                                
                                {/* Judul Program */}
                                <h3 className="font-display font-semibold text-[11px] sm:text-lg text-slate-900 dark:text-white leading-snug">
                                    {item.nama}
                                </h3>
                                
                                {/* Deskripsi */}
                                <p className="mt-1 sm:mt-2 text-[9px] sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 sm:line-clamp-none mt-auto">
                                    {item.deskripsi}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-sm text-slate-500">Belum ada program unggulan.</p>
                )}
            </div>
        </section>
    );
}