
import { useEffect, useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    EnvelopeSimple,
    Lock,
    User,
    Eye,
    EyeSlash,
    WarningCircle,
    CheckCircle,
    GraduationCap,
    ArrowLeft,
    CircleNotch,
} from '@phosphor-icons/react';

export default function AcceptInvitation({
    invitation = null,
    error = null,
}) {
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
    } = useForm({
        name: '',
        password: '',
        password_confirmation: '',
    });

    // ==============================
    // DARK MODE INITIALIZATION
    // ==============================
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        const isDark = saved === 'dark' || (!saved && prefersDark);

        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    // ==============================
    // DARK MODE TOGGLE
    // ==============================
    const toggleDark = () => {
        setDarkMode((prev) => {
            const next = !prev;

            document.documentElement.classList.toggle('dark', next);
            localStorage.setItem('theme', next ? 'dark' : 'light');

            return next;
        });
    };

    // ==============================
    // SUBMIT INVITATION
    // ==============================
    const submit = (e) => {
        e.preventDefault();

        if (!invitation?.token || processing) {
            return;
        }

        clearErrors();

        post(route('invitation.accept.submit', invitation.token), {
            preserveScroll: true,

            onError: (validationErrors) => {
                console.error(
                    'Invitation activation failed:',
                    validationErrors
                );
            },
        });
    };

    // ==============================
    // INVALID INVITATION
    // ==============================
    const invalidInvitation = Boolean(error || !invitation?.token);

    return (
        <>
            <Head title="Aktivasi Akun - SMP Islam Watestanjung" />

            {/* DARK MODE TOGGLE */}
            <button
                type="button"
                onClick={toggleDark}
                className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                aria-label="Toggle dark mode"
            >
                {darkMode ? (
                    <i className="ph ph-sun text-xl" />
                ) : (
                    <i className="ph ph-moon text-xl" />
                )}
            </button>

            <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

                {/* ============================== */}
                {/* LEFT PANEL */}
                {/* ============================== */}

                <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden islamic-pattern-white">

                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />

                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">

                        {/* BRANDING */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
                                <GraduationCap
                                    size={28}
                                    weight="bold"
                                    className="text-accent-400"
                                />
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

                        {/* DESCRIPTION */}
                        <div className="max-w-md">

                            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6">
                                <CheckCircle
                                    size={32}
                                    weight="fill"
                                    className="text-accent-400"
                                />
                            </div>

                            <h1 className="font-display font-bold text-4xl xl:text-5xl leading-tight mb-6">
                                Aktifkan
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
                                    Akun Anda
                                </span>
                            </h1>

                            <p className="text-white/80 leading-relaxed">
                                Terima kasih telah menerima undangan.
                                Buat password untuk mengakses panel
                                administrator SMP Islam Watestanjung.
                            </p>

                            <ul className="mt-10 space-y-4">

                                <li className="flex items-center gap-3 text-sm">
                                    <CheckCircle
                                        size={20}
                                        className="text-accent-400"
                                    />
                                    Aktivasi akun administrator
                                </li>

                                <li className="flex items-center gap-3 text-sm">
                                    <CheckCircle
                                        size={20}
                                        className="text-accent-400"
                                    />
                                    Password terlindungi dan aman
                                </li>

                                <li className="flex items-center gap-3 text-sm">
                                    <CheckCircle
                                        size={20}
                                        className="text-accent-400"
                                    />
                                    Akses penuh panel administrasi
                                </li>

                            </ul>
                        </div>

                        <p className="text-xs text-white/50">
                            © {new Date().getFullYear()} SMP Islam Watestanjung.
                            All Rights Reserved.
                        </p>
                    </div>
                </div>

                {/* ============================== */}
                {/* RIGHT PANEL */}
                {/* ============================== */}

                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">

                    <div className="w-full max-w-md fade-in">

                        {/* MOBILE BRANDING */}
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

                        {/* ============================== */}
                        {/* INVALID INVITATION */}
                        {/* ============================== */}

                        {invalidInvitation ? (

                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 text-center">

                                <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-5">
                                    <WarningCircle
                                        size={36}
                                        weight="fill"
                                    />
                                </div>

                                <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                                    Undangan Tidak Valid
                                </h2>

                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                                    {error || 'Undangan tidak ditemukan atau sudah kedaluwarsa.'}
                                </p>

                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-xl transition-colors"
                                >
                                    <ArrowLeft size={18} />
                                    Kembali ke Login
                                </Link>

                            </div>

                        ) : (

                            <>
                                {/* BACK BUTTON */}
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-accent-400 transition-colors mb-8"
                                >
                                    <ArrowLeft size={18} />
                                    Kembali ke Login
                                </Link>

                                {/* HEADING */}
                                <div className="mb-8">

                                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                        Aktivasi Akun
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Lengkapi data berikut untuk
                                        menyelesaikan pendaftaran
                                        akun administrator.
                                    </p>
                                </div>

                                {/* EMAIL */}
                                <div className="mb-5">

                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Email Terdaftar
                                    </label>

                                    <div className="relative">

                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <EnvelopeSimple size={20} />
                                        </div>

                                        <input
                                            type="email"
                                            value={invitation.email || ''}
                                            readOnly
                                            className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-600 dark:text-slate-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* ACTIVATION FORM */}
                                <form
                                    onSubmit={submit}
                                    className="space-y-5"
                                >

                                    {/* NAME */}
                                    <div>

                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                                        >
                                            Nama Lengkap
                                        </label>

                                        <div className="relative">

                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <User size={20} />
                                            </div>

                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Masukkan nama lengkap"
                                                autoComplete="name"
                                                autoFocus
                                                required
                                                className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border ${
                                                    errors.name
                                                        ? 'border-red-500'
                                                        : 'border-slate-300 dark:border-slate-700'
                                                } rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow`}
                                            />
                                        </div>

                                        {errors.name && (
                                            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* PASSWORD */}
                                    <div>

                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                                        >
                                            Password
                                        </label>

                                        <div className="relative">

                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <Lock size={20} />
                                            </div>

                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Minimal 8 karakter"
                                                autoComplete="new-password"
                                                required
                                                minLength={8}
                                                className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-900 border ${
                                                    errors.password
                                                        ? 'border-red-500'
                                                        : 'border-slate-300 dark:border-slate-700'
                                                } rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                                aria-label="Toggle password visibility"
                                            >
                                                {showPassword ? (
                                                    <EyeSlash size={20} />
                                                ) : (
                                                    <Eye size={20} />
                                                )}
                                            </button>
                                        </div>

                                        {errors.password && (
                                            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* CONFIRM PASSWORD */}
                                    <div>

                                        <label
                                            htmlFor="password_confirmation"
                                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                                        >
                                            Konfirmasi Password
                                        </label>

                                        <div className="relative">

                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <Lock size={20} />
                                            </div>

                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                id="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="Ulangi password"
                                                autoComplete="new-password"
                                                required
                                                className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-900 border ${
                                                    errors.password_confirmation
                                                        ? 'border-red-500'
                                                        : 'border-slate-300 dark:border-slate-700'
                                                } rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                                aria-label="Toggle confirmation password visibility"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeSlash size={20} />
                                                ) : (
                                                    <Eye size={20} />
                                                )}
                                            </button>
                                        </div>

                                        {errors.password_confirmation && (
                                            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                                                {errors.password_confirmation}
                                            </p>
                                        )}
                                    </div>

                                    {/* GENERAL ERROR */}
                                    {errors.email && (
                                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                            <p className="text-xs text-red-600 dark:text-red-400">
                                                {errors.email}
                                            </p>
                                        </div>
                                    )}

                                    {/* SUBMIT */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                    >
                                        {processing ? (
                                            <>
                                                <CircleNotch
                                                    size={20}
                                                    className="animate-spin"
                                                />
                                                Memproses Aktivasi...
                                            </>
                                        ) : (
                                            <>
                                                Aktifkan Akun
                                                <CheckCircle size={20} />
                                            </>
                                        )}
                                    </button>

                                </form>

                                {/* INFORMATION */}
                                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">

                                    <div className="flex gap-3">

                                        <WarningCircle
                                            size={20}
                                            className="text-primary-600 dark:text-accent-400 shrink-0"
                                        />

                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Pastikan nama dan password
                                            yang dimasukkan sudah benar.
                                            Setelah aktivasi berhasil,
                                            Anda dapat menggunakan email
                                            dan password tersebut untuk
                                            login ke panel administrator.
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* FOOTER */}
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
        </>
    );
}
