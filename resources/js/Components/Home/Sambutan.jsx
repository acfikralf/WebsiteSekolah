import useReveal from '@/hooks/useReveal';
import { ArrowRight } from '@phosphor-icons/react';

export default function Sambutan({ kepalaSekolah }) {
    const leftRef = useReveal();
    const rightRef = useReveal();

    const fotoUrl = kepalaSekolah?.foto
        ? `/storage/${kepalaSekolah.foto}`
        : '/image/kepala-sekolah.png';

    return (
        <section id="profil" className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950 islamic-pattern">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 
                  Di HP: Grid 2 kolom (kiri foto 120px, kanan teks sisa lebar).
                  Di Desktop: Grid 2 kolom sama besar (md:grid-cols-2).
                */}
                <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[180px_1fr] md:grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-start md:items-center">

                    {/* FOTO KEPALA SEKOLAH */}
                    <div className="relative mt-1 md:mt-0" ref={leftRef}>
                        {/* Efek blur */}
                        <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-30"></div>

                        <img
                            src={fotoUrl}
                            alt={kepalaSekolah?.nama || 'Kepala Sekolah'}
                            className="relative w-full rounded-xl sm:rounded-3xl shadow-lg sm:shadow-xl object-cover aspect-[3/4]"
                        />
                    </div>

                    {/* TEKS SAMBUTAN */}
                    <div ref={rightRef}>
                        {/* Judul: Rata kiri karena sudah di samping foto */}
                        <div className="mb-2 sm:mb-6 text-left">
                            <p className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-1">
                                Sambutan
                            </p>

                            <h2 className="text-lg sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                                Kepala Sekolah
                            </h2>

                            <div className="w-10 sm:w-16 h-1 bg-primary-600 dark:bg-accent-400 mt-2 sm:mt-4 rounded-full"></div>
                        </div>

                        {/* Teks sambutan */}
                        <div className="prose prose-sm sm:prose-base prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-justify md:text-left">
                            <p className="whitespace-pre-line leading-relaxed text-[11px] sm:text-base">
                                {kepalaSekolah?.sambutan}
                            </p>
                        </div>

                        {/* Nama & Jabatan */}
                        <div className="mt-3 sm:mt-6 text-left">
                            <p className="font-display font-semibold text-xs sm:text-lg text-slate-900 dark:text-white">
                                {kepalaSekolah?.nama}
                            </p>

                            <p className="text-[10px] sm:text-sm text-slate-500 dark:text-slate-400">
                                Kepala SMP Islam Watestanjung
                            </p>
                        </div>

                        {/* Tombol Baca Selengkapnya */}
                        <div className="text-left mt-3 sm:mt-6">
                            <a
                                href="/profil"
                                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-0 sm:py-0 bg-primary-50 sm:bg-transparent dark:bg-slate-800 sm:dark:bg-transparent rounded-md sm:rounded-none text-[11px] sm:text-base text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 group transition-colors w-full sm:w-auto"
                            >
                                Baca Selengkapnya
                                <ArrowRight
                                    size={14}
                                    className="ml-1 sm:ml-1.5 transition-transform group-hover:translate-x-1"
                                />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}