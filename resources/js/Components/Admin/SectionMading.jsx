import { useState } from 'react';
import { router } from '@inertiajs/react';
import { 
    CheckCircle, Trash, Eye, ImageSquare, 
    FileText, User, GraduationCap, X 
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
            {/* Header */}
            <div>
                <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white">Moderasi Mading Murid</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Tinjau dan setujui karya yang dikirim oleh murid sebelum tampil di halaman publik.
                </p>
            </div>

            {/* List Karya */}
            {madings.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-500">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Belum ada karya yang dikirim oleh murid.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {madings.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow"
                        >
                            {/* Thumbnail Gambar */}
                            <div className="sm:w-48 h-48 sm:h-auto shrink-0 bg-slate-100 dark:bg-slate-800 relative group cursor-pointer" onClick={() => setPreviewMading(item)}>
                                {item.gambar_url ? (
                                    <>
                                        <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Eye size={24} className="text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                        <FileText size={32} className="mb-2" />
                                        <span className="text-xs">Teks / Puisi</span>
                                    </div>
                                )}
                            </div>

                            {/* Konten & Info */}
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-slate-800 px-2 py-1 rounded-md">
                                        {item.kategori}
                                    </span>
                                    
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

                                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white line-clamp-1 mb-1" title={item.judul}>
                                    {item.judul}
                                </h3>
                                
                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                                    <span className="flex items-center gap-1"><User size={14} /> {item.nama_murid}</span>
                                    <span className="flex items-center gap-1"><GraduationCap size={14} /> Kelas {item.kelas}</span>
                                </div>

                                {item.konten && (
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 italic font-serif mb-4">
                                        "{item.konten}"
                                    </p>
                                )}

                                {/* Aksi */}
                                <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <button 
                                        onClick={() => setPreviewMading(item)}
                                        className="text-xs font-medium text-slate-500 hover:text-primary-600 flex items-center gap-1"
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
                        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                            <div>
                                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">{previewMading.judul}</h3>
                                <p className="text-sm text-slate-500">{previewMading.nama_murid} • Kelas {previewMading.kelas}</p>
                            </div>
                            <button onClick={() => setPreviewMading(null)} className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 border shadow-sm">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="overflow-y-auto">
                            {previewMading.gambar_url && (
                                <img src={previewMading.gambar_url} alt={previewMading.judul} className="w-full max-h-[50vh] object-contain bg-slate-100 dark:bg-slate-950" />
                            )}
                            {previewMading.konten && (
                                <div className="p-6">
                                    <p className="whitespace-pre-line text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
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