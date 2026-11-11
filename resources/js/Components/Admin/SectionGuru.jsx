import { useState } from "react";
import { useForm, router } from "@inertiajs/react";

export default function SectionGuru({ gurus = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        nama: "",
        jabatan: "",
        mapel: "",
        urutan: 0,
        foto: null,
        _method: "post",
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setPreviewFoto(null);
        setShowForm(true);
    };

    const openEdit = (item) => {
        setData({
            nama: item.nama,
            jabatan: item.jabatan || "",
            mapel: item.mapel || "",
            urutan: item.urutan || 0,
            foto: null,
            _method: "POST",
        });
        setEditing(item);
        setPreviewFoto(item.foto_url);
        setShowForm(true);
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        setData("foto", file);
        if (file) {
            setPreviewFoto(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const url = editing
            ? route("admin.guru.update", editing.id)
            : route("admin.guru.store");

        post(url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowForm(false);
                setPreviewFoto(null);
                reset();
            },
        });
    };

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus guru ini?")) {
            router.delete(route("admin.guru.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <section id="section-guru">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">
                    Data Guru
                </h2>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg"
                >
                    <i className="ph ph-plus mr-1"></i> Tambah Guru
                </button>
            </div>

            {showForm && (
                <div className="mb-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4">
                        {editing ? "Edit Guru" : "Tambah Guru"}
                    </h3>
                    <form
                        onSubmit={submit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {/* Foto */}
                        <div className="md:col-span-2 flex items-start gap-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                {previewFoto ? (
                                    <img
                                        src={previewFoto}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <i className="ph ph-user text-3xl text-slate-400"></i>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">
                                    Foto
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFotoChange}
                                    className="w-full text-sm"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Format: JPG, PNG. Maks 2MB. Rasio disarankan
                                    3:4.
                                </p>
                                {errors.foto && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.foto}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Nama
                            </label>
                            <input
                                type="text"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                            />
                            {errors.nama && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.nama}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Jabatan
                            </label>
                            <input
                                type="text"
                                placeholder="Guru Matematika"
                                value={data.jabatan}
                                onChange={(e) =>
                                    setData("jabatan", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Mapel / Keterangan
                            </label>
                            <input
                                type="text"
                                placeholder="Wali Kelas 9A"
                                value={data.mapel}
                                onChange={(e) =>
                                    setData("mapel", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Urutan
                            </label>
                            <input
                                type="number"
                                value={data.urutan}
                                onChange={(e) =>
                                    setData("urutan", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                Angka kecil tampil lebih dulu.
                            </p>
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
                                onClick={() => {
                                    setShowForm(false);
                                    setPreviewFoto(null);
                                }}
                                className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Grid guru */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {gurus.length === 0 && (
                    <p className="col-span-full text-center text-slate-500 py-8">
                        Belum ada data guru.
                    </p>
                )}

                {gurus.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            {item.foto_url ? (
                                <img
                                    src={item.foto_url}
                                    alt={item.nama}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <i className="ph ph-user text-5xl"></i>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <p className="font-medium text-sm truncate">
                                {item.nama}
                            </p>
                            <p className="text-xs text-primary-600 dark:text-accent-400 truncate">
                                {item.jabatan}
                            </p>
                            <p className="text-xs text-slate-500 truncate mt-0.5">
                                {item.mapel}
                            </p>
                            <div className="mt-3 flex gap-2">
                                <button
                                    onClick={() => openEdit(item)}
                                    className="flex-1 px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => hapus(item.id)}
                                    className="flex-1 px-3 py-1.5 text-xs bg-red-50 dark:bg-red-900/30 text-red-600 rounded-md hover:bg-red-100"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
