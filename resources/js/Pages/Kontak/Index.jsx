import MainLayout from '@/Layouts/MainLayout';
import { MapPin, Phone, Envelope, WhatsappLogo } from '@phosphor-icons/react';

export default function KontakIndex({ kontak = {} }) {
    return (
        <MainLayout>
            <div className="bg-primary-700 dark:bg-primary-900 text-white py-16 relative overflow-hidden islamic-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Hubungi Kami</h1>
                    <p className="text-lg text-primary-100 max-w-2xl">Kami siap membantu Anda. Silakan hubungi kami melalui kontak di bawah ini.</p>
                </div>
            </div>

            <div className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-sm">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-xl flex items-center justify-center shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Alamat Sekolah</h3>
                                    <p className="text-slate-600 dark:text-slate-400">{kontak.alamat}</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-sm">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-xl flex items-center justify-center shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Telepon / WhatsApp</h3>
                                    <p className="text-slate-600 dark:text-slate-400">{kontak.telepon}</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-sm">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-xl flex items-center justify-center shrink-0">
                                    <Envelope size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email Resmi</h3>
                                    <p className="text-slate-600 dark:text-slate-400">{kontak.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 min-h-[300px]">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9!2d112.7!3d-7.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMDAnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}