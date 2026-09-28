import { useState } from "react";
import { useForm, router } from "@inertiajs/react";

export default function SectionPrestasi({ prestasis = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        judul: "",
        siswa: "",
        kategori: "",
        tingkat: "",
        tanggal: "",
        deskripsi: "",
        foto: null,
        _method: "post",
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setShowForm(true);
    };

    const openEdit = (item) => {
        setData({
            judul: item.judul,
            siswa: item.siswa || "",
            kategori: item.kategori || "",
            tingkat: item.tingkat || "",
            tanggal: item.tanggal?.slice(0, 10) || "",
            deskripsi: item.deskripsi || "",
            foto: null,
            _method: "POST",
        });

        setEditing(item);
        setShowForm(true);
    };

    const submit = (e) => {
        e.preventDefault();
        const url = editing
            ? route("admin.prestasi.update", editing.id)
            : route("admin.prestasi.store");

        post(url, {
            forceFormData: true,
            onSuccess: () => {
                setShowForm(false);
                reset();
            },
        });
    };

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus prestasi ini?")) {
            router.delete(route("admin.prestasi.destroy", id));
        }
    };

    return (
        <section id="section-prestasi">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">
                    Data Prestasi
                </h2>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg"
                >
                    <i className="ph ph-plus mr-1"></i> Tambah Prestasi
                </button>
            </div>

            {showForm && (
                <div className="mb-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4">
                        {editing ? "Edit Prestasi" : "Tambah Prestasi"}
                    </h3>
                    <form
                        onSubmit={submit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Judul
                            </label>
                            <input
                                type="text"
                                value={data.judul}
                                onChange={(e) =>
                                    setData("judul", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                            />
                            {errors.judul && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.judul}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Siswa / Tim
                            </label>
                            <input
                                type="text"
                                value={data.siswa}
                                onChange={(e) =>
                                    setData("siswa", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Kategori
                            </label>
                            <select
                                value={data.kategori}
                                onChange={(e) =>
                                    setData("kategori", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                            >
                                <option value="">-- Pilih --</option>
                                <option value="Akademik">Akademik</option>
                                <option value="Seni">Seni</option>
                                <option value="Olahraga">Olahraga</option>
                                <option value="Keagamaan">Keagamaan</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Tingkat
                            </label>
                            <input
                                type="text"
                                placeholder="Kabupaten / Provinsi / Nasional"
                                value={data.tingkat}
                                onChange={(e) =>
                                    setData("tingkat", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Tanggal
                            </label>
                            <input
                                type="date"
                                value={data.tanggal}
                                onChange={(e) =>
                                    setData("tanggal", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                rows="3"
                                value={data.deskripsi}
                                onChange={(e) =>
                                    setData("deskripsi", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                            ></textarea>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Foto Prestasi
                            </label>

                            {editing?.foto && !data.foto && (
                                <img
                                    src={`/storage/${editing.foto}`}
                                    alt="Foto Prestasi"
                                    className="w-32 h-20 object-cover rounded-lg mb-2"
                                />
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData("foto", e.target.files[0])
                                }
                                className="w-full text-sm text-slate-600 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                            />

                            {errors.foto && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.foto}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2 flex gap-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60"
                            >
                                {processing ? "Menyimpan..." : "Simpan"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg"
                            >
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
                                <th className="px-4 py-3 font-medium">Foto</th>
                                <th className="px-4 py-3 font-medium">Judul</th>
                                <th className="px-4 py-3 font-medium">Siswa</th>
                                <th className="px-4 py-3 font-medium">
                                    Kategori
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Tingkat
                                </th>
                                <th className="px-4 py-3 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {prestasis.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-4 py-6 text-center text-slate-500"
                                    >
                                        Belum ada data prestasi.
                                    </td>
                                </tr>
                            )}
                            {prestasis.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                >
                                    <td className="px-4 py-3">{idx + 1}</td>
                                    <td className="px-4 py-3">
                                        {item.foto ? (
                                            <img
                                                src={`/storage/${item.foto}`}
                                                alt={item.judul}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400">
                                                <i className="ph ph-image"></i>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium">
                                        {item.judul}
                                    </td>
                                    <td className="px-4 py-3">{item.siswa}</td>
                                    <td className="px-4 py-3">
                                        <span className="text-xs bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 px-2 py-1 rounded-full">
                                            {item.kategori}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.tingkat}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEdit(item)}
                                                className="p-1 text-slate-500 hover:text-primary-600"
                                            >
                                                <i className="ph ph-pencil-simple"></i>
                                            </button>
                                            <button
                                                onClick={() => hapus(item.id)}
                                                className="p-1 text-slate-500 hover:text-red-600"
                                            >
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
