import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function SectionAgenda({ agendas = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        judul: '',
        tanggal: '',
        waktu: '',
        lokasi: '',
        deskripsi: '',
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setShowForm(true);
    };

    const openEdit = (item) => {
        setData({
            judul: item.judul,
            tanggal: item.tanggal?.slice(0, 10) || '',
            waktu: item.waktu || '',
            lokasi: item.lokasi || '',
            deskripsi: item.deskripsi || '',
        });
        setEditing(item);
        setShowForm(true);
    };

    const closeModal = () => {
        setShowForm(false);
        reset();
        setEditing(null);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.agenda.update', editing.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.agenda.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const hapus = (id) => {
        if (confirm('Yakin ingin menghapus agenda ini?')) {
            router.delete(route('admin.agenda.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <section id="section-agenda">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">Data Agenda</h2>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <i className="ph ph-plus mr-1"></i> Tambah Agenda
                </button>
            </div>

            {/* Tabel Agenda */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-left">
                                <th className="px-4 py-3 font-medium">#</th>
                                <th className="px-4 py-3 font-medium">Judul</th>
                                <th className="px-4 py-3 font-medium">Tanggal</th>
                                <th className="px-4 py-3 font-medium">Lokasi</th>
                                <th className="px-4 py-3 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {agendas.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-4 py-6 text-center text-slate-500">
                                        Belum ada data agenda.
                                    </td>
                                </tr>
                            )}
                            {agendas.map((item, idx) => (
                                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-4 py-3">{idx + 1}</td>
                                    <td className="px-4 py-3 font-medium">{item.judul}</td>
                                    <td className="px-4 py-3">
                                        {new Date(item.tanggal).toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="px-4 py-3">{item.lokasi}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button onClick={() => openEdit(item)} className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-md transition-colors" title="Edit">
                                                <i className="ph ph-pencil-simple text-lg"></i>
                                            </button>
                                            <button onClick={() => hapus(item.id)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-md transition-colors" title="Hapus">
                                                <i className="ph ph-trash text-lg"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form Agenda */}
            <Modal
                show={showForm}
                onClose={closeModal}
                title={editing ? 'Edit Agenda' : 'Tambah Agenda Baru'}
            >
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Judul Agenda</label>
                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) => setData('judul', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                        />
                        {errors.judul && <p className="text-xs text-red-600 mt-1">{errors.judul}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Tanggal</label>
                        <input
                            type="date"
                            value={data.tanggal}
                            onChange={(e) => setData('tanggal', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                        />
                        {errors.tanggal && <p className="text-xs text-red-600 mt-1">{errors.tanggal}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Waktu</label>
                        <input
                            type="text"
                            placeholder="08:00 - 10:00"
                            value={data.waktu}
                            onChange={(e) => setData('waktu', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Lokasi</label>
                        <input
                            type="text"
                            value={data.lokasi}
                            onChange={(e) => setData('lokasi', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Deskripsi</label>
                        <textarea
                            rows="3"
                            value={data.deskripsi}
                            onChange={(e) => setData('deskripsi', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
                        ></textarea>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button type="button" onClick={closeModal} className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                            Batal
                        </button>
                        <button type="submit" disabled={processing} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60">
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}   