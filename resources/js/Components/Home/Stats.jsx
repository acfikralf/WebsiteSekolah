import useReveal from '@/hooks/useReveal';
import Counter from '@/Components/Counter';
import { GraduationCap, UsersThree, Trophy, CalendarCheck } from '@phosphor-icons/react';

export default function Stats() {
    const revealRef = useReveal();

    return (
        <section className="py-16 md:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={revealRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Dalam Angka</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Capaian dan potensi SMP Islam Watestanjung</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 reveal">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 mb-4">
                            <GraduationCap size={28} />
                        </div>
                        <div className="text-3xl font-display font-bold text-slate-900 dark:text-white"><Counter target={450} /></div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">Siswa Aktif</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 reveal">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 mb-4">
                            <UsersThree size={28} />
                        </div>
                        <div className="text-3xl font-display font-bold text-slate-900 dark:text-white"><Counter target={32} /></div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">Guru</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 reveal">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 mb-4">
                            <Trophy size={28} />
                        </div>
                        <div className="text-3xl font-display font-bold text-slate-900 dark:text-white"><Counter target={57} /></div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">Prestasi</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 reveal">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 mb-4">
                            <CalendarCheck size={28} />
                        </div>
                        <div className="text-3xl font-display font-bold text-slate-900 dark:text-white"><Counter target={12} /></div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ekstrakurikuler</div>
                    </div>
                </div>
            </div>
        </section>
    );
}