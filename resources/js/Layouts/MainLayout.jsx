import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function MainLayout({ children }) {

    const { auth } = usePage().props;
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const newMode = !prev;
            document.documentElement.classList.toggle('dark', newMode);
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    };
    console.log(usePage());;

    const { site } = usePage().props || {};
    return (
        <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* NAVBAR */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-2 shrink-0 group">
                            <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center transition-all group-hover:rounded-lg group-hover:bg-primary-500">
                                <i className="ph ph-graduation-cap text-2xl"></i>
                            </div>
                            <div className="leading-tight">
                                <span className="block font-display font-bold text-slate-900 dark:text-white text-lg group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors">
                                    {site.title}
                                </span>
                                <span className="block text-xs text-slate-500 dark:text-slate-400">
                                    {site.tagline}
                                </span>
                            </div>
                        </a>

                        {/* Desktop nav */}
                        <div className="hidden lg:flex items-center gap-6">
                            <a href="#beranda" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Beranda</a>
                            <a href="#profil" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Profil</a>
                            <div className="relative group">
                                <button className="flex items-center gap-1 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400">
                                    Akademik
                                    <i className="ph ph-caret-down text-xs"></i>
                                </button>
                                <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-2 border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <a href="#guru" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600">Guru</a>
                                    <a href="#ekstrakurikuler" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600">Ekstrakurikuler</a>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="flex items-center gap-1 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400">
                                    Kesiswaan
                                    <i className="ph ph-caret-down text-xs"></i>
                                </button>
                                <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-2 border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <a href="#prestasi" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600">Prestasi</a>
                                    <a href="#galeri" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600">Galeri</a>
                                </div>
                            </div>
                            <a href="#berita" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Berita</a>
                            <a href="#agenda" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Agenda</a>
                            <a href="#ppdb" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">PPDB</a>
                            <a href="#kontak" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Kontak</a>
                            <button onClick={toggleDarkMode} className="p-2 text-slate-500 hover:text-primary-600 dark:hover:text-accent-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle dark mode">
                                <i className={`ph ${darkMode ? 'ph-sun' : 'ph-moon'} text-xl`}></i>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center gap-4 lg:hidden">
                            <button onClick={toggleDarkMode} className="p-2 text-slate-500 hover:text-primary-600 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle dark mode">
                                <i className={`ph ${darkMode ? 'ph-sun' : 'ph-moon'} text-xl`}></i>
                            </button>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-500 hover:text-primary-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle menu">
                                <i className="ph ph-list text-2xl"></i>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg">
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            <a href="#beranda" className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">Beranda</a>
                            <a href="#profil" className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">Profil</a>
                            <p className="px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white">Akademik</p>
                            <a href="#guru" className="block pl-6 pr-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">Guru</a>
                            <a href="#ekstrakurikuler" className="block pl-6 pr-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">Ekstrakurikuler</a>
                            <p className="px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white">Kesiswaan</p>
                            <a href="#prestasi" className="block pl-6 pr-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">Prestasi</a>
                            <a href="#galeri" className="block pl-6 pr-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">Galeri</a>
                            <a href="#berita" className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">Berita</a>
                            <a href="#agenda" className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">Agenda</a>
                            <a href="#ppdb" className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">PPDB</a>
                            <a href="#kontak" className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">Kontak</a>
                        </div>
                    </div>
                )}
            </header>

            {/* Konten utama */}
            <main>{children}</main>

            {/* FOOTER */}
            <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-primary-500 text-white rounded-xl flex items-center justify-center">
                                    <i className="ph ph-graduation-cap text-2xl"></i>
                                </div>
                                <span className="font-display font-bold text-white text-lg">SMP Islam Watestanjung</span>
                            </div>
                            <p className="text-sm leading-relaxed">Sekolah Islam yang mengintegrasikan pendidikan umum dengan nilai-nilai keislaman untuk membentuk generasi berilmu dan berakhlak mulia.</p>
                            <div className="flex space-x-4">
                                <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-white transition-colors"><i className="ph ph-instagram-logo text-xl"></i></a>
                                <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-white transition-colors"><i className="ph ph-facebook-logo text-xl"></i></a>
                                <a href="#" aria-label="YouTube" className="text-slate-400 hover:text-white transition-colors"><i className="ph ph-youtube-logo text-xl"></i></a>
                                <a href="#" aria-label="WhatsApp" className="text-slate-400 hover:text-white transition-colors"><i className="ph ph-whatsapp-logo text-xl"></i></a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Tautan</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#beranda" className="hover:text-accent-400 transition-colors">Beranda</Link></li>
                                <li><Link href="#profil" className="hover:text-accent-400 transition-colors">Profil</Link></li>
                                <li><Link href="#berita" className="hover:text-accent-400 transition-colors">Berita</Link></li>
                                <li><Link href="#agenda" className="hover:text-accent-400 transition-colors">Agenda</Link></li>
                                <li><Link href="#prestasi" className="hover:text-accent-400 transition-colors">Prestasi</Link></li>
                                <li><Link href="#galeri" className="hover:text-accent-400 transition-colors">Galeri</Link></li>
                                <li><Link href="#ppdb" className="hover:text-accent-400 transition-colors">PPDB</Link></li>
                                <li><Link href="#kontak" className="hover:text-accent-400 transition-colors">Kontak</Link></li>
                                <li><Link href={auth.user ? '/dashboard' : '/login'} className="hover:text-accent-400 transition-colors">Administrator</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Kontak</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2"><i className="ph ph-map-pin text-accent-400 mt-1"></i> Jl. Pendidikan No. 1, Watestanjung</li>
                                <li className="flex items-center gap-2"><i className="ph ph-phone text-accent-400"></i> +62 812-3456-7890</li>
                                <li className="flex items-center gap-2"><i className="ph ph-envelope text-accent-400"></i> info@watestanjung.sch.id</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Lokasi</h3>
                            <div className="bg-slate-800 rounded-xl h-32 flex items-center justify-center text-slate-500">Google Maps embed</div>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
                        © {new Date().getFullYear()} SMP Islam Watestanjung. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}