import { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Modal';
import { 
    FloppyDisk, User, LockKey, CheckCircle, 
    Warning, Trash, X 
} from '@phosphor-icons/react';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;

    // ==== Form Update Profil ====
    const profileForm = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    // ==== Form Update Password ====
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
            onError: () => {
                if (passwordForm.errors.password) {
                    passwordForm.reset('password', 'password_confirmation');
                }
                if (passwordForm.errors.current_password) {
                    passwordForm.reset('current_password');
                }
            },
        });
    };

    // ==== State & Form Hapus Akun ====
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const deleteForm = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();
        deleteForm.delete(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => setShowDeleteModal(false),
            onError: () => {
                // Jika password salah, biarkan modal terbuka
            },
        });
    };

    return (
        <AdminLayout 
            title="Pengaturan Akun" 
            activeSection="akun" 
            onSectionChange={() => {}} 
        >
            <div className="max-w-3xl space-y-6">
                
                {/* Header Info */}
                <div>
                    <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white">Akun Admin</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Perbarui informasi profil dan keamanan akun Anda.
                    </p>
                </div>

                {/* Card 1: Update Profil */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <User size={20} className="text-primary-600 dark:text-accent-400" />
                        <h3 className="font-display font-semibold text-slate-900 dark:text-white">Informasi Profil</h3>
                    </div>

                    <form onSubmit={submitProfile} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                value={profileForm.data.name}
                                onChange={(e) => profileForm.setData('name', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                                required
                            />
                            {profileForm.errors.name && <p className="text-xs text-red-600 mt-1">{profileForm.errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) => profileForm.setData('email', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                                required
                            />
                            {profileForm.errors.email && <p className="text-xs text-red-600 mt-1">{profileForm.errors.email}</p>}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={profileForm.processing}
                                className="inline-flex items-center gap-2 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60 transition-colors"
                            >
                                <FloppyDisk size={18} weight="fill" />
                                {profileForm.processing ? 'Menyimpan...' : 'Simpan Profil'}
                            </button>
                            {profileForm.recentlySuccessful && (
                                <span className="text-sm text-primary-600 dark:text-accent-400 flex items-center gap-1">
                                    <CheckCircle size={16} weight="fill" /> Tersimpan
                                </span>
                            )}
                        </div>
                    </form>
                </div>

                {/* Card 2: Update Password */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <LockKey size={20} className="text-primary-600 dark:text-accent-400" />
                        <h3 className="font-display font-semibold text-slate-900 dark:text-white">Perbarui Password</h3>
                    </div>

                    <form onSubmit={submitPassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Password Saat Ini</label>
                            <input
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                                autoComplete="current-password"
                                required
                            />
                            {passwordForm.errors.current_password && <p className="text-xs text-red-600 mt-1">{passwordForm.errors.current_password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Password Baru</label>
                            <input
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                                autoComplete="new-password"
                                required
                            />
                            {passwordForm.errors.password && <p className="text-xs text-red-600 mt-1">{passwordForm.errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Konfirmasi Password Baru</label>
                            <input
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                                autoComplete="new-password"
                                required
                            />
                            {passwordForm.errors.password_confirmation && <p className="text-xs text-red-600 mt-1">{passwordForm.errors.password_confirmation}</p>}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="inline-flex items-center gap-2 px-5 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-sm font-medium rounded-lg disabled:opacity-60 transition-colors"
                            >
                                <LockKey size={18} />
                                {passwordForm.processing ? 'Memperbarui...' : 'Perbarui Password'}
                            </button>
                            {passwordForm.recentlySuccessful && (
                                <span className="text-sm text-primary-600 dark:text-accent-400 flex items-center gap-1">
                                    <CheckCircle size={16} weight="fill" /> Password Diperbarui
                                </span>
                            )}
                        </div>
                    </form>
                </div>

                {/* Card 3: Hapus Akun */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-red-200 dark:border-red-900/30 p-6">
                    <div className="flex items-center gap-2 mb-4 border-b border-red-100 dark:border-red-900/30 pb-3">
                        <Warning size={20} className="text-red-600 dark:text-red-400" />
                        <h3 className="font-display font-semibold text-red-600 dark:text-red-400">Hapus Akun</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Sebelum menghapus akun, harap unduh data atau informasi apa pun yang ingin Anda simpan.
                    </p>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        <Trash size={18} /> Hapus Akun Saya
                    </button>
                </div>

            </div>

            {/* Modal Konfirmasi Hapus Akun */}
            <Modal 
                show={showDeleteModal} 
                onClose={() => setShowDeleteModal(false)} 
                title="Apakah Anda yakin ingin menghapus akun?"
                maxWidth="max-w-md"
            >
                <form onSubmit={deleteUser} className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Tindakan ini tidak dapat dibatalkan. Masukkan password Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun ini secara permanen.
                    </p>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={deleteForm.data.password}
                            onChange={(e) => deleteForm.setData('password', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-red-500"
                            placeholder="Masukkan password Anda"
                            autoFocus
                            required
                        />
                        {deleteForm.errors.password && <p className="text-xs text-red-600 mt-1">{deleteForm.errors.password}</p>}
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(false)}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={deleteForm.processing}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg disabled:opacity-60"
                        >
                            {deleteForm.processing ? 'Menghapus...' : 'Hapus Akun'}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}