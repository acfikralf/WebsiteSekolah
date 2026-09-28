import { StarFour, ArrowRight } from "@phosphor-icons/react";
import { usePage } from "@inertiajs/react";

export default function Hero() {
    const { site } = usePage().props;

    return (
        <section
            id="beranda"
            className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden "
        >
            <div className="absolute inset-0 opacity-10 islamic-pattern">
                <img
                    src="https://picsum.photos/seed/school/1920/1080"
                    alt="SMP Islam Watestanjung"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
                <div className="max-w-3xl">
                    <p className="inline-flex items-center gap-2 text-accent-400 font-medium uppercase tracking-wider mb-4 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                        {site.title}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                        {site.tagline}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl">
                        {site.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#profil"
                            className="inline-flex items-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl shadow-lg shadow-accent-500/30 hover:shadow-accent-600/40 transition-all hover:-translate-y-0.5"
                        >
                            Lihat Profil
                            <ArrowRight size={20} className="ml-2" />
                        </a>
                        <a
                            href="#ppdb"
                            className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-xl backdrop-blur-sm transition-all hover:-translate-y-0.5"
                        >
                            Informasi PPDB
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
