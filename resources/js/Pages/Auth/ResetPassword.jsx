import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { LockKey, Eye, EyeSlash } from '@phosphor-icons/react';

export default function ResetPassword({ token, email }) {
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    // Dark mode init
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Buat Password Baru - SMP Islam Watestanjung" />
            
            <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950">
                {/* Left Panel (Branding) */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden islamic-pattern">
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
                                <i className="ph ph-lock-key-open text-3xl text-accent-400"></i>
                            </div>
                            <h1 className="font-display font-bold text-4xl xl:text-5xl leading-tight mb-6">
                                Buat Password<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">Baru</span>
                            </h1>
                            <p className="text-white/80 leading-relaxed">
                                Silakan buat password baru yang kuat dan mudah Anda ingat untuk mengamankan akun Anda.
                            </p>
                        </div>

                        <p className="text-xs text-white/50">
                            © {new Date().getFullYear()} SMP Islam Watestanjung. All Rights Reserved.
                        </p>
                    </div>
                </div>

                {/* Right Panel (Form) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative">
                    <div className="w-full max-w-md fade-in">
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                Atur Ulang Password
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                Masukkan password baru untuk email <strong>{email}</strong>.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Hidden Inputs untuk Token dan Email */}
                            <input type="hidden" value={data.token} />
                            <input type="hidden" value={data.email} />

                            {/* Password Baru */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                    Password Baru
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <LockKey size={20} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Minimal 8 karakter"
                                        className="w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500"
                                        required
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-xs text-red-600 mt-1.5">{errors.password}</p>}
                            </div>

                            {/* Konfirmasi Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                    Konfirmasi Password Baru
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <LockKey size={20} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Ulangi password baru"
                                        className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500"
                                        required
                                    />
                                </div>
                                {errors.password_confirmation && <p className="text-xs text-red-600 mt-1.5">{errors.password_confirmation}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg transition-all disabled:opacity-60"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Password Baru'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}