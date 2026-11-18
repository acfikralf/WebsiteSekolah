import useReveal from '@/hooks/useReveal';
import { Eye, Target, CheckCircle } from '@phosphor-icons/react';

export default function VisiMisi() {
    const titleRef = useReveal();
    const visiRef = useReveal();
    const misiRef = useReveal();

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Judul Section */}
                <div className="text-center mb-8 sm:mb-12" ref={titleRef}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Visi & Misi
                    </h2>
                    <div className="w-16 sm:w-24 h-1 bg-accent-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
                </div>
                
                {/* Grid 1 kolom (tumpuk) di HP, 2 kolom di Desktop (md:grid-cols-2) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
                    
                    {/* KOTAK VISI */}
                    <div 
                        className="bg-slate-50 dark:bg-slate-800 p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors" 
                        ref={visiRef}
                    >
                        <div className="flex flex-row items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="p-1.5 sm:p-0 bg-primary-100 sm:bg-transparent dark:bg-slate-700 sm:dark:bg-transparent rounded-lg sm:rounded-none">
                                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-accent-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-display font-semibold text-slate-900 dark:text-white">Visi</h3>
                        </div>
                        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed text-justify sm:text-left">
                            Menjadi sekolah Islam unggulan yang membentuk generasi berilmu, berakhlak mulia, dan berwawasan global.
                        </p>
                    </div>

                    {/* KOTAK MISI */}
                    <div 
                        className="bg-slate-50 dark:bg-slate-800 p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors" 
                        ref={misiRef}
                    >
                        <div className="flex flex-row items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="p-1.5 sm:p-0 bg-primary-100 sm:bg-transparent dark:bg-slate-700 sm:dark:bg-transparent rounded-lg sm:rounded-none">
                                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-accent-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-display font-semibold text-slate-900 dark:text-white">Misi</h3>
                        </div>
                        <ul className="space-y-2.5 sm:space-y-3 text-slate-700 dark:text-slate-300">
                            <li className="flex items-start gap-2 sm:gap-2.5">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-1 text-primary-500" /> 
                                <span className="text-sm sm:text-base leading-snug">Menyelenggarakan pendidikan Islam yang terpadu.</span>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-2.5">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-1 text-primary-500" /> 
                                <span className="text-sm sm:text-base leading-snug">Mengembangkan potensi akademik dan non-akademik siswa.</span>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-2.5">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-1 text-primary-500" /> 
                                <span className="text-sm sm:text-base leading-snug">Menanamkan nilai-nilai akhlak mulia dalam kehidupan sehari-hari.</span>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-2.5">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-1 text-primary-500" /> 
                                <span className="text-sm sm:text-base leading-snug">Menjalin kerjasama dengan orang tua dan masyarakat.</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}