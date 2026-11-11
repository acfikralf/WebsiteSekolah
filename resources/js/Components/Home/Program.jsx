import { usePage } from '@inertiajs/react';
import useReveal from '@/hooks/useReveal';

export default function Program() {
    const titleRef = useReveal();
    const { ekstrakurikulers } = usePage().props;

    return (
        <section id="ekstrakurikuler" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Program Unggulan
                    </h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Berbagai program untuk mengembangkan bakat dan karakter siswa
                    </p>
                </div>

                {ekstrakurikulers?.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {ekstrakurikulers.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 reveal"
                            >
                                <div className="w-14 h-14 bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-accent-400 transition-colors">
                                    <i className={`ph ${item.icon || 'ph-tent'} text-3xl`}></i>
                                </div>
                                <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">
                                    {item.nama}
                                </h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                    {item.deskripsi}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-500">Belum ada program unggulan.</p>
                )}
            </div>
        </section>
    );
}