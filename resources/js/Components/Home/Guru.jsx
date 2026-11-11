import useReveal from '@/hooks/useReveal';
import { usePage } from '@inertiajs/react';

export default function Guru() {
    const titleRef = useReveal();
    const { gurus } = usePage().props;

    return (
        <section id="guru" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Guru Kami
                    </h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Pendidik profesional dan berdedikasi
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {gurus.length === 0 && (
                        <p className="col-span-full text-center text-slate-500">
                            Belum ada data guru.
                        </p>
                    )}

                    {gurus.map((t) => (
                        <div
                            key={t.id}
                            className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 reveal"
                        >
                            <div className="aspect-[3/4] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                                {t.foto_url ? (
                                    <img
                                        src={t.foto_url}
                                        alt={t.nama}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <i className="ph ph-user text-5xl"></i>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">
                                    {t.nama}
                                </h3>
                                {t.jabatan && (
                                    <p className="text-sm text-primary-600 dark:text-accent-400 mt-1">
                                        {t.jabatan}
                                    </p>
                                )}
                                {t.mapel && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {t.mapel}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}