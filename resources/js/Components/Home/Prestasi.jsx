import useReveal from '@/hooks/useReveal';
import { Medal, MusicNotes, SoccerBall, Trophy, ArrowRight } from '@phosphor-icons/react';
import {usePage} from '@inertiajs/react'


const iconMap = {
    Akademik: Medal,
    Seni: MusicNotes,
    Olahraga: SoccerBall,
    Keagamaan: Trophy,
};

export default function Prestasi({ prestasiList = [] }) {
    const titleRef = useReveal();
    const { prestasis } = usePage().props;
    return (
        <section id="prestasi" className="py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Prestasi Terbaru
                    </h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Raihan gemilang siswa kami
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prestasis.length === 0 && (
                        <p className="col-span-full text-center text-slate-500">Belum ada prestasi.</p>
                    )}

                    {prestasis.map((item) => {
                        const Icon = iconMap[item.kategori] || Trophy;
                        return (
                            <div
                                key={item.id}
                                className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col reveal"
                            >
                                {/* Foto */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-700">
                                    {item.foto ? (
                                        <img
                                            src={`/storage/${item.foto}`}
                                            alt={item.judul}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <i className="ph ph-image text-4xl"></i>
                                        </div>
                                    )}
                                    {/* Badge kategori */}
                                    <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                                        {item.kategori}
                                    </span>
                                    {/* Badge tingkat */}
                                    {item.tingkat && (
                                        <span className="absolute bottom-3 right-3 bg-primary-600/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                                            {item.tingkat}
                                        </span>
                                    )}
                                </div>

                                {/* Body */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-2 text-primary-600 dark:text-accent-400">
                                        <Icon size={20} />
                                        <span className="text-xs uppercase tracking-wider font-semibold">
                                            {item.kategori}
                                        </span>
                                    </div>
                                    <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors">
                                        {item.judul}
                                    </h3>
                                    {item.siswa && (
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            oleh <span className="font-medium text-slate-700 dark:text-slate-300">{item.siswa}</span>
                                        </p>
                                    )}
                                    {item.deskripsi && (
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                                            {item.deskripsi}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}