import MainLayout from '@/Layouts/MainLayout';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';

export default function PpdbIndex() {
    return (
        <MainLayout>
            <div className="bg-primary-700 dark:bg-primary-900 text-white py-20 relative overflow-hidden islamic-pattern">
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Penerimaan Peserta Didik Baru</h1>
                    <p className="text-xl text-primary-100 mb-8">Tahun Ajaran 2025/2026</p>
                    <a href="#" className="inline-flex items-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-accent-500/30 transition-all hover:-translate-y-1">
                        DAFTAR SEKARANG <ArrowRight size={24} className="ml-2" />
                    </a>
                </div>
            </div>
            <div className="py-16 max-w-4xl mx-auto px-4">
                <h2 className="text-2xl font-display font-bold text-center mb-8">Syarat Pendaftaran</h2>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    {['Fotokopi Ijazah / SKL SD/MI', 'Fotokopi Akta Kelahiran', 'Fotokopi Kartu Keluarga (KK)', 'Pas Foto 3x4 sebanyak 3 lembar', 'Mengisi formulir pendaftaran'].map((syarat, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <CheckCircle size={24} className="text-primary-500" />
                            <span className="text-slate-700 dark:text-slate-300">{syarat}</span>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}