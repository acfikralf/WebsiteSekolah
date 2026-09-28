import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

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

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.agenda.update', editing.id), {
                onSuccess: () => { setShowForm(false); reset(); },
            });
        } else {
            post(route('admin.agenda.store'), {
                onSuccess: () => { setShowForm(false); reset(); },
            });
        }
    };

    const hapus = (id) => {
        if (confirm('Yakin ingin menghapus agenda ini?')) {
            router.delete(route('admin.agenda.destroy', id));
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

            {showForm && (
                <div className="mb-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4">
                        {editing ? 'Edit Agenda' : 'Tambah Agenda Baru'}
                    </h3>
                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Judul</label>
                            <input
                                type="text"
                                value={data.judul}
                                onChange={(e) => setData('judul', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            {errors.judul && <p className="text-xs text-red-600 mt-1">{errors.judul}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tanggal</label>
                            <input
                                type="date"
                                value={data.tanggal}
                                onChange={(e) => setData('tanggal', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Lokasi</label>
                            <input
                                type="text"
                                value={data.lokasi}
                                onChange={(e) => setData('lokasi', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Deskripsi</label>
                            <textarea
                                rows="3"
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 flex gap-2">
                            <button type="submit" disabled={processing} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60">
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

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
                                            <button onClick={() => openEdit(item)} className="p-1 text-slate-500 hover:text-primary-600">
                                                <i className="ph ph-pencil-simple"></i>
                                            </button>
                                            <button onClick={() => hapus(item.id)} className="p-1 text-slate-500 hover:text-red-600">
                                                <i className="ph ph-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}