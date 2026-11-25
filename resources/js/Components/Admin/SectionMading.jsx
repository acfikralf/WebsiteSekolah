import { useState } from 'react';
import { router } from '@inertiajs/react';
import { 
    CheckCircle, Trash, Eye, FileText, User, 
    GraduationCap, X 
} from '@phosphor-icons/react';
import ConfirmModal from '@/Components/ConfirmModal';

export default function SectionMading({ madings = [] }) {
    // State untuk Konfirmasi Hapus
    const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });
    const [isDeleting, setIsDeleting] = useState(false);

    // State untuk Preview Karya (Lightbox)
    const [previewMading, setPreviewMading] = useState(null);

    const approve = (id) => {
        router.post(route('admin.mading.approve', id), {}, { preserveScroll: true });
    };

    const handleDeleteClick = (id) => {
        setConfirmDelete({ show: true, id });
    };

    const executeDelete = () => {
        setIsDeleting(true);
        router.delete(route('admin.mading.destroy', confirmDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmDelete({ show: false, id: null });
                setIsDeleting(false);
            },
            onError: () => setIsDeleting(false)
        });
    };

    return (
        <section id="section-mading" className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white">Moderasi Mading Murid</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Tinjau dan setujui karya yang dikirim oleh murid sebelum tampil di halaman publik.
                    </p>
                </div>
            </div>

            {/* List Karya */}
            {madings.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-500">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Belum ada karya yang dikirim oleh murid.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {madings.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden hover:shadow-md transition-shadow group"
                        >
                            {/* Thumbnail Gambar (Atas) */}
                            <div 
                                className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 cursor-pointer overflow-hidden border-b border-slate-200 dark:border-slate-800" 
                                onClick={() => setPreviewMading(item)}
                            >
                                {item.gambar_url ? (
                                    <>
                                        <img 
                                            src={item.gambar_url} 
                                            alt={item.judul} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Eye size={32} className="text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                        <FileText size={40} className="mb-2 opacity-50" />
                                        <span className="text-sm font-medium">Karya Teks</span>
                                    </div>
                                )}
                                
                                {/* Badge Kategori di atas gambar */}
                                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                                    {item.kategori}
                                </span>
                            </div>

                            {/* Konten & Info (Bawah) */}
                            <div className="p-4 sm:p-5 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    {/* Status Badge */}
                                    {item.status === 'published' ? (
                                        <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full border border-green-200 flex items-center gap-1">
                                            <CheckCircle size={12} weight="fill" /> Tampil
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full border border-yellow-200">
                                            Pending
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white line-clamp-2 mb-2" title={item.judul}>
                                    {item.judul}
                                </h3>
                                
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                                        <User size={14} /> {item.nama_murid}
                                    </span>
                                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                                        <GraduationCap size={14} /> Kelas {item.kelas}
                                    </span>
                                </div>

                                {item.konten && (
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 italic font-serif mb-4">
                                        "{item.konten}"
                                    </p>
                                )}

                                {/* Aksi (Bawah) */}
                                <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                                    <button 
                                        onClick={() => setPreviewMading(item)}
                                        className="text-xs font-medium text-slate-500 hover:text-primary-600 flex items-center gap-1.5 transition-colors"
                                    >
                                        <Eye size={16} /> Baca Detail
                                    </button>

                                    <div className="flex gap-2">
                                        {item.status === 'pending' && (
                                            <button
                                                onClick={() => approve(item.id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 transition-colors"
                                            >
                                                <CheckCircle size={16} weight="bold" /> Setujui
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteClick(item.id)}
                                            className="inline-flex items-center justify-center p-1.5 text-red-600 bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 transition-colors"
                                            title="Hapus Karya"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Preview Karya */}
            {previewMading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm" onClick={() => setPreviewMading(null)}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                            <div>
                                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white line-clamp-1">{previewMading.judul}</h3>
                                <p className="text-sm text-slate-500 mt-0.5">{previewMading.nama_murid} • Kelas {previewMading.kelas}</p>
                            </div>
                            <button onClick={() => setPreviewMading(null)} className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 border shadow-sm shrink-0">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="overflow-y-auto">
                            {previewMading.gambar_url && (
                                <img src={previewMading.gambar_url} alt={previewMading.judul} className="w-full max-h-[50vh] object-contain bg-slate-100 dark:bg-slate-950" />
                            )}
                            {previewMading.konten && (
                                <div className="p-5 sm:p-6">
                                    <p className="whitespace-pre-line text-slate-700 dark:text-slate-300 leading-relaxed text-justify font-serif">
                                        {previewMading.konten}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Modal Hapus */}
            <ConfirmModal
                show={confirmDelete.show}
                onClose={() => setConfirmDelete({ show: false, id: null })}
                onConfirm={executeDelete}
                processing={isDeleting}
                message="Apakah Anda yakin ingin menghapus karya murid ini? Tindakan ini tidak dapat dibatalkan."
            />
        </section>
    );
}