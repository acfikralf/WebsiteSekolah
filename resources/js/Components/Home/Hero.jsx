import { useState, useEffect } from "react";
import { StarFour, ArrowRight } from "@phosphor-icons/react";
import { usePage } from "@inertiajs/react";

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
            className="relative bg-primary-900 text-white overflow-hidden min-h-[85vh] sm:min-h-0 flex items-center"
        >
            {/* Gambar Background */}
            {GAMBAR_HERO.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Background Hero ${index + 1}`}
                    aria-hidden={index !== currentImage}
                    // object-top: Agar bagian atas foto (wajah/bendera) tidak terpotong di HP
                    className={`absolute inset-0 w-full h-full object-cover object-top sm:object-center z-0 transition-opacity duration-[1500ms] ease-in-out will-change-[opacity] ${
                        index === currentImage ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}

            {/* Overlay: Dibuat lebih gelap di HP (80%) agar teks putih sangat kontras */}
            <div className="absolute inset-0 bg-primary-900/80 sm:bg-primary-900/70 mix-blend-multiply z-10" />

            {/* Konten */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
                <div className="max-w-3xl flex flex-col justify-center h-full">
                    {/* Badge Judul */}
                    <p className="inline-flex items-center gap-1.5 sm:gap-2 text-accent-400 font-medium uppercase tracking-wider mb-5 sm:mb-6 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-[10px] sm:text-sm backdrop-blur-sm w-max">
                        <StarFour size={14} className="sm:w-4 sm:h-4" /> {site.title}
                    </p>
                    
                    {/* Judul Utama */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.2] sm:leading-tight mb-4 sm:mb-6">
                        {site.tagline}
                    </h1>
                    
                    {/* Deskripsi */}
                    <p className="text-sm sm:text-lg md:text-xl text-slate-200 mb-8 max-w-xl leading-relaxed">
                        {site.description}
                    </p>

                    {/* Tombol - Dibuat full width di HP agar mudah ditekan (touch-friendly) */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                        <a
                            href="profil"
                            className="inline-flex items-center justify-center px-6 py-3.5 sm:py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm sm:text-base font-semibold sm:font-medium rounded-xl shadow-lg shadow-accent-500/30 transition-all active:scale-95 sm:hover:-translate-y-0.5"
                        >
                            Lihat Profil
                            <ArrowRight size={18} className="ml-2" />
                        </a>
                        <a
                            href="#ppdb"
                            className="inline-flex items-center justify-center px-6 py-3.5 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm sm:text-base font-semibold sm:font-medium rounded-xl backdrop-blur-sm transition-all active:scale-95 sm:hover:-translate-y-0.5"
                        >
                            Informasi PPDB
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}