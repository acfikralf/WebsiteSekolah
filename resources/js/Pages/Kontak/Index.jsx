import MainLayout from '@/Layouts/MainLayout';
import { MapPin, Phone, Envelope, WhatsappLogo, Headset } from '@phosphor-icons/react';

export default function KontakIndex({ kontak = {} }) {
    return (
        <MainLayout>
            {/* ===== HERO — gradient hijau ke kuning ===== */}
            <section className="relative bg-gradient-to-r from-emerald-900 via-emerald-700 to-yellow-500 text-white overflow-hidden">
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
            {/* min-h-[50vh] dihapus/dihilangkan agar footer langsung naik ke atas mengikuti konten */}
            <div className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-[3fr_2fr] md:grid-cols-2 gap-3 sm:gap-8 items-stretch">
                        
                        {/* TEKS KONTAK */}
                        <div className="space-y-2 sm:space-y-6 flex flex-col justify-center">
                            <div className="flex items-start gap-2 sm:gap-4 p-2.5 sm:p-6 bg-white dark:bg-slate-900 rounded-lg sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-6 h-6 sm:w-12 sm:h-12 bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-md sm:rounded-xl flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                                    <MapPin className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-[10px] sm:text-base text-slate-900 dark:text-white mb-0.5 sm:mb-1 leading-tight">Alamat Sekolah</h3>
                                    <p className="text-[9px] sm:text-sm text-slate-600 dark:text-slate-400 leading-snug break-words">{kontak.alamat}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-2 sm:gap-4 p-2.5 sm:p-6 bg-white dark:bg-slate-900 rounded-lg sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-6 h-6 sm:w-12 sm:h-12 bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-md sm:rounded-xl flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                                    <Phone className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-[10px] sm:text-base text-slate-900 dark:text-white mb-0.5 sm:mb-1 leading-tight">Telepon / WA</h3>
                                    <p className="text-[9px] sm:text-sm text-slate-600 dark:text-slate-400 leading-snug break-words">{kontak.telepon}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-2 sm:gap-4 p-2.5 sm:p-6 bg-white dark:bg-slate-900 rounded-lg sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-6 h-6 sm:w-12 sm:h-12 bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-md sm:rounded-xl flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                                    <Envelope className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-[10px] sm:text-base text-slate-900 dark:text-white mb-0.5 sm:mb-1 leading-tight">Email Resmi</h3>
                                    <p className="text-[9px] sm:text-sm text-slate-600 dark:text-slate-400 leading-snug break-words">{kontak.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* PETA */}
                        <div className="rounded-lg sm:rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 min-h-[150px] sm:min-h-[300px]">
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
            </div>
        </MainLayout>
    );
}