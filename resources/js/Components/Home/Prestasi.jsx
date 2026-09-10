import useReveal from '@/hooks/useReveal';
import { Medal, MusicNotes, SoccerBall, ArrowRight } from '@phosphor-icons/react';

export default function Prestasi() {
    const titleRef = useReveal();
    const prestasi = [
        { icon: Medal, category: 'Akademik', title: 'Juara 1 Olimpiade Matematika', student: 'Ahmad Rizki', level: 'Tingkat Kabupaten' },
        { icon: MusicNotes, category: 'Seni', title: 'Juara 2 Lomba Hadrah', student: 'Tim Hadrah Al-Falah', level: 'Tingkat Provinsi' },
        { icon: SoccerBall, category: 'Olahraga', title: 'Juara 3 Futsal', student: 'Tim Futsal SMP Islam', level: 'Tingkat Kabupaten' },
    ];

    return (
        <section id="prestasi" className="py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Prestasi Terbaru</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Raihan gemilang siswa kami</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prestasi.map((item, idx) => (
                        <div key={idx} className="group bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 reveal">
                            <div className="flex items-center justify-between mb-3">
                                <item.icon size={32} className="text-accent-500" />
                                <span className="bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 text-xs font-medium px-3 py-1 rounded-full">{item.category}</span>
                            </div>
                            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">{item.title}</h3>
                            <p className="mt-1 text-sm text-primary-600 dark:text-accent-400">{item.student}</p>
                            <p className="mt-2 text-slate-600 dark:text-slate-300">{item.level}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10 reveal">
                    <a href="#" className="inline-flex items-center text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 group">
                        Lihat Semua Prestasi
                        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
}