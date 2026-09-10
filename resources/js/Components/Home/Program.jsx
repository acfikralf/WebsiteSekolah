import useReveal from '@/hooks/useReveal';
import { BookOpenText, Tent, MusicNotes, SoccerBall } from '@phosphor-icons/react';

export default function Program() {
    const titleRef = useReveal();

    const programs = [
        { icon: BookOpenText, title: 'Tahfidz Al-Qur\'an', desc: 'Program hafalan Al-Qur\'an dengan metode yang menyenangkan.' },
        { icon: Tent, title: 'Pramuka', desc: 'Melatih kepemimpinan, kedisiplinan, dan kemandirian.' },
        { icon: MusicNotes, title: 'Hadrah', desc: 'Seni musik islami untuk mengembangkan kreativitas.' },
        { icon: SoccerBall, title: 'Futsal', desc: 'Olahraga untuk kesehatan dan sportivitas.' },
    ];

    return (
        <section id="ekstrakurikuler" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Program Unggulan</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Berbagai program untuk mengembangkan bakat dan karakter siswa</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {programs.map((prog, index) => (
                        <div key={index} className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 reveal">
                            <div className="w-14 h-14 bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-accent-400 transition-colors">
                                <prog.icon size={32} />
                            </div>
                            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">{prog.title}</h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{prog.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}