import MainLayout from '@/Layouts/MainLayout';
import { MapPin, Phone, Envelope, Headset } from '@phosphor-icons/react';

export default function KontakIndex({ kontak = {} }) {
    return (
        <MainLayout>
            {/* ===== HERO — WARNA HIJAU CERAH ===== */}
            <section 
                className="relative text-white overflow-hidden"
                style={{ background: 'linear-gradient(to bottom right, #059669, #047857)' }}
            >
                <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 text-yellow-300 font-medium uppercase tracking-wider mb-4 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                            <Headset size={16} /> Hubungi Kami
                        </p>
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                            Layanan &<br />
                            <span className="text-yellow-300">
                                Kontak Sekolah
                            </span>
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl">
                            Kami siap membantu Anda. Silakan hubungi kami melalui kontak di bawah ini.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== BODY WRAPPER ===== */}
            <div className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* GRID UTAMA */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-stretch">
                        
                        {/* KOLOM KIRI */}
                        <div className="flex flex-col justify-center">
                            
                            {/* Judul & Deskripsi (Hanya untuk Desktop, di HP dipindah ke atas grid) */}
                            <div className="hidden md:block mb-10">
                                <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight mb-4">
                                    Mari Terhubung dengan <span className="text-yellow-500">SMP Islam Watestanjung</span>
                                </h2>
                                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Kami siap membantu menjawab pertanyaan terkait pendaftaran, kurikulum, maupun informasi umum lainnya.
                                </p>
                            </div>

                            {/* Judul & Deskripsi (Khusus untuk HP/Android, ada di atas) */}
                            <div className="block md:hidden mb-6">
                                <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white leading-tight mb-2">
                                    Mari Terhubung dengan <span className="text-yellow-500">SMP Islam Watestanjung</span>
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Kami siap membantu menjawab pertanyaan terkait pendaftaran, kurikulum, maupun informasi umum lainnya.
                                </p>
                            </div>

                            {/* Pembungkus Khusus HP agar Kontak & Peta sejajar */}
                            <div className="grid grid-cols-[1.5fr_1fr] md:flex md:flex-col gap-4 md:gap-8 items-stretch">
                                
                                {/* List Kontak */}
                                <div className="space-y-4 md:space-y-6">
                                    {/* Email */}
                                    <div className="flex items-start gap-2 md:gap-4">
                                        <div className="w-8 h-8 md:w-12 md:h-12 bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-0.5 md:mt-0">
                                            <Envelope className="w-4 h-4 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 mb-0.5 md:mb-1">Email</p>
                                            <p className="text-xs md:text-lg font-medium text-slate-900 dark:text-white break-all">
                                                {kontak.email || 'Belum ada data'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Telepon */}
                                    <div className="flex items-start gap-2 md:gap-4">
                                        <div className="w-8 h-8 md:w-12 md:h-12 bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-0.5 md:mt-0">
                                            <Phone className="w-4 h-4 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 mb-0.5 md:mb-1">No Telephone</p>
                                            <p className="text-xs md:text-lg font-medium text-slate-900 dark:text-white break-words">
                                                {kontak.telepon || 'Belum ada data'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Alamat */}
                                    <div className="flex items-start gap-2 md:gap-4">
                                        <div className="w-8 h-8 md:w-12 md:h-12 bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-0.5 md:mt-0">
                                            <MapPin className="w-4 h-4 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 mb-0.5 md:mb-1">Alamat</p>
                                            <p className="text-xs md:text-lg font-medium text-slate-900 dark:text-white leading-relaxed break-words">
                                                {kontak.alamat || 'Belum ada data'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* PETA (Hanya muncul di HP di dalam grid ini) */}
                                <div className="block md:hidden rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 min-h-[150px]">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.8112683557665!2d112.55714847500008!3d-7.375038592634247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e780892873f76a9%3A0x5b8edea7ca068924!2sSMP%20Islam%20Watestanjung!5e0!3m2!1sid!2sid!4v1795146762939!5m2!1sid!2sid"
                                        width="100%" 
                                        height="100%" 
                                        style={{ border: 0 }} 
                                        allowFullScreen="" 
                                        loading="lazy"
                                    ></iframe>
                                </div>

                            </div>
                        </div>

                        {/* PETA (Hanya muncul di Desktop di kolom kanan) */}
                        <div className="hidden md:block rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 h-full min-h-[400px] w-full">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.8112683557665!2d112.55714847500008!3d-7.375038592634247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e780892873f76a9%3A0x5b8edea7ca068924!2sSMP%20Islam%20Watestanjung!5e0!3m2!1sid!2sid!4v1795146762939!5m2!1sid!2sid"
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy"
                                className="w-full h-full min-h-[400px]"
                            ></iframe>
                        </div>

                    </div>
                </div>
            </div>
        </MainLayout>
    );
}