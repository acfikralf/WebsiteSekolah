import { ArrowRight } from '@phosphor-icons/react';

export default function PpdbCta() {
    return (
        <section id="ppdb" className="py-16 md:py-20 bg-primary-700 dark:bg-primary-900 text-white relative overflow-hidden islamic-pattern">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">PPDB SMP Islam Watestanjung</h2>
                <p className="text-lg text-slate-200 mb-8">Pendaftaran Peserta Didik Baru Tahun Ajaran 2025/2026</p>
                <a href="#" className="inline-flex items-center px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl shadow-lg shadow-accent-500/30 hover:shadow-accent-600/40 transition-all hover:-translate-y-0.5">
                    DAFTAR SEKARANG
                    <ArrowRight size={20} className="ml-2" />
                </a>
            </div>
        </section>
    );
}