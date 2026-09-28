import useReveal from '@/hooks/useReveal';
import { Clock, MapPin, ArrowRight } from '@phosphor-icons/react';
import {usePage} from '@inertiajs/react'

export default function Agenda() {
    const titleRef = useReveal();
    const {agendas} = usePage().props;
    return (
        <section id="agenda" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 islamic-pattern">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Agenda Terdekat</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Jadwal kegiatan sekolah</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {agendas.length === 0 && (
                        <p className="col-span-2 text-center text-slate-500">Belum ada agenda.</p>
                    )}
                    {agendas.map((item) => {
                        const d = new Date(item.tanggal);
                        return (
                            <div key={item.id} className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal">
                                <div className="flex-shrink-0 w-14 h-14 bg-primary-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center text-primary-700 dark:text-accent-400">
                                    <span className="text-lg font-bold leading-none">{String(d.getDate()).padStart(2, '0')}</span>
                                    <span className="text-xs uppercase">{d.toLocaleString('id-ID', { month: 'short' })}</span>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-slate-900 dark:text-white">{item.judul}</h3>
                                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400 space-y-1">
                                        {item.waktu && <p className="flex items-center"><Clock size={16} className="mr-1" /> {item.waktu}</p>}
                                        {item.lokasi && <p className="flex items-center"><MapPin size={16} className="mr-1" /> {item.lokasi}</p>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}