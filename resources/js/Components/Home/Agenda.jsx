import useReveal from '@/hooks/useReveal';
import { Clock, MapPin, ArrowRight } from '@phosphor-icons/react';

export default function Agenda() {
    const titleRef = useReveal();
    const agendas = [
        { day: '20', month: 'Sep', title: 'Rapat Orang Tua Siswa', time: '08:00 - 10:00', place: 'Aula Sekolah' },
        { day: '25', month: 'Sep', title: 'Lomba Tahfidz Internal', time: '09:00 - 12:00', place: 'Masjid Sekolah' },
        { day: '02', month: 'Okt', title: 'Upacara Hari Kesaktian Pancasila', time: '07:00 - 08:00', place: 'Lapangan Upacara' },
        { day: '10', month: 'Okt', title: 'Peringatan Maulid Nabi', time: '08:00 - 11:00', place: 'Aula Sekolah' },
    ];

    return (
        <section id="agenda" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 islamic-pattern">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Agenda Terdekat</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Jadwal kegiatan sekolah</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {agendas.map((agenda, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal">
                            <div className="flex-shrink-0 w-14 h-14 bg-primary-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center text-primary-700 dark:text-accent-400">
                                <span className="text-lg font-bold leading-none">{agenda.day}</span>
                                <span className="text-xs uppercase">{agenda.month}</span>
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-semibold text-slate-900 dark:text-white">{agenda.title}</h3>
                                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400 space-y-1">
                                    <p className="flex items-center"><Clock size={16} className="mr-1" /> {agenda.time}</p>
                                    <p className="flex items-center"><MapPin size={16} className="mr-1" /> {agenda.place}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10 reveal">
                    <a href="#" className="inline-flex items-center text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 group">
                        Lihat Semua Agenda
                        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
}