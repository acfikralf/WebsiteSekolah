import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function SectionGaleri({ galeris = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [previews, setPreviews] = useState([]);

    const { data, setData, post, processing, reset, errors } = useForm({
        judul: '',
        kategori: '',
        urutan: 0,
        gambar: [],       // array File untuk multi-upload
        _method: 'post',
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setPreviews([]);
        setShowForm(true);
    };

    const openEdit = (item) => {
        setData({
            judul: item.judul || '',
            kategori: item.kategori || '',
            urutan: item.urutan || 0,
            gambar: null,
            _method: 'put',
        });
        setEditing(item);
        setPreviews([]);
        setShowForm(true);
    };

    const closeModal = () => {
        setShowForm(false);
        setPreviews([]);
        reset();
        setEditing(null);
    };

    const handleMultiUpload = (e) => {
        const files = Array.from(e.target.files);
        setData('gambar', files);
        setPreviews(files.map((f) => URL.createObjectURL(f)));
    };

    const handleSingleUpload = (e) => {
        const file = e.target.files[0];
        setData('gambar', file);
        setPreviews(file ? [URL.createObjectURL(file)] : []);
    };

    const submit = (e) => {
        e.preventDefault();
        const url = editing
            ? route('admin.galeri.update', editing.id)
            : route('admin.galeri.store');

        post(url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const hapus = (id) => {
        if (confirm('Yakin ingin menghapus gambar ini?')) {
            router.delete(route('admin.galeri.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <section id="section-galeri">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">Galeri</h2>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <i className="ph ph-plus mr-1"></i> Tambah Gambar
                </button>
            </div>

            {/* Grid galeri */}
            {galeris.length === 0 ? (
                <p className="text-center text-slate-500 py-8">Belum ada gambar galeri.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galeris.map((item) => (
                        <div key={item.id} className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <img
                                src={item.gambar_url}
                                alt={item.judul || 'Galeri'}
                                className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 text-center">
                                {item.judul && (
                                    <p className="text-white text-xs font-medium line-clamp-2">{item.judul}</p>
                                )}
                                {item.kategori && (
                                    <span className="text-[10px] bg-accent-500 text-white px-2 py-0.5 rounded-full">
                                        {item.kategori}
                                    </span>
                                )}
                                <div className="flex gap-2 mt-1">
                                    <button onClick={() => openEdit(item)} className="p-1.5 bg-white rounded-full text-slate-700 hover:bg-slate-100" title="Edit">
                                        <i className="ph ph-pencil-simple"></i>
                                    </button>
                                    <button onClick={() => hapus(item.id)} className="p-1.5 bg-white rounded-full text-red-600 hover:bg-red-50" title="Hapus">
                                        <i className="ph ph-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Form Galeri */}
            <Modal
                show={showForm}
                onClose={closeModal}
                title={editing ? 'Edit Gambar Galeri' : 'Tambah Gambar Galeri'}
            >
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Judul / Caption</label>
                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) => setData('judul', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Kategori</label>
                        <select
                            value={data.kategori}
                            onChange={(e) => setData('kategori', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">-- Pilih --</option>
                            <option value="Kegiatan">Kegiatan</option>
                            <option value="Keagamaan">Keagamaan</option>
                            <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                            <option value="Olahraga">Olahraga</option>
                            <option value="Seni">Seni</option>
                            <option value="Akademik">Akademik</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Urutan</label>
                        <input
                            type="number"
                            value={data.urutan}
                            onChange={(e) => setData('urutan', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            {editing ? 'Ganti Gambar (opsional)' : 'Upload Gambar (Bisa banyak sekaligus)'}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple={!editing}
                            onChange={editing ? handleSingleUpload : handleMultiUpload}
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-slate-800 dark:file:text-slate-300"
                        />
                        {errors.gambar && <p className="text-xs text-red-600 mt-1">{errors.gambar}</p>}
                    </div>

                    {/* Preview Image di dalam Modal */}
                    {(previews.length > 0 || (editing?.gambar_url && previews.length === 0)) && (
                        <div className="md:col-span-2 mt-2">
                            <p className="text-xs font-medium text-slate-500 mb-2">Preview:</p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                {previews.length > 0
                                    ? previews.map((src, i) => (
                                        <img key={i} src={src} alt="Preview" className="w-full h-20 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
                                    ))
                                    : editing?.gambar_url && (
                                        <img src={editing.gambar_url} alt="Current" className="w-full h-20 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
                                    )
                                }
                            </div>
                        </div>
                    )}

                    <div className="md:col-span-2 flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button type="button" onClick={closeModal} className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                            Batal
                        </button>
                        <button type="submit" disabled={processing} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60">
                            {processing ? 'Mengunggah...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}