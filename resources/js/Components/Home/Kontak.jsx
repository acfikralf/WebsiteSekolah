import useReveal from '@/hooks/useReveal';
import { MapPin, Phone, Envelope } from '@phosphor-icons/react';

export default function Kontak() {
    const titleRef = useReveal();
    const leftRef = useReveal();
    const rightRef = useReveal();

    return (
        <section id="kontak" className="py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Kontak Kami</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="space-y-6" ref={leftRef}>
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <MapPin size={24} className="text-primary-600 dark:text-accent-400 mt-1" />
                            <p className="text-slate-700 dark:text-slate-300">Jl. Pendidikan No. 1, Watestanjung, Jawa Timur</p>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Phone size={24} className="text-primary-600 dark:text-accent-400" />
                            <p className="text-slate-700 dark:text-slate-300">+62 812-3456-7890</p>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Envelope size={24} className="text-primary-600 dark:text-accent-400" />
                            <p className="text-slate-700 dark:text-slate-300">info@watestanjung.sch.id</p>
                        </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md" ref={rightRef}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9!2d112.7!3d-7.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMDAnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                            width="100%"
                            height="250"
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