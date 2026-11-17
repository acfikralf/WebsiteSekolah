import { useState, useEffect } from "react";
import { StarFour, ArrowRight } from "@phosphor-icons/react";
import { usePage } from "@inertiajs/react";

// Definisikan di luar komponen agar referensi stabil
const GAMBAR_HERO = [
    "/image/upacara.jpeg",
    "/image/upacara-bendera.jpeg",
    "/image/upacara-guru-baru.jpeg",
];

export default function Hero() {
    const { site } = usePage().props;
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % GAMBAR_HERO.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="beranda"
            className="relative bg-primary-900 text-white overflow-hidden"
        >
            {/* Semua gambar di z-0, hanya opacity yang berubah → crossfade murni */}
            {GAMBAR_HERO.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Background Hero ${index + 1}`}
                    aria-hidden={index !== currentImage}
                    className={`absolute inset-0 w-full h-full object-cover object-center z-0 transition-opacity duration-[1500ms] ease-in-out will-change-[opacity] ${
                        index === currentImage ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}

            {/* Overlay gelap di atas gambar */}
            <div className="absolute inset-0 bg-primary-900/70 mix-blend-multiply z-10" />

            {/* Konten di atas overlay */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
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
                            href="profil"
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