import MainLayout from '@/Layouts/MainLayout';
import useReveal from '@/hooks/useReveal';

export default function GuruIndex({ gurus = [] }) {
    const revealRef = useReveal();

    return (
        <MainLayout>
            <div className="bg-primary-700 dark:bg-primary-900 text-white py-16 relative overflow-hidden islamic-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Tenaga Pendidik</h1>
                    <p className="text-lg text-primary-100 max-w-2xl">Guru-guru profesional dan berdedikasi di SMP Islam Watestanjung.</p>
                </div>
            </div>

            <div className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]" ref={revealRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {gurus.map((t) => (
                            <div key={t.id} className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 reveal">
                                <div className="aspect-[3/4] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                                    {t.foto_url ? (
                                        <img src={t.foto_url} alt={t.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400"><i className="ph ph-user text-5xl"></i></div>
                                    )}
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">{t.nama}</h3>
                                    <p className="text-sm text-primary-600 dark:text-accent-400 mt-1">{t.jabatan}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.mapel}</p>
                                </div>
                            </div>
                        ))}
                        {gurus.length === 0 && <p className="col-span-full text-center text-slate-500">Belum ada data guru.</p>}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}