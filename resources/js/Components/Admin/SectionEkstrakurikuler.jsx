import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Plus, PencilSimple, Trash } from '@phosphor-icons/react';

export default function SectionEkstrakurikuler({ ekstrakurikulers }) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);

    const openCreate = () => {
        setEditing(null);
        setShowModal(true);
    };

    const openEdit = (item) => {
        setEditing(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditing(null);
    };

    const handleDelete = (item) => {
        if (!confirm(`Hapus ekstrakurikuler "${item.nama}"?`)) return;
        // pakai router dari inertia
        window.location; // placeholder
        import('@inertiajs/react').then(({ router }) => {
            router.delete(route('admin.ekstrakurikuler.destroy', item.id), {
                preserveScroll: true,
            });
        });
    };

    return (
        <section id="section-ekstrakurikuler">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">Ekstrakurikuler</h2>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <Plus size={16} className="mr-1" /> Tambah
                </button>
            </div>

            {ekstrakurikulers?.length === 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500">
                    Belum ada ekstrakurikuler. Klik "Tambah" untuk menambahkan.
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ekstrakurikulers?.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-4"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-400 rounded-lg flex items-center justify-center shrink-0">
                                <i className={`ph ${item.icon || 'ph-tent'} text-xl`}></i>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{item.nama}</p>
                                <p className="text-xs text-slate-500">Pembina: {item.pembina || '-'}</p>
                            </div>
                        </div>
                        {item.deskripsi && (
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{item.deskripsi}</p>
                        )}
                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={() => openEdit(item)}
                                className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                            >
                                <PencilSimple size={14} /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item)}
                                className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-red-50 dark:bg-red-900/30 text-red-600 rounded-md hover:bg-red-100"
                            >
                                <Trash size={14} /> Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <EkstrakurikulerModal
                    editing={editing}
                    onClose={closeModal}
                />
            )}
        </section>
    );
}

function EkstrakurikulerModal({ editing, onClose }) {
    const isEdit = !!editing;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nama:      editing?.nama || '',
        pembina:   editing?.pembina || '',
        icon:      editing?.icon || 'ph-tent',
        deskripsi: editing?.deskripsi || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.ekstrakurikuler.update', editing.id), {
                preserveScroll: true,
                onSuccess: () => { reset(); onClose(); },
            });
        } else {
            post(route('admin.ekstrakurikuler.store'), {
                preserveScroll: true,
                onSuccess: () => { reset(); onClose(); },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md p-6">
                <h3 className="font-display font-semibold text-lg mb-4">
                    {isEdit ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler'}
                </h3>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nama</label>
                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        {errors.nama && <p className="mt-1 text-xs text-red-600">{errors.nama}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Pembina</label>
                        <input
                            type="text"
                            value={data.pembina}
                            onChange={(e) => setData('pembina', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Icon <span className="text-xs text-slate-400">(kelas Phosphor, mis. ph-tent)</span>
                        </label>
                        <input
                            type="text"
                            value={data.icon}
                            onChange={(e) => setData('icon', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Deskripsi</label>
                        <textarea
                            rows="3"
                            value={data.deskripsi}
                            onChange={(e) => setData('deskripsi', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}