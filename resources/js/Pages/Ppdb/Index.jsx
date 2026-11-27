import MainLayout from '@/Layouts/MainLayout';
import { ArrowRight, CheckCircle, Student, DownloadSimple, WhatsappLogo } from '@phosphor-icons/react';

export default function PpdbIndex() {
    // Nomor WA Dummy (Ganti dengan nomor asli nanti)
    const waNumber = "+6285731524096"; 
    const waLink = `https://wa.me/${waNumber}?text=Halo%20Bu%20Nia,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran%20PPDB%20SMP%20Islam%20Watestanjung.`;
    const googleFormLink = "https://forms.gle/GxvmTx9bMsMXwqix7";

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
                        {/* Tombol Daftar Sekarang diarahkan ke Google Form */}
                        <a 
                            href={googleFormLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-8 py-4 bg-white text-emerald-800 hover:bg-yellow-50 font-bold text-lg rounded-xl shadow-lg transition-all hover:-translate-y-1"
                        >
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

                    {/* Aksi Tambahan: Unduh Formulir & Tanya Admin WA */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">                
                        <a 
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] text-white font-medium rounded-xl shadow-lg shadow-green-500/20 hover:bg-[#128C7E] transition-colors"
                        >
                            <WhatsappLogo size={20} className="mr-2" /> Tanya Admin (Bu Nia)
                        </a>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}