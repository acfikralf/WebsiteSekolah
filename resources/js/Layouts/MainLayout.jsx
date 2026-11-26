import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function MainLayout({ children }) {
    const { auth, site } = usePage().props;
    const { url } = usePage(); // <-- Ambil URL saat ini

    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // ==== Helper untuk mengecek apakah link sedang aktif ====
    const isActive = (path) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    // ==== Dark Mode Init ====
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (
            saved === "dark" ||
            (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    // ==== Toggle Dark Mode ====
    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            document.documentElement.classList.toggle("dark", newMode);
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col min-h-screen">
            {/* ===== NAVBAR ===== */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 shrink-0 group">
                            <img
                                src="/image/logo-sekolah.png"
                                alt="Logo SMP Islam Watestanjung"
                                className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform group-hover:scale-105"
                            />
                            <div className="leading-tight max-w-[170px] sm:max-w-none">
                                <span className="block font-display font-bold text-slate-900 dark:text-white text-[13px] sm:text-lg group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors truncate">
                                    {site.title}
                                </span>
                                <span className="hidden xs:block text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                                    {site.tagline}
                                </span>
                            </div>
                        </Link>

                        {/* ===== DESKTOP NAVIGATION ===== */}
                        <div className="hidden lg:flex items-center gap-6">
                            <Link
                                href="/"
                                className={`text-sm font-medium relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:transition-transform after:origin-left ${
                                    isActive('/')
                                        ? "text-primary-600 dark:text-accent-400 after:scale-x-100"
                                        : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 after:scale-x-0 hover:after:scale-x-100"
                                }`}
                            >
                                Beranda
                            </Link>
                            <Link
                                href="/profil"
                                className={`text-sm font-medium relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:transition-transform after:origin-left ${
                                    isActive('/profil')
                                        ? "text-primary-600 dark:text-accent-400 after:scale-x-100"
                                        : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 after:scale-x-0 hover:after:scale-x-100"
                                }`}
                            >
                                Profil
                            </Link>

                            {/* Dropdown Akademik */}
                            <div className="relative group">
                                <button className={`flex items-center gap-1 py-2 text-sm font-medium ${
                                    isActive('/guru') || isActive('/ekstrakurikuler')
                                        ? "text-primary-600 dark:text-accent-400"
                                        : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400"
                                }`}>
                                    Akademik{" "}
                                    <i className="ph ph-caret-down text-xs"></i>
                                </button>
                                <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-2 border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <Link
                                        href="/guru"
                                        className={`block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600 ${
                                            isActive('/guru') ? "text-primary-600 dark:text-accent-400 font-semibold" : "text-slate-600 dark:text-slate-300"
                                        }`}
                                    >
                                        Guru
                                    </Link>
                                    <Link
                                        href="/ekstrakurikuler"
                                        className={`block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600 ${
                                            isActive('/ekstrakurikuler') ? "text-primary-600 dark:text-accent-400 font-semibold" : "text-slate-600 dark:text-slate-300"
                                        }`}
                                    >
                                        Ekstrakurikuler
                                    </Link>
                                </div>
                            </div>

                            {/* Dropdown Kesiswaan */}
                            <div className="relative group">
                                <button className={`flex items-center gap-1 py-2 text-sm font-medium ${
                                    isActive('/prestasi') || isActive('/galeri-murid')
                                        ? "text-primary-600 dark:text-accent-400"
                                        : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400"
                                }`}>
                                    Kesiswaan{" "}
                                    <i className="ph ph-caret-down text-xs"></i>
                                </button>
                                <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-2 border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <Link
                                        href="/prestasi"
                                        className={`block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600 ${
                                            isActive('/prestasi') ? "text-primary-600 dark:text-accent-400 font-semibold" : "text-slate-600 dark:text-slate-300"
                                        }`}
                                    >
                                        Prestasi
                                    </Link>
                                    <Link
                                        href="/galeri-murid"
                                        className={`block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600 ${
                                            isActive('/galeri-murid') ? "text-primary-600 dark:text-accent-400 font-semibold" : "text-slate-600 dark:text-slate-300"
                                        }`}
                                    >
                                        Galeri Murid
                                    </Link>
                                </div>
                            </div>

                            <Link
                                href="/berita"
                                className={`text-sm font-medium relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:transition-transform after:origin-left ${
                                    isActive('/berita')
                                        ? "text-primary-600 dark:text-accent-400 after:scale-x-100"
                                        : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 after:scale-x-0 hover:after:scale-x-100"
                                }`}
                            >
                                Berita
                            </Link>
                            <Link
                                href="/agenda"
                                className={`text-sm font-medium relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:transition-transform after:origin-left ${
                                    isActive('/agenda')
                                        ? "text-primary-600 dark:text-accent-400 after:scale-x-100"
                                        : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 after:scale-x-0 hover:after:scale-x-100"
                                }`}
                            >
                                Agenda
                            </Link>
                            <Link
                                href="/ppdb"
                                className={`text-sm font-medium relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:transition-transform after:origin-left ${
                                    isActive('/ppdb')
                                        ? "text-primary-600 dark:text-accent-400 after:scale-x-100"
                                        : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 after:scale-x-0 hover:after:scale-x-100"
                                }`}
                            >
                                PPDB
                            </Link>
                            <Link
                                href="/kontak"
                                className={`text-sm font-medium relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:transition-transform after:origin-left ${
                                    isActive('/kontak')
                                        ? "text-primary-600 dark:text-accent-400 after:scale-x-100"
                                        : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 after:scale-x-0 hover:after:scale-x-100"
                                }`}
                            >
                                Kontak
                            </Link>

                            <button
                                onClick={toggleDarkMode}
                                className="p-2 text-slate-500 hover:text-primary-600 dark:hover:text-accent-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Toggle dark mode"
                            >
                                <i className={`ph ${darkMode ? "ph-sun" : "ph-moon"} text-xl`}></i>
                            </button>
                        </div>

                        {/* ===== MOBILE MENU BUTTON ===== */}
                        <div className="flex items-center gap-1.5 sm:gap-4 lg:hidden">
                            <button
                                onClick={toggleDarkMode}
                                className="p-1.5 sm:p-2 text-slate-500 hover:text-primary-600 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Toggle dark mode"
                            >
                                <i className={`ph ${darkMode ? "ph-sun" : "ph-moon"} text-lg sm:text-xl`}></i>
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-1.5 sm:p-2 text-slate-500 hover:text-primary-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <i className="ph ph-list text-xl sm:text-2xl"></i>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* ===== MOBILE NAVIGATION ===== */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg max-h-[80vh] overflow-y-auto">
                        <div className="px-2 pt-2 pb-4 space-y-0.5">
                            <Link
                                href="/"
                                className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                                    isActive('/') ? "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                            >
                                Beranda
                            </Link>
                            <Link
                                href="/profil"
                                className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                                    isActive('/profil') ? "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                            >
                                Profil
                            </Link>

                            <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Akademik
                            </p>
                            <Link
                                href="/guru"
                                className={`block pl-5 pr-3 py-1.5 text-[13px] rounded-lg transition-colors ${
                                    isActive('/guru') ? "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400 font-semibold" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                            >
                                Guru
                            </Link>
                            <Link
                                href="/ekstrakurikuler"
                                className={`block pl-5 pr-3 py-1.5 text-[13px] rounded-lg transition-colors ${
                                    isActive('/ekstrakurikuler') ? "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400 font-semibold" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                            >
                                Ekstrakurikuler
                            </Link>

                            <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Kesiswaan
                            </p>
                            <Link
                                href="/prestasi"
                                className={`block pl-5 pr-3 py-1.5 text-[13px] rounded-lg transition-colors ${
                                    isActive('/prestasi') ? "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400 font-semibold" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                            >
                                Prestasi
                            </Link>
                            <Link
                                href="/galeri-murid"
                                className={`block pl-5 pr-3 py-1.5 text-[13px] rounded-lg transition-colors ${
                                    isActive('/galeri-murid') ? "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400 font-semibold" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                            >
                                Galeri Murid
                            </Link>

                            <Link
                                href="/berita"
                                className={`block px-3 py-2 mt-1 text-[13px] font-medium rounded-lg transition-colors border-t border-slate-100 dark:border-slate-800/50 ${
                                    isActive('/berita') ? "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                            >
                                Berita
                            </Link>
                            <Link
                                href="/agenda"
                                className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                                    isActive('/agenda') ? "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                            >
                                Agenda
                            </Link>
                            <Link
                                href="/ppdb"
                                className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                                    isActive('/ppdb') ? "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                            >
                                PPDB
                            </Link>
                            <Link
                                href="/kontak"
                                className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                                    isActive('/kontak') ? "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                            >
                                Kontak
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* ===== KONTEN UTAMA ===== */}
            <main className="flex-grow">{children}</main>

            {/* ===== FOOTER ===== */}
            <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                    <div className="grid grid-cols-2 md:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-0">
                        <div className="md:col-span-4 space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/image/logo-sekolah.png"
                                    alt="Logo"
                                    className="w-7 h-7 sm:w-10 sm:h-10 object-contain shrink-0"
                                />
                                <span className="font-display font-bold text-white text-[11px] sm:text-lg leading-tight">
                                    SMP Islam Watestanjung
                                </span>
                            </div>
                            <p className="text-[10px] sm:text-sm leading-relaxed text-slate-400">
                                Sekolah Islam yang mengintegrasikan pendidikan
                                umum dengan nilai-nilai keislaman untuk
                                membentuk generasi berilmu dan berakhlak mulia.
                            </p>
                            <div className="flex space-x-3 sm:space-x-4">
                                <a href="https://www.instagram.com/smp_islam_watestanjung/" className="text-slate-400 hover:text-white transition-colors">
                                    <i className="ph ph-instagram-logo text-base sm:text-xl"></i>
                                </a>
                                <a href="https://www.facebook.com/pages/Smp-Islam-Wates-Tanjung/841595049322724?locale=en_GB" className="text-slate-400 hover:text-white transition-colors">
                                    <i className="ph ph-facebook-logo text-base sm:text-xl"></i>
                                </a>
                                <a href="https://www.youtube.com/channel/UC5M2PJGf2XKLZcIresf_MYw" className="text-slate-400 hover:text-white transition-colors">
                                    <i className="ph ph-youtube-logo text-base sm:text-xl"></i>
                                </a>
                            </div>
                        </div>

                        {/* TAUTAN JARAK DIRAPATKAN */}
                        <div className="md:col-span-2">
                            <h3 className="text-white font-semibold mb-2 sm:mb-4 text-xs sm:text-base">
                                Tautan
                            </h3>
                            <div className="grid grid-cols-1 gap-y-1.5 sm:gap-y-2">
                                <Link href="/" className="block text-[10px] sm:text-sm text-slate-400 hover:text-accent-400 transition-colors">Beranda</Link>
                                <Link href="/profil" className="block text-[10px] sm:text-sm text-slate-400 hover:text-accent-400 transition-colors">Profil</Link>
                                <Link href="/berita" className="block text-[10px] sm:text-sm text-slate-400 hover:text-accent-400 transition-colors">Berita</Link>
                                <Link href="/agenda" className="block text-[10px] sm:text-sm text-slate-400 hover:text-accent-400 transition-colors">Agenda</Link>
                                <Link href="/prestasi" className="block text-[10px] sm:text-sm text-slate-400 hover:text-accent-400 transition-colors">Prestasi</Link>
                                <Link href="/galeri-murid" className="block text-[10px] sm:text-sm text-slate-400 hover:text-accent-400 transition-colors">Galeri Murid</Link>
                                <Link href="/ppdb" className="block text-[10px] sm:text-sm text-slate-400 hover:text-accent-400 transition-colors">PPDB</Link>
                                <Link href="/kontak" className="block text-[10px] sm:text-sm text-slate-400 hover:text-accent-400 transition-colors">Kontak</Link>
                                <Link href={auth.user ? "/admin" : "/login"} className="block text-[10px] sm:text-sm text-slate-400 hover:text-accent-400 transition-colors">Administrator</Link>
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <h3 className="text-white font-semibold mb-2 sm:mb-4 text-xs sm:text-base">
                                Kontak
                            </h3>
                            <ul className="space-y-2 sm:space-y-3 text-[10px] sm:text-sm text-slate-400">
                                <li className="flex items-start gap-1.5 sm:gap-2">
                                    <i className="ph ph-map-pin text-accent-400 mt-0.5"></i>
                                    <span className="leading-snug">Jl. Raya Watestanjung, Desa Watestanjung</span>
                                </li>
                                <li className="flex items-start gap-1.5 sm:gap-2">
                                    <i className="ph ph-phone text-accent-400 mt-0.5"></i>
                                    <span>+62 895-0330-5937</span>
                                </li>
                                <li className="flex items-start gap-1.5 sm:gap-2">
                                    <i className="ph ph-envelope text-accent-400 mt-0.5"></i>
                                    <span className="break-all">smpislamwatestanjung92@gmail.com</span>
                                </li>
                            </ul>
                        </div>

                        <div className="md:col-span-3">
                            <h3 className="text-white font-semibold mb-2 sm:mb-4 text-xs sm:text-base">
                                Lokasi
                            </h3>
                            <div className="bg-slate-800 rounded-lg sm:rounded-xl h-20 sm:h-32 flex items-center justify-center text-slate-500 text-[10px] sm:text-sm text-center p-2">
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

                    <div className="mt-8 sm:mt-12 pt-5 sm:pt-8 border-t border-slate-800 text-center text-[10px] sm:text-sm text-slate-400">
                        <p>
                            © {new Date().getFullYear()} SMP Islam Watestanjung.
                            All Rights Reserved.
                        </p>
                        <p className="mt-1.5 sm:mt-2 text-[9px] sm:text-xs text-slate-500">
                            Supported by{" "}
                            <span className="font-semibold text-slate-300">
                                RPL SMK Krian 1 Sidoarjo
                            </span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}