import MainLayout from '@/Layouts/MainLayout';
import { Tent } from '@phosphor-icons/react';

export default function EkstrakurikulerIndex({ ekstrakurikulers = [] }) {
    return (
        <MainLayout>
            {/* ===== HERO — WARNA HIJAU CERAH ===== */}
            <section 
                className="relative text-white overflow-hidden"
                style={{ background: 'linear-gradient(to bottom right, #059669, #047857)' }}
            >
                {/* Hiasan lingkaran tipis, bukan blur */}
                <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 text-yellow-300 font-medium uppercase tracking-wider mb-4 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                            <Tent size={16} /> Ekstrakurikuler
                        </p>
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                            Wadah Pengembangan<br />
                            <span className="text-yellow-300">
                                Bakat & Minat
                            </span>
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl">
                            Wadah pengembangan bakat, minat, dan karakter siswa.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== BODY WRAPPER ===== */}
            <div className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Grid 3 kolom di HP, 3 kolom di Desktop */}
                    <div className="grid grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-6">
                        {ekstrakurikulers.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all flex flex-col h-full">
                                {/* Ikon */}
                                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 shrink-0">
                                    <i className={`ph ${item.icon || 'ph-tent'} text-base sm:text-2xl`}></i>
                                </div>
                                
                                {/* Judul */}
                                <h3 className="font-display font-bold text-[11px] sm:text-xl text-slate-900 dark:text-white mb-1 sm:mb-2 leading-snug line-clamp-2">
                                    {item.nama}
                                </h3>
                                
                                {/* Pembina */}
                                <p className="text-[9px] sm:text-sm font-medium text-primary-600 dark:text-accent-400 mb-1 sm:mb-3 truncate">
                                    Pembina: {item.pembina || '-'}
                                </p>
                                
                                {/* Deskripsi */}
                                <p className="text-[9px] sm:text-sm text-slate-600 dark:text-slate-300 leading-snug line-clamp-3 sm:line-clamp-none mt-auto">
                                    {item.deskripsi}
                                </p>
                            </div>
                        ))}
                        {ekstrakurikulers.length === 0 && (
                            <p className="col-span-full text-center text-xs sm:text-base text-slate-500">Belum ada data ekstrakurikuler.</p>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}