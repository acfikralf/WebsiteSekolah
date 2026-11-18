import MainLayout from '@/Layouts/MainLayout';
import { Calendar, Clock, MapPin, ListChecks } from '@phosphor-icons/react';

export default function AgendaIndex({ agendas = [] }) {
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
                            <Calendar size={16} /> Agenda Sekolah
                        </p>
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                            Jadwal & Acara<br />
                            <span className="text-yellow-300">
                                Penting
                            </span>
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl">
                            Jadwal kegiatan, ujian, dan acara penting lainnya di SMP Islam Watestanjung.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== BODY WRAPPER ===== */}
            <div className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {agendas.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800">
                            <Calendar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-xs sm:text-lg">Belum ada agenda terdekat.</p>
                        </div>
                    ) : (
                        /* Grid 2 kolom di HP, 1 kolom di Desktop */
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4">
                            {agendas.map((item) => {
                                const d = new Date(item.tanggal);
                                const day = String(d.getDate()).padStart(2, '0');
                                const month = d.toLocaleString('id-ID', { month: 'short' });
                                const year = d.getFullYear();

                                return (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-5 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                                        
                                        {/* Date Box - Diperkecil di HP */}
                                        <div className="flex-shrink-0 w-12 h-12 sm:w-20 sm:h-20 bg-primary-50 dark:bg-primary-900/30 rounded-lg sm:rounded-xl flex flex-col items-center justify-center text-primary-700 dark:text-accent-400 border border-primary-100 dark:border-primary-800">
                                            <span className="text-sm sm:text-2xl font-bold leading-none">{day}</span>
                                            <span className="text-[9px] sm:text-sm uppercase font-medium mt-0.5 sm:mt-1">{month}</span>
                                            <span className="text-[7px] sm:text-[10px] opacity-70">{year}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow min-w-0">
                                            <h3 className="text-[11px] sm:text-xl font-display font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 leading-snug line-clamp-2">
                                                {item.judul}
                                            </h3>
                                            <div className="flex flex-col sm:flex-row flex-wrap gap-1.5 sm:gap-4 text-[9px] sm:text-sm text-slate-600 dark:text-slate-400">
                                                {item.waktu && (
                                                    <span className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 dark:bg-slate-800 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md w-max">
                                                        <Clock className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-primary-500 shrink-0" /> 
                                                        <span className="truncate">{item.waktu}</span>
                                                    </span>
                                                )}
                                                {item.lokasi && (
                                                    <span className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 dark:bg-slate-800 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md w-max">
                                                        <MapPin className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-primary-500 shrink-0" /> 
                                                        <span className="truncate">{item.lokasi}</span>
                                                    </span>
                                                )}
                                            </div>
                                            {item.deskripsi && (
                                                <p className="mt-1.5 sm:mt-3 text-[8px] sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-tight">
                                                    {item.deskripsi}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}