import useReveal from '@/hooks/useReveal';
import { MapPin, Phone, Envelope } from '@phosphor-icons/react';

export default function Kontak() {
    const titleRef = useReveal();
    const leftRef = useReveal();
    const rightRef = useReveal();

    return (
        <section id="kontak" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12" ref={titleRef}>
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Kontak Kami
                    </h2>
                    <div className="w-12 sm:w-24 h-1 bg-accent-500 mx-auto mt-2 sm:mt-4 rounded-full"></div>
                </div>

                {/* Grid Container: 3fr untuk Teks (Kiri), 2fr untuk Peta (Kanan) */}
                <div className="grid grid-cols-[3fr_2fr] md:grid-cols-2 gap-3 sm:gap-8 max-w-4xl mx-auto items-stretch">
                    
                    {/* TEKS KONTAK (Di Kiri) */}
                    <div className="space-y-2 sm:space-y-6 flex flex-col justify-center" ref={leftRef}>
                        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-md sm:rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-primary-600 dark:text-accent-400 mt-0.5 shrink-0" />
                            <p className="text-[10px] sm:text-base text-slate-700 dark:text-slate-300 leading-snug">Jl. Pendidikan No. 1, Watestanjung, Jawa Timur</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-md sm:rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-primary-600 dark:text-accent-400 shrink-0" />
                            <p className="text-[10px] sm:text-base text-slate-700 dark:text-slate-300 leading-snug">+62 812-3456-7890</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-md sm:rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Envelope className="w-4 h-4 sm:w-6 sm:h-6 text-primary-600 dark:text-accent-400 shrink-0" />
                            <p className="text-[10px] sm:text-base text-slate-700 dark:text-slate-300 leading-snug break-all">info@watestanjung.sch.id</p>
                        </div>
                    </div>

                    {/* PETA (Di Kanan) */}
                    <div className="rounded-lg sm:rounded-2xl overflow-hidden shadow-md min-h-[150px] sm:min-h-[250px]" ref={rightRef}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9!2d112.7!3d-7.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMDAnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>

                </div>
            </div>
        </section>
    );
}