import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import ConfirmModal from '@/Components/ConfirmModal';

export default function SectionPrestasi({ prestasis = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);

    // State Konfirmasi Hapus
    const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null, judul: '' });
    const [isDeleting, setIsDeleting] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        judul: '', siswa: '', kategori: '', tingkat: '', tanggal: '', deskripsi: '', foto: null, _method: 'post',
    });

    const openCreate = () => {
        reset(); setEditing(null); setPreviewFoto(null); setShowForm(true);
    };

    const openEdit = (item) => {
        setData({
            judul: item.judul, siswa: item.siswa || '', kategori: item.kategori || '', tingkat: item.tingkat || '', tanggal: item.tanggal?.slice(0, 10) || '', deskripsi: item.deskripsi || '', foto: null, _method: 'post',
        });
        setEditing(item); setPreviewFoto(item.foto ? `/storage/${item.foto}` : null); setShowForm(true);
    };

    const closeModal = () => {
        setShowForm(false); setPreviewFoto(null); reset(); setEditing(null);
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        setData('foto', file);
        if (file) setPreviewFoto(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();
        const url = editing ? route('admin.prestasi.update', editing.id) : route('admin.prestasi.store');
        post(url, { forceFormData: true, preserveScroll: true, onSuccess: () => closeModal() });
    };

    const handleDeleteClick = (item) => {
        setConfirmDelete({ show: true, id: item.id, judul: item.judul });
    };

    const executeDelete = () => {
        setIsDeleting(true);
        router.delete(route('admin.prestasi.destroy', confirmDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmDelete({ show: false, id: null, judul: '' });
                setIsDeleting(false);
            },
            onError: () => setIsDeleting(false)
        });
    };

    return (
        <section id="section-prestasi">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">Data Prestasi</h2>
                <button onClick={openCreate} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg">
                    <i className="ph ph-plus mr-1"></i> Tambah Prestasi
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs sm:text-sm">
                            <tr>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium hidden sm:table-cell">#</th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium">Foto</th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium">Judul</th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium hidden md:table-cell">Siswa</th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium hidden md:table-cell">Kategori</th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
                            {prestasis.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-4 py-6 text-center text-slate-500">Belum ada data prestasi.</td>
                                </tr>
                            )}
                            {prestasis.map((item, idx) => (
                                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">{idx + 1}</td>
                                    {/* Kolom Foto TIDAK disembunyikan (muncul di HP & Desktop) */}
                                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                                        {item.foto ? (
                                            <img src={`/storage/${item.foto}`} alt={item.judul} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg" />
                                        ) : (
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400">
                                                <i className="ph ph-image"></i>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium max-w-[120px] sm:max-w-xs truncate whitespace-normal">
                                        {item.judul}
                                        {/* Info Siswa & Kategori untuk Mobile */}
                                        <div className="md:hidden mt-1 flex flex-col gap-1">
                                            <span className="text-[10px] text-slate-500 truncate">{item.siswa}</span>
                                            <span className="text-[10px] bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 px-1.5 py-0.5 rounded-full w-max">{item.kategori}</span>
                                        </div>
                                    </td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">{item.siswa}</td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
                                        <span className="text-xs bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 px-2 py-1 rounded-full">{item.kategori}</span>
                                    </td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                                        <div className="flex justify-center gap-1 sm:gap-2">
                                            <button onClick={() => openEdit(item)} className="p-1 text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-md" title="Edit"><i className="ph ph-pencil-simple text-base sm:text-lg"></i></button>
                                            <button onClick={() => handleDeleteClick(item)} className="p-1 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-md" title="Hapus"><i className="ph ph-trash text-base sm:text-lg"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={showForm} onClose={closeModal} title={editing ? 'Edit Prestasi' : 'Tambah Prestasi'}>
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        <div className="w-32 h-24 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                            {previewFoto ? <img src={previewFoto} alt="Preview" className="w-full h-full object-cover" /> : <i className="ph ph-image text-3xl text-slate-400"></i>}
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium mb-1">Foto Prestasi</label>
                            <input type="file" accept="image/*" onChange={handleFotoChange} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-slate-800 dark:file:text-slate-300" />
                            {errors.foto && <p className="text-xs text-red-600 mt-1">{errors.foto}</p>}
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Judul Prestasi</label>
                        <input type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                        {errors.judul && <p className="text-xs text-red-600 mt-1">{errors.judul}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Siswa / Tim</label>
                        <input type="text" value={data.siswa} onChange={(e) => setData('siswa', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Kategori</label>
                        <select value={data.kategori} onChange={(e) => setData('kategori', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm">
                            <option value="">-- Pilih --</option>
                            <option value="Akademik">Akademik</option>
                            <option value="Seni">Seni</option>
                            <option value="Olahraga">Olahraga</option>
                            <option value="Keagamaan">Keagamaan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tingkat</label>
                        <input type="text" value={data.tingkat} onChange={(e) => setData('tingkat', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tanggal</label>
                        <input type="date" value={data.tanggal} onChange={(e) => setData('tanggal', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Deskripsi Singkat</label>
                        <textarea rows="3" value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"></textarea>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button type="button" onClick={closeModal} className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">Batal</button>
                        <button type="submit" disabled={processing} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60">{processing ? 'Menyimpan...' : 'Simpan'}</button>
                    </div>
                </form>
            </Modal>

            {/* CONFIRM MODAL */}
            <ConfirmModal
                show={confirmDelete.show}
                onClose={() => setConfirmDelete({ show: false, id: null, judul: '' })}
                onConfirm={executeDelete}
                processing={isDeleting}
                message={`Apakah Anda yakin ingin menghapus prestasi "${confirmDelete.judul}"? Data yang dihapus tidak dapat dikembalikan.`}
            />
        </section>
    );
}