import useReveal from '@/hooks/useReveal';
import { Eye, Target, CheckCircle } from '@phosphor-icons/react';

export default function VisiMisi() {
    const titleRef = useReveal();
    const visiRef = useReveal();
    const misiRef = useReveal();

    return (
        <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Visi & Misi</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors" ref={visiRef}>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye size={28} className="text-primary-600 dark:text-accent-400" />
                            <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">Visi</h3>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">Menjadi sekolah Islam unggulan yang membentuk generasi berilmu, berakhlak mulia, dan berwawasan global.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors" ref={misiRef}>
                        <div className="flex items-center gap-3 mb-4">
                            <Target size={28} className="text-primary-600 dark:text-accent-400" />
                            <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">Misi</h3>
                        </div>
                        <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                            <li className="flex items-start gap-2"><CheckCircle size={20} className="mt-1 text-primary-500" /> Menyelenggarakan pendidikan Islam yang terpadu.</li>
                            <li className="flex items-start gap-2"><CheckCircle size={20} className="mt-1 text-primary-500" /> Mengembangkan potensi akademik dan non-akademik siswa.</li>
                            <li className="flex items-start gap-2"><CheckCircle size={20} className="mt-1 text-primary-500" /> Menanamkan nilai-nilai akhlak mulia dalam kehidupan sehari-hari.</li>
                            <li className="flex items-start gap-2"><CheckCircle size={20} className="mt-1 text-primary-500" /> Menjalin kerjasama dengan orang tua dan masyarakat.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}