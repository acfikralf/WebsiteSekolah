import useReveal from '@/hooks/useReveal';
import { ArrowRight } from '@phosphor-icons/react';

export default function Sambutan() {
    const leftRef = useReveal();
    const rightRef = useReveal();

    return (
        <section id="profil" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 islamic-pattern">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative" ref={leftRef}>
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-3xl blur-2xl opacity-30"></div>
                        <img src="https://picsum.photos/seed/headmaster/600/700" alt="Kepala Sekolah" className="relative w-full max-w-md mx-auto rounded-3xl shadow-xl transform transition-transform duration-500 hover:scale-[1.02]" />
                    </div>
                    <div ref={rightRef}>
                        <div className="mb-6 text-left">
                            <p className="text-sm font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-2">Sambutan</p>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Kepala Sekolah</h2>
                            <div className="w-16 h-1 bg-primary-600 dark:bg-accent-400 mt-4 rounded-full"></div>
                        </div>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                            <p>Assalamu'alaikum warahmatullahi wabarakatuh. Selamat datang di website resmi SMP Islam Watestanjung. Kami berkomitmen untuk mendidik generasi yang tidak hanya unggul dalam akademik, tetapi juga berakhlak mulia sesuai tuntunan Islam. Dengan tenaga pendidik yang profesional dan lingkungan belajar yang islami, kami berharap dapat mencetak pemimpin masa depan yang berintegritas.</p>
                        </div>
                        <div className="mt-6">
                            <p className="font-display font-semibold text-lg text-slate-900 dark:text-white">H. Fahru Rozi, M.Pd.</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Kepala SMP Islam Watestanjung</p>
                        </div>
                        <a href="#" className="mt-6 inline-flex items-center text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 group">
                            Baca Selengkapnya
                            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}