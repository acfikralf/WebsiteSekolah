import { useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';

export default function SectionAkun() {
    const { auth } = usePage().props;
    const user = auth?.user || {};

    const { data, setData, patch, processing, errors, recentlySuccessful, reset } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
    });

    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => reset('password', 'password_confirmation'),
            onError: (errs) => {
                if (errs.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errs.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section id="section-akun">
            <h2 className="text-xl font-display font-semibold mb-6">Admin</h2>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 max-w-md">
                <form onSubmit={submit} className="space-y-4">
                    {/* Nama */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Nama</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Baru */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password Baru <span className="text-slate-400 font-normal">(biarkan kosong jika tidak diubah)</span>
                        </label>
                        <input
                            ref={passwordInput}
                            type="password"
                            placeholder="••••••••"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.password}</p>
                        )}
                    </div>

                    {/* Konfirmasi Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Konfirmasi Password Baru</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    {/* Current Password (hanya muncul kalau ganti password) */}
                    {data.password && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Password Saat Ini</label>
                            <input
                                ref={currentPasswordInput}
                                type="password"
                                placeholder="••••••••"
                                onChange={(e) => setData('current_password', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            {errors.current_password && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.current_password}</p>
                            )}
                        </div>
                    )}

                    {/* Tombol */}
                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
                        >
                            {processing ? 'Menyimpan...' : 'Perbarui'}
                        </button>
                        {recentlySuccessful && (
                            <span className="text-sm text-primary-600 dark:text-accent-400">
                                ✓ Tersimpan
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}