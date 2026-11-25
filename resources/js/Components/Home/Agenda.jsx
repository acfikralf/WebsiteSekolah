import useReveal from '@/hooks/useReveal';
import { Clock, MapPin, ArrowRight } from '@phosphor-icons/react';
import { usePage } from '@inertiajs/react';

export default function Agenda() {
    const titleRef = useReveal();
    const { agendas } = usePage().props;

    return (
        <section id="agenda" className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950 islamic-pattern">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12" ref={titleRef}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Agenda Terdekat
                    </h2>
                    <div className="w-16 sm:w-24 h-1 bg-accent-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
                    <p className="mt-3 sm:mt-4 text-xs sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Jadwal kegiatan sekolah
                    </p>
                </div>

                {/* Grid 2 Kolom di HP, 2 Kolom di Desktop */}
                <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto">
                    {agendas.length === 0 && (
                        <p className="col-span-2 text-center text-xs sm:text-base text-slate-500">Belum ada agenda.</p>
                    )}
                    
                    {agendas.map((item) => {
                        const d = new Date(item.tanggal);
                        return (
                            <div 
                                key={item.id} 
                                /* flex-row: Tanggal dan Teks sejajar ke samping */
                                className="flex flex-row items-start gap-2 sm:gap-4 p-2.5 sm:p-5 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal"
                            >
                                {/* Kotak Tanggal - Diperkecil di HP */}
                                <div className="flex-shrink-0 w-9 h-9 sm:w-14 sm:h-14 bg-primary-100 dark:bg-slate-800 rounded-md sm:rounded-xl flex flex-col items-center justify-center text-primary-700 dark:text-accent-400 mt-0.5 sm:mt-0">
                                    <span className="text-[11px] sm:text-lg font-bold leading-none">
                                        {String(d.getDate()).padStart(2, '0')}
                                    </span>
                                    <span className="text-[8px] sm:text-xs uppercase font-medium mt-0.5">
                                        {d.toLocaleString('id-ID', { month: 'short' })}
                                    </span>
                                </div>
                                
                                {/* Detail Agenda */}
                                <div className="flex-grow min-w-0">
                                    <h3 className="font-semibold text-[10px] sm:text-base text-slate-900 dark:text-white leading-tight line-clamp-2">
                                        {item.judul}
                                    </h3>
                                    <div className="mt-1 text-[8px] sm:text-sm text-slate-500 dark:text-slate-400 space-y-0.5">
                                        {item.waktu && (
                                            <p className="flex items-center">
                                                <Clock className="w-2.5 h-2.5 sm:w-4 sm:h-4 mr-0.5 sm:mr-1 shrink-0" /> 
                                                <span className="truncate">{item.waktu}</span>
                                            </p>
                                        )}
                                        {item.lokasi && (
                                            <p className="flex items-center">
                                                <MapPin className="w-2.5 h-2.5 sm:w-4 sm:h-4 mr-0.5 sm:mr-1 shrink-0" /> 
                                                <span className="truncate">{item.lokasi}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center mt-6 sm:mt-10 reveal">
                    <a href="/agenda" className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white text-[10px] sm:text-base font-medium rounded-md sm:rounded-xl shadow-lg shadow-primary-600/20 transition-all active:scale-95 sm:hover:-translate-y-0.5">
                        Lihat Semua Agenda
                        <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}