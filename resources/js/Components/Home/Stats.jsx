import { usePage } from "@inertiajs/react";
import useReveal from "@/hooks/useReveal";
import Counter from "@/Components/Counter";
import {
    GraduationCap,
    UsersThree,
    Trophy,
    CalendarCheck,
} from "@phosphor-icons/react";

export default function Stats() {
    const revealRef = useReveal();
    const { stats } = usePage().props;

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Judul Section - Ukuran teks disesuaikan di HP */}
                <div className="text-center mb-8 sm:mb-12" ref={revealRef}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Dalam Angka
                    </h2>
                    <div className="w-16 sm:w-24 h-1 bg-accent-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
                    <p className="mt-3 sm:mt-4 text-xs sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Capaian dan potensi SMP Islam Watestanjung
                    </p>
                </div>

                {/* Grid - Tetap 2 kolom, jarak dirapatkan */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                    
                    {/* Kartu Siswa */}
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 reveal flex flex-col items-center justify-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 mb-2 sm:mb-4">
                            <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <div className="text-xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                            <Counter target={stats?.siswa || 450} />
                        </div>
                        <div className="mt-1 text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase sm:normal-case tracking-wide">
                            Siswa Aktif
                        </div>
                    </div>

                    {/* Kartu Guru */}
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 reveal flex flex-col items-center justify-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 mb-2 sm:mb-4">
                            <UsersThree className="w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <div className="text-xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                            <Counter target={stats?.guru || 32} />
                        </div>
                        <div className="mt-1 text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase sm:normal-case tracking-wide">
                            Guru
                        </div>
                    </div>

                    {/* Kartu Prestasi */}
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 reveal flex flex-col items-center justify-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 mb-2 sm:mb-4">
                            <Trophy className="w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <div className="text-xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                            <Counter target={stats?.prestasi || 57} />
                        </div>
                        <div className="mt-1 text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase sm:normal-case tracking-wide">
                            Prestasi
                        </div>
                    </div>

                    {/* Kartu Ekstrakurikuler */}
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 reveal flex flex-col items-center justify-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 mb-2 sm:mb-4">
                            <CalendarCheck className="w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <div className="text-xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                            <Counter target={stats?.ekstrakurikuler || 12} />
                        </div>
                        <div className="mt-1 text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase sm:normal-case tracking-wide">
                            Ekstrakurikuler
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}