
import { useEffect, useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    LockKey,
    Eye,
    EyeSlash,
    GraduationCap,
    ArrowLeft,
    CheckCircle,
    CircleNotch,
} from '@phosphor-icons/react';

export default function ResetPassword({ token, email, status }) {
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        token: token || '',
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    // Dark mode initialization
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        const isDark = saved === 'dark' || (!saved && prefersDark);

        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    // Dark mode toggle
    const toggleDark = () => {
        setDarkMode((prev) => {
            const next = !prev;

            document.documentElement.classList.toggle('dark', next);
            localStorage.setItem('theme', next ? 'dark' : 'light');

            return next;
        });
    };

    // Toast notification
    const showToast = (message, type = 'success') => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3500);
    };

    // Flash status
    useEffect(() => {
        if (status) {
            showToast(status, 'success');
        }
    }, [status]);

    // Submit reset password
    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onSuccess: () => {
                showToast(
                    'Password berhasil diperbarui. Silakan login kembali.',
                    'success'
                );

                reset('password', 'password_confirmation');
            },

            onError: () => {
                showToast(
                    'Gagal mengatur ulang password. Periksa kembali data Anda.',
                    'error'
                );
            },

            onFinish: () => {
                // Request selesai
            },
        });
    };

    const toastColors = {
        success: 'bg-primary-600 text-white',
        error: 'bg-red-600 text-white',
    };

    return (
        <>
            <Head title="Buat Password Baru - SMP Islam Watestanjung" />

            {/* Dark mode toggle */}
            <button
                type="button"
                onClick={toggleDark}
                className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                aria-label="Toggle dark mode"
            >
                <i className={`ph ${darkMode ? 'ph-sun' : 'ph-moon'} text-xl`} />
            </button>

            <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

                {/* Left Panel */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden islamic-pattern">

                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">

                        {/* Branding */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
                                <GraduationCap size={28} weight="bold" className="text-accent-400" />
                            </div>

                            <div>
                                <p className="font-display font-bold text-lg">
                                    SMP Islam Watestanjung
                                </p>
                                <p className="text-xs text-white/70">
                                    Unggul dalam Prestasi, Berakhlak Mulia
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="max-w-md">
                            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6">
                                <LockKey size={32} weight="bold" className="text-accent-400" />
                            </div>

                            <h1 className="font-display font-bold text-4xl xl:text-5xl leading-tight mb-6">
                                Buat Password
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
                                    Baru
                                </span>
                            </h1>

                            <p className="text-white/80 leading-relaxed">
                                Buat password baru yang kuat untuk melindungi
                                akun administrator website SMP Islam Watestanjung.
                            </p>

                            <ul className="mt-10 space-y-4">
                                <li className="flex items-center gap-3 text-sm">
                                    <CheckCircle size={20} className="text-accent-400" />
                                    Password baru lebih aman
                                </li>

                                <li className="flex items-center gap-3 text-sm">
                                    <CheckCircle size={20} className="text-accent-400" />
                                    Proses reset melalui email terdaftar
                                </li>

                                <li className="flex items-center gap-3 text-sm">
                                    <CheckCircle size={20} className="text-accent-400" />
                                    Akses kembali panel administrator
                                </li>
                            </ul>
                        </div>

                        <p className="text-xs text-white/50">
                            © {new Date().getFullYear()} SMP Islam Watestanjung.
                            All Rights Reserved.
                        </p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">

                    <div className="w-full max-w-md fade-in">

                        {/* Mobile Branding */}
                        <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
                            <div className="w-11 h-11 bg-primary-600 text-white rounded-xl flex items-center justify-center">
                                <GraduationCap size={26} weight="bold" />
                            </div>

                            <div>
                                <p className="font-display font-bold text-slate-900 dark:text-white">
                                    SMP Islam Watestanjung
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Panel Administrator
                                </p>
                            </div>
                        </div>

                        {/* Back */}
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-accent-400 transition-colors mb-8"
                        >
                            <ArrowLeft size={18} />
                            Kembali ke Login
                        </Link>

                        {/* Heading */}
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                Atur Ulang Password
                            </h2>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                Masukkan password baru untuk akun:
                            </p>

                            <p className="mt-2 text-sm font-semibold text-primary-600 dark:text-accent-400 break-all">
                                {data.email}
                            </p>
                        </div>

                        {/* Reset Form */}
                        <form onSubmit={submit} className="space-y-5">

                            {/* Hidden token and email */}
                            <input
                                type="hidden"
                                name="token"
                                value={data.token}
                            />

                            <input
                                type="hidden"
                                name="email"
                                value={data.email}
                            />

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                                >
                                    Password Baru
                                </label>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <LockKey size={20} />
                                    </div>

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Minimal 8 karakter"
                                        autoComplete="new-password"
                                        autoFocus
                                        required
                                        className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-900 border ${
                                            errors.password
                                                ? 'border-red-500'
                                                : 'border-slate-300 dark:border-slate-700'
                                        } rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword
                                            ? <EyeSlash size={20} />
                                            : <Eye size={20} />
                                        }
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Password Confirmation */}
                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                                >
                                    Konfirmasi Password Baru
                                </label>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <LockKey size={20} />
                                    </div>

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Ulangi password baru"
                                        autoComplete="new-password"
                                        required
                                        className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border ${
                                            errors.password
                                                ? 'border-red-500'
                                                : 'border-slate-300 dark:border-slate-700'
                                        } rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow`}
                                    />
                                </div>

                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-600/20 hover:shadow-primary-700/30 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <CircleNotch size={20} className="animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>
                                        Simpan Password Baru
                                        <CheckCircle size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-accent-400 transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Kembali ke Website
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast */}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toast && (
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${toastColors[toast.type]}`}>
                        <CheckCircle size={20} />
                        <span className="text-sm font-medium">
                            {toast.message}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
