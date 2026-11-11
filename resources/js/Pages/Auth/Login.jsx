import { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const [showForgot, setShowForgot] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState(null);

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

    // ==== Toast helper ====
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // ==== Login form ====
    const loginForm = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submitLogin = (e) => {
        e.preventDefault();
        loginForm.post(route('login'), {
            onSuccess: () => {
                showToast('Login berhasil! Mengalihkan ke dashboard...', 'success');
            },
        });
    };

    // ==== Forgot form ====
    const forgotForm = useForm({
        email: '',
    });

    const submitForgot = (e) => {
        e.preventDefault();
        forgotForm.post(route('password.email'), {
            onSuccess: () => {
                showToast('Tautan reset telah dikirim ke email Anda.', 'success');
                forgotForm.reset();
            },
        });
    };

    // ==== Status flash dari Laravel (mis. setelah reset password) ====
    useEffect(() => {
        if (status) {
            showToast(status, 'success');
        }
    }, [status]);

    const toastColors = {
        success: 'bg-primary-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-slate-800 text-white',
    };
    const toastIcons = {
        success: 'ph-check-circle',
        error: 'ph-x-circle',
        info: 'ph-info',
    };

    return (
        <>
            <Head title={showForgot ? 'Lupa Password - SMP Islam Watestanjung' : 'Login Admin - SMP Islam Watestanjung'} />

            {/* Dark mode toggle (floating) */}
            <button
                onClick={toggleDark}
                className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                aria-label="Toggle dark mode"
            >
                <i className={`ph ${darkMode ? 'ph-sun' : 'ph-moon'} text-xl`}></i>
            </button>

            {/* ============================== */}
            {/* LOGIN PAGE                     */}
            {/* ============================== */}
            {!showForgot && (
                <div id="page-login" className="min-h-screen flex">
                    {/* Left panel */}
                    <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden ">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl "></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
                                    <i className="ph ph-graduation-cap text-2xl text-accent-400"></i>
                                </div>
                                <div>
                                    <p className="font-display font-bold text-lg">SMP Islam Watestanjung</p>
                                    <p className="text-xs text-white/70">Unggul dalam Prestasi, Berakhlak Mulia</p>
                                </div>
                            </div>

                            <div className="max-w-md">
                                <h1 className="font-display font-bold text-4xl xl:text-5xl leading-tight mb-6">
                                    Selamat Datang<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">Kembali</span>
                                </h1>
                                <p className="text-white/80 leading-relaxed">
                                    Kelola konten website sekolah dengan mudah melalui panel admin SMP Islam Watestanjung.
                                </p>

                                <ul className="mt-10 space-y-4">
                                    <li className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center shrink-0">
                                            <i className="ph ph-newspaper text-accent-400"></i>
                                        </div>
                                        Kelola berita, agenda, dan prestasi
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center shrink-0">
                                            <i className="ph ph-images text-accent-400"></i>
                                        </div>
                                        Upload galeri dan dokumen sekolah
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center shrink-0">
                                            <i className="ph ph-shield-check text-accent-400"></i>
                                        </div>
                                        Aman dan mudah digunakan
                                    </li>
                                </ul>
                            </div>

                            <p className="text-xs text-white/50">
                                © {new Date().getFullYear()} SMP Islam Watestanjung. All Rights Reserved.
                            </p>
                        </div>
                    </div>

                    {/* Right panel: form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white dark:bg-slate-950 transition-colors duration-300">
                        <div className="w-full max-w-md fade-in">
                            {/* Mobile logo */}
                            <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                                <div className="w-11 h-11 bg-primary-600 text-white rounded-xl flex items-center justify-center">
                                    <i className="ph ph-graduation-cap text-2xl"></i>
                                </div>
                                <div>
                                    <p className="font-display font-bold text-slate-900 dark:text-white">SMP Islam Watestanjung</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Panel Admin</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                    Login Admin
                                </h2>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    Masukkan email dan password Anda untuk mengakses dashboard.
                                </p>
                            </div>

                            <form onSubmit={submitLogin} className="space-y-5" noValidate>
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <i className="ph ph-envelope text-lg"></i>
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={loginForm.data.email}
                                            onChange={(e) => loginForm.setData('email', e.target.value)}
                                            placeholder="admin@watestanjung.sch.id"
                                            className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border ${
                                                loginForm.errors.email
                                                    ? 'border-red-500 dark:border-red-500'
                                                    : 'border-slate-300 dark:border-slate-700'
                                            } rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow`}
                                            autoComplete="username"
                                        />
                                    </div>
                                    {loginForm.errors.email && (
                                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{loginForm.errors.email}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowForgot(true)}
                                            className="text-xs font-medium text-primary-600 dark:text-accent-400 hover:text-primary-700 dark:hover:text-accent-300 transition-colors"
                                        >
                                            Lupa password?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <i className="ph ph-lock text-lg"></i>
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            value={loginForm.data.password}
                                            onChange={(e) => loginForm.setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-900 border ${
                                                loginForm.errors.password
                                                    ? 'border-red-500 dark:border-red-500'
                                                    : 'border-slate-300 dark:border-slate-700'
                                            } rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow`}
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                            aria-label="Toggle password visibility"
                                        >
                                            <i className={`ph ${showPassword ? 'ph-eye-slash' : 'ph-eye'} text-lg`}></i>
                                        </button>
                                    </div>
                                    {loginForm.errors.password && (
                                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{loginForm.errors.password}</p>
                                    )}
                                </div>

                                {/* Remember me */}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={loginForm.data.remember}
                                        onChange={(e) => loginForm.setData('remember', e.target.checked)}
                                        className="w-4 h-4 text-primary-600 border-slate-300 dark:border-slate-600 rounded focus:ring-primary-500 dark:bg-slate-800"
                                    />
                                    <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                                        Ingat saya di perangkat ini
                                    </label>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loginForm.processing}
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-600/20 hover:shadow-primary-700/30 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                >
                                    <span>{loginForm.processing ? 'Memproses...' : 'Masuk'}</span>
                                    <i className={`ph ${loginForm.processing ? 'ph-circle-notch animate-spin' : 'ph-arrow-right'} text-lg`}></i>
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-accent-400 transition-colors"
                                >
                                    <i className="ph ph-arrow-left"></i>
                                    Kembali ke Website
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================== */}
            {/* FORGOT PASSWORD PAGE           */}
            {/* ============================== */}
            {showForgot && (
                <div id="page-forgot" className="min-h-screen flex">
                    {/* Left panel */}
                    <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden ">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
                                    <i className="ph ph-graduation-cap text-2xl text-accent-400"></i>
                                </div>
                                <div>
                                    <p className="font-display font-bold text-lg">SMP Islam Watestanjung</p>
                                    <p className="text-xs text-white/70">Unggul dalam Prestasi, Berakhlak Mulia</p>
                                </div>
                            </div>

                            <div className="max-w-md">
                                <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6">
                                    <i className="ph ph-key text-3xl text-accent-400"></i>
                                </div>
                                <h1 className="font-display font-bold text-4xl xl:text-5xl leading-tight mb-6">
                                    Lupa<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">Password?</span>
                                </h1>
                                <p className="text-white/80 leading-relaxed">
                                    Jangan khawatir. Masukkan email terdaftar Anda dan kami akan mengirimkan tautan untuk mengatur ulang password.
                                </p>
                            </div>

                            <p className="text-xs text-white/50">
                                © {new Date().getFullYear()} SMP Islam Watestanjung. All Rights Reserved.
                            </p>
                        </div>
                    </div>

                    {/* Right panel: form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white dark:bg-slate-950 transition-colors duration-300">
                        <div className="w-full max-w-md fade-in">
                            {/* Mobile logo */}
                            <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                                <div className="w-11 h-11 bg-primary-600 text-white rounded-xl flex items-center justify-center">
                                    <i className="ph ph-graduation-cap text-2xl"></i>
                                </div>
                                <div>
                                    <p className="font-display font-bold text-slate-900 dark:text-white">SMP Islam Watestanjung</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Panel Admin</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowForgot(false)}
                                className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-accent-400 transition-colors mb-6"
                            >
                                <i className="ph ph-arrow-left"></i>
                                Kembali ke Login
                            </button>

                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                    Reset Password
                                </h2>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    Masukkan email yang terdaftar. Kami akan mengirimkan tautan reset password ke email tersebut.
                                </p>
                            </div>

                            <form onSubmit={submitForgot} className="space-y-5" noValidate>
                                <div>
                                    <label htmlFor="forgotEmail" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Email Terdaftar
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <i className="ph ph-envelope text-lg"></i>
                                        </div>
                                        <input
                                            type="email"
                                            id="forgotEmail"
                                            name="email"
                                            value={forgotForm.data.email}
                                            onChange={(e) => forgotForm.setData('email', e.target.value)}
                                            placeholder="admin@watestanjung.sch.id"
                                            className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border ${
                                                forgotForm.errors.email
                                                    ? 'border-red-500 dark:border-red-500'
                                                    : 'border-slate-300 dark:border-slate-700'
                                            } rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow`}
                                            autoComplete="username"
                                        />
                                    </div>
                                    {forgotForm.errors.email && (
                                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{forgotForm.errors.email}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={forgotForm.processing}
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-600/20 hover:shadow-primary-700/30 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                >
                                    <span>{forgotForm.processing ? 'Mengirim...' : 'Kirim Tautan Reset'}</span>
                                    <i className={`ph ${forgotForm.processing ? 'ph-circle-notch animate-spin' : 'ph-paper-plane-tilt'} text-lg`}></i>
                                </button>
                            </form>

                            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                                <div className="flex gap-3">
                                    <i className="ph ph-info text-primary-600 dark:text-accent-400 text-xl shrink-0 mt-0.5"></i>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Jika email tidak terdaftar, Anda tidak akan menerima tautan reset. Hubungi administrator sekolah jika memerlukan bantuan lebih lanjut.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-accent-400 transition-colors"
                                >
                                    <i className="ph ph-arrow-left"></i>
                                    Kembali ke Website
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast container */}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toast && (
                    <div className={`toast flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${toastColors[toast.type]}`}>
                        <i className={`ph ${toastIcons[toast.type]} text-xl`}></i>
                        <span className="text-sm font-medium">{toast.message}</span>
                    </div>
                )}
            </div>
        </>
    );
}