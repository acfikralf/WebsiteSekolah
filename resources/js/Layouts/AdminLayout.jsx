import { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage} from '@inertiajs/react';



export default function AdminLayout({ children, activeSection, onSectionChange, title }) {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const  { user }  = usePage().props.auth
    console.log(user)

    // ==== Dark mode init ====
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDark = () => {
        setDarkMode((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle('dark', next);
            localStorage.setItem('theme', next ? 'dark' : 'light');
            return next;
        });
    };

    const { post } = useForm()

    const HandleLogout = () => {
        post(route('logout'))
    }
    

    // ==== Daftar menu sidebar ====
    const sections = {
        main: [
            { key: 'dashboard', label: 'Dashboard', icon: 'ph-squares-four' },
        ],
        konten: [
            { key: 'berita', label: 'Berita', icon: 'ph-newspaper' },
            { key: 'agenda', label: 'Agenda', icon: 'ph-calendar' },
            { key: 'prestasi', label: 'Prestasi', icon: 'ph-trophy' },
            { key: 'ekstrakurikuler', label: 'Ekstrakurikuler', icon: 'ph-tent' },
            { key: 'galeri', label: 'Galeri', icon: 'ph-images' },
            { key: 'polling', label: 'Polling', icon: 'ph-chart-bar' },
        ],
        sekolah: [
            { key: 'guru', label: 'Guru', icon: 'ph-users-three' },
            { key: 'statistik', label: 'Statistik', icon: 'ph-chart-line' },
            { key: 'profil', label: 'Profil Sekolah', icon: 'ph-graduation-cap' },
        ],
        pengaturan: [
            { key: 'pengaturan', label: 'Pengaturan Website', icon: 'ph-gear' },
            { key: 'akun', label: 'Akun Admin', icon: 'ph-user-circle' },
        ],
    };

    const handleNavClick = (key) => {
        onSectionChange(key);
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const NavLink = ({ item }) => {
        const isActive = activeSection === item.key;
        return (
            <button
                type="button"
                onClick={() => handleNavClick(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                        ? 'bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-accent-400'
                }`}
            >
                <i className={`ph ${item.icon} text-xl`}></i>
                {item.label}
            </button>
        );
    };

    return (
        <>
            <Head title={`${title} - Admin SMP Islam Watestanjung`} />

            <div className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
                <div className="min-h-screen flex">
                    {/* ===== SIDEBAR ===== */}
                    <aside
                        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform ${
                            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0 transition-transform duration-300 flex flex-col`}
                    >
                        {/* Logo */}
                        <Link href='/' className="h-16 flex items-center gap-2 px-6 border-b border-slate-200 dark:border-slate-800">
                            <div className="w-9 h-9 bg-primary-600 text-white rounded-lg flex items-center justify-center shrink-0">
                                <i className="ph ph-graduation-cap text-xl"></i>
                            </div>
                            <span className="font-display font-bold text-slate-900 dark:text-white text-sm leading-tight">
                                SMP Islam Watestanjung
                            </span>
                        </Link>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                            <NavLink item={sections.main[0]} />

                            <p className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Konten
                            </p>
                            {sections.konten.map((item) => (
                                <NavLink key={item.key} item={item} />
                            ))}

                            <p className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Sekolah
                            </p>
                            {sections.sekolah.map((item) => (
                                <NavLink key={item.key} item={item} />
                            ))}

                            <p className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Pengaturan
                            </p>
                            {sections.pengaturan.map((item) => (
                                <NavLink key={item.key} item={item} />
                            ))}
                        </nav>

                        {/* Sidebar footer */}
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                            <a
                                onClick={HandleLogout}
                                as="button"
                                className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-accent-400 w-full"
                            >
                                <i className="ph ph-sign-out text-xl"></i>
                                Logout
                            </a>
                        </div>
                    </aside>

                    {/* Overlay mobile */}
                    {sidebarOpen && (
                        <div
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        ></div>
                    )}

                    {/* ===== MAIN CONTENT ===== */}
                    <div className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0">
                        {/* Topbar */}
                        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setSidebarOpen(true)}
                                        className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        aria-label="Toggle sidebar"
                                    >
                                        <i className="ph ph-list text-2xl"></i>
                                    </button>
                                    <h1 className="text-lg md:text-xl font-display font-semibold text-slate-900 dark:text-white">
                                        {title}
                                    </h1>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={toggleDark}
                                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        aria-label="Toggle dark mode"
                                    >
                                        <i className={`ph ${darkMode ? 'ph-sun' : 'ph-moon'} text-xl`}></i>
                                    </button>
                                    <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
                                        <div className="w-8 h-8 bg-primary-100 dark:bg-slate-800 text-primary-700 dark:text-accent-400 rounded-full flex items-center justify-center">
                                            <i className="ph ph-user text-lg"></i>
                                        </div>
                                        <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Main content */}
                        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
                            {children}
                        </main>

                        {/* Footer */}
                        <footer className="py-4 px-6 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                            © {new Date().getFullYear()} Admin SMP Islam Watestanjung
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}