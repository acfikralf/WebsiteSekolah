import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { EnvelopeSimple, Lock, User, Eye, EyeSlash, WarningCircle, CheckCircle } from '@phosphor-icons/react';

export default function AcceptInvitation({ invitation = null, error = null }) {
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('invitation.accept.submit', invitation.token));
    };

    return (
        <>
            <Head title="Aktivasi Akun - SMP Islam Watestanjung" />

            <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950">
                {/* Left panel */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden islamic-pattern-white">
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
                                <CheckCircle size={32} className="text-accent-400" weight="fill" />
                            </div>
                            <h1 className="font-display font-bold text-4xl xl:text-5xl leading-tight mb-6">
                                Aktifkan<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">Akun Anda</span>
                            </h1>
                            <p className="text-white/80 leading-relaxed">
                                Terima kasih telah menerima undangan. Buat password untuk mengakses panel admin.
                            </p>
                        </div>

                        <p className="text-xs text-white/50">
                            © {new Date().getFullYear()} SMP Islam Watestanjung. All Rights Reserved.
                        </p>
                    </div>
                </div>

                {/* Right panel */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">
                    <div className="w-full max-w-md fade-in">
                        {/* Error state */}
                        {error ? (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 text-center">
                                <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
                                    <WarningCircle size={36} weight="fill" />
                                </div>
                                <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                                    Undangan Tidak Valid
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{error}</p>
                                <a
                                    href="/login"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg"
                                >
                                    <i className="ph ph-arrow-left"></i> Kembali ke Login
                                </a>
                            </div>
                        ) : (
                            <>
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
                                        Aktivasi Akun
                                    </h2>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        Lengkapi data di bawah ini untuk menyelesaikan pendaftaran.
                                    </p>
                                </div>

                                {/* Email (readonly) */}
                                <div className="mb-5">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <EnvelopeSimple size={20} />
                                        </div>
                                        <input
                                            type="email"
                                            value={invitation.email}
                                            readOnly
                                            className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-600 dark:text-slate-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <form onSubmit={submit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            Nama Lengkap
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <User size={20} />
                                            </div>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Nama Anda"
                                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                autoFocus
                                            />
                                        </div>
                                        {errors.name && <p className="text-xs text-red-600 mt-1.5">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <Lock size={20} />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Minimal 8 karakter"
                                                className="w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                            >
                                                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-xs text-red-600 mt-1.5">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            Konfirmasi Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <Lock size={20} />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="Ulangi password"
                                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 disabled:opacity-60"
                                    >
                                        {processing ? (
                                            <>
                                                <i className="ph ph-circle-notch animate-spin"></i> Memproses...
                                            </>
                                        ) : (
                                            <>
                                                Aktifkan Akun <i className="ph ph-arrow-right"></i>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}