import MainLayout from '@/Layouts/MainLayout';
import { Calendar, Clock, MapPin, ListChecks } from '@phosphor-icons/react';

export default function AgendaIndex({ agendas = [] }) {
    return (
        <MainLayout>
            {/* Hero Header */}
            <div className="bg-primary-700 dark:bg-primary-900 text-white py-16 relative overflow-hidden islamic-pattern">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Agenda Sekolah</h1>
                    <p className="text-lg text-primary-100 max-w-2xl">
                        Jadwal kegiatan, ujian, dan acara penting lainnya di SMP Islam Watestanjung.
                    </p>
                </div>
            </div>

            {/* List Agenda */}
            <div className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {agendas.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <Calendar size={64} className="mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Belum ada agenda terdekat.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {agendas.map((item) => {
                                const d = new Date(item.tanggal);
                                const day = String(d.getDate()).padStart(2, '0');
                                const month = d.toLocaleString('id-ID', { month: 'short' });
                                const year = d.getFullYear();

                                return (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                                        
                                        {/* Date Box */}
                                        <div className="flex-shrink-0 w-20 h-20 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex flex-col items-center justify-center text-primary-700 dark:text-accent-400 border border-primary-100 dark:border-primary-800">
                                            <span className="text-2xl font-bold leading-none">{day}</span>
                                            <span className="text-sm uppercase font-medium mt-1">{month}</span>
                                            <span className="text-[10px] opacity-70">{year}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                                                {item.judul}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                                                {item.waktu && (
                                                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                                                        <Clock size={16} className="text-primary-500" /> {item.waktu}
                                                    </span>
                                                )}
                                                {item.lokasi && (
                                                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                                                        <MapPin size={16} className="text-primary-500" /> {item.lokasi}
                                                    </span>
                                                )}
                                            </div>
                                            {item.deskripsi && (
                                                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
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