import MainLayout from '@/Layouts/MainLayout';
import { Trophy, Medal, MusicNotes, SoccerBall } from '@phosphor-icons/react';

const iconMap = { Akademik: Medal, Seni: MusicNotes, Olahraga: SoccerBall, Keagamaan: Trophy };

export default function PrestasiIndex({ prestasis = [] }) {
    return (
        <MainLayout>
            <div className="bg-primary-700 dark:bg-primary-900 text-white py-16 relative overflow-hidden islamic-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Prestasi Siswa</h1>
                    <p className="text-lg text-primary-100 max-w-2xl">Raihan gemilang siswa-siswi kami di berbagai tingkat kompetisi.</p>
                </div>
            </div>

            <div className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {prestasis.map((item) => {
                            const Icon = iconMap[item.kategori] || Trophy;
                            return (
                                <div key={item.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800">
                                        {item.foto ? (
                                            <img src={`/storage/${item.foto}`} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400"><Icon size={48} /></div>
                                        )}
                                        <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-medium px-3 py-1 rounded-full">{item.kategori}</span>
                                        {item.tingkat && <span className="absolute bottom-3 right-3 bg-primary-600/90 text-white text-xs font-medium px-3 py-1 rounded-full">{item.tingkat}</span>}
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-1">{item.judul}</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">oleh {item.siswa}</p>
                                        <p className="text-sm text-slate-500 line-clamp-2 mt-auto">{item.deskripsi}</p>
                                    </div>
                                </div>
                            );
                        })}
                        {prestasis.length === 0 && <p className="col-span-full text-center text-slate-500">Belum ada data prestasi.</p>}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}