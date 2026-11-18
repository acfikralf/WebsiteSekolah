import MainLayout from '@/Layouts/MainLayout';
import { ArrowRight, CheckCircle, Student } from '@phosphor-icons/react';

export default function PpdbIndex() {
    return (
        <MainLayout>
            {/* ===== HERO — gradient hijau ke kuning (disamakan dengan Profil) ===== */}
            <section className="relative bg-gradient-to-r from-emerald-900 via-emerald-700 to-yellow-500 text-white overflow-hidden">
                {/* Hiasan lingkaran tipis, bukan blur */}
                <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
                    <div className="max-w-2xl mx-auto">
                        <p className="inline-flex items-center gap-2 text-yellow-300 font-medium uppercase tracking-wider mb-6 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                            <Student size={16} /> PPDB 2025/2026
                        </p>
                        <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6 text-white">
                            Penerimaan Peserta<br />
                            <span className="text-yellow-300">
                                Didik Baru
                            </span>
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            Bergabunglah bersama kami untuk masa depan yang lebih cerah.
                        </p>
                        <a href="#" className="inline-flex items-center px-8 py-4 bg-white text-emerald-800 hover:bg-yellow-50 font-bold text-lg rounded-xl shadow-lg transition-all hover:-translate-y-1">
                            DAFTAR SEKARANG <ArrowRight size={24} className="ml-2" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== BODY WRAPPER ===== */}
            <div className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-slate-900 dark:text-white mb-8">
                        Syarat Pendaftaran
                    </h2>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        {['Fotokopi Ijazah / SKL SD/MI', 'Fotokopi Akta Kelahiran', 'Fotokopi Kartu Keluarga (KK)', 'Pas Foto 3x4 sebanyak 3 lembar', 'Mengisi formulir pendaftaran'].map((syarat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle size={24} className="text-primary-500 shrink-0" />
                                <span className="text-slate-700 dark:text-slate-300">{syarat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}