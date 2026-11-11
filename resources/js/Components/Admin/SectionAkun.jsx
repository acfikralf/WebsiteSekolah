import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { EnvelopeSimple, PaperPlaneTilt, Trash, ArrowClockwise, User, Clock, CheckCircle } from '@phosphor-icons/react';

export default function SectionAkun({ invitations = [], users = [] }) {
    const [tab, setTab] = useState('profile'); // 'profile' | 'users' | 'invitations'

    // ==== Form profile sendiri ====
    const profileForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // ==== Form invite ====
    const inviteForm = useForm({
        email: '',
    });

    const submitInvite = (e) => {
        e.preventDefault();
        inviteForm.post(route('admin.invitations.send'), {
            preserveScroll: true,
            onSuccess: () => inviteForm.reset(),
        });
    };

    const resendInvite = (id) => {
        if (confirm('Kirim ulang undangan ini?')) {
            router.post(route('admin.invitations.resend', id), {}, { preserveScroll: true });
        }
    };

    const hapusInvite = (id) => {
        if (confirm('Batalkan undangan ini?')) {
            router.delete(route('admin.invitations.destroy', id), { preserveScroll: true });
        }
    };

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric',
        });

    return (
        <section id="section-akun" className="space-y-6">
            <div>
                <h2 className="text-xl font-display font-semibold mb-1">Akun & Pengguna</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Kelola akun pribadi Anda, undang admin baru, dan lihat daftar pengguna.
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800">
                {[
                    { key: 'profile', label: 'Profil Saya', icon: User },
                    { key: 'users', label: `Pengguna (${users.length})`, icon: CheckCircle },
                    { key: 'invitations', label: `Undangan (${invitations.length})`, icon: EnvelopeSimple },
                ].map((t) => {
                    const Icon = t.icon;
                    const isActive = tab === t.key;
                    return (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                                isActive
                                    ? 'border-primary-600 text-primary-600 dark:text-accent-400 dark:border-accent-400'
                                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                        >
                            <Icon size={18} />
                            {t.label}
                        </button>
                    );
                })}
            </div>

            {/* ===== TAB: PROFIL SAYA ===== */}
            {tab === 'profile' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 max-w-2xl">
                    <h3 className="font-display font-semibold mb-4">Profil Saya</h3>
                    <p className="text-sm text-slate-500 mb-4">
                        Untuk mengubah profil, buka halaman profile.
                    </p>
                    <a
                        href={route('profile.edit')}
                        className="inline-flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg"
                    >
                        <i className="ph ph-user-circle mr-2"></i>
                        Buka Pengaturan Profil
                    </a>
                </div>
            )}

            {/* ===== TAB: PENGGUNA ===== */}
            {tab === 'users' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-left">
                                    <th className="px-4 py-3 font-medium">#</th>
                                    <th className="px-4 py-3 font-medium">Nama</th>
                                    <th className="px-4 py-3 font-medium">Email</th>
                                    <th className="px-4 py-3 font-medium">Bergabung</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-6 text-center text-slate-500">
                                            Belum ada pengguna.
                                        </td>
                                    </tr>
                                )}
                                {users.map((u, idx) => (
                                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-4 py-3">{idx + 1}</td>
                                        <td className="px-4 py-3 font-medium flex items-center gap-2">
                                            <div className="w-8 h-8 bg-primary-100 dark:bg-slate-800 text-primary-700 dark:text-accent-400 rounded-full flex items-center justify-center text-xs font-semibold">
                                                {u.name.charAt(0).toUpperCase()}
                                            </div>
                                            {u.name}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{u.email}</td>
                                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                                            {formatDate(u.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ===== TAB: UNDANGAN ===== */}
            {tab === 'invitations' && (
                <div className="space-y-6">
                    {/* Form Invite */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="font-display font-semibold mb-1 flex items-center gap-2">
                            <PaperPlaneTilt size={20} className="text-primary-600 dark:text-accent-400" />
                            Undang Admin Baru
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            Kirim undangan via email. Penerima akan menerima tautan untuk membuat akun.
                        </p>

                        <form onSubmit={submitInvite} className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <EnvelopeSimple size={20} />
                                </div>
                                <input
                                    type="email"
                                    value={inviteForm.data.email}
                                    onChange={(e) => inviteForm.setData('email', e.target.value)}
                                    placeholder="email@contoh.com"
                                    className="w-full pl-11 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={inviteForm.processing || !inviteForm.data.email}
                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60 transition-colors"
                            >
                                {inviteForm.processing ? (
                                    <>
                                        <i className="ph ph-circle-notch animate-spin"></i> Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <PaperPlaneTilt size={18} weight="fill" /> Kirim Undangan
                                    </>
                                )}
                            </button>
                        </form>

                        {inviteForm.errors.email && (
                            <p className="text-xs text-red-600 mt-2">{inviteForm.errors.email}</p>
                        )}
                    </div>

                    {/* List Undangan */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                            <h4 className="font-display font-semibold text-sm">
                                Undangan Menunggu Konfirmasi
                            </h4>
                        </div>

                        {invitations.length === 0 ? (
                            <p className="px-4 py-8 text-center text-sm text-slate-500">
                                Belum ada undangan yang menunggu.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-left">
                                            <th className="px-4 py-3 font-medium">Email</th>
                                            <th className="px-4 py-3 font-medium">Dikirim oleh</th>
                                            <th className="px-4 py-3 font-medium">Berlaku hingga</th>
                                            <th className="px-4 py-3 font-medium">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                        {invitations.map((inv) => (
                                            <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <EnvelopeSimple size={16} className="text-slate-400" />
                                                        <span className="font-medium">{inv.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                                                    {inv.inviter || '-'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex items-center gap-1 text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full">
                                                        <Clock size={12} /> {inv.expires_at}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => resendInvite(inv.id)}
                                                            title="Kirim ulang"
                                                            className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                                                        >
                                                            <ArrowClockwise size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => hapusInvite(inv.id)}
                                                            title="Batalkan"
                                                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                                                        >
                                                            <Trash size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}