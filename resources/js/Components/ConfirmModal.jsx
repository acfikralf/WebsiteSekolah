import { Warning } from '@phosphor-icons/react';
import Modal from '@/Components/Modal'; // Menggunakan Modal yang sudah kita buat sebelumnya

export default function ConfirmModal({
    show,
    onClose,
    onConfirm,
    title = 'Konfirmasi Hapus',
    message = 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.',
    processing = false,
    confirmText = 'Ya, Hapus',
}) {
    return (
        <Modal show={show} onClose={onClose} title={title} maxWidth="max-w-md">
            <div className="flex flex-col items-center text-center">
                {/* Icon Peringatan */}
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
                    <Warning size={32} weight="fill" />
                </div>

                {/* Pesan */}
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    {message}
                </p>

                {/* Tombol Aksi */}
                <div className="flex w-full gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                        className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-lg shadow-red-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {processing ? (
                            <>
                                <i className="ph ph-circle-notch animate-spin text-lg"></i>
                                Menghapus...
                            </>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}