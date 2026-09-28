import { useState, useMemo } from "react";
import { useForm, router } from "@inertiajs/react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";

const KATEGORI_OPTIONS = [
    "Kegiatan",
    "Prestasi",
    "Ekstrakurikuler",
    "Pengumuman",
];

export default function SectionBerita({ beritas }) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    // Filter berdasarkan search
    const filtered = useMemo(() => {
        if (!search.trim()) return beritas || [];
        const q = search.toLowerCase();
        return (beritas || []).filter(
            (b) =>
                b.judul.toLowerCase().includes(q) ||
                b.kategori.toLowerCase().includes(q),
        );
    }, [beritas, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const currentPage = Math.min(page, totalPages);
    const paginated = filtered.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage,
    );

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
        if (!confirm(`Hapus berita "${item.judul}"?`)) return;
        router.delete(route("admin.berita.destroy", item.id), {
            preserveScroll: true,
        });
    };

    return (
        <section id="section-berita">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">
                    Data Berita
                </h2>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <Plus size={16} className="mr-1" /> Tambah Berita
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <input
                        type="text"
                        placeholder="Search berita..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full sm:w-64 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-left">
                                <th className="px-4 py-3 font-medium w-12">
                                    #
                                </th>
                                <th className="px-4 py-3 font-medium w-20">
                                    Gambar
                                </th>
                                <th className="px-4 py-3 font-medium">Judul</th>
                                <th className="px-4 py-3 font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Tanggal
                                </th>
                                <th className="px-4 py-3 font-medium w-28">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {paginated.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-4 py-8 text-center text-slate-500"
                                    >
                                        Tidak ada data.
                                    </td>
                                </tr>
                            )}
                            {paginated.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                >
                                    <td className="px-4 py-3">
                                        {(currentPage - 1) * perPage + idx + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.gambar_url ? (
                                            <img
                                                src={item.gambar_url}
                                                alt={item.judul}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                                                <i className="ph ph-image"></i>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium">
                                        {item.judul}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${
                                                item.status === "published"
                                                    ? "bg-primary-100 dark:bg-slate-800 text-primary-700 dark:text-accent-400"
                                                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                            }`}
                                        >
                                            {item.status === "published"
                                                ? "Published"
                                                : "Draft"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(
                                            item.tanggal,
                                        ).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEdit(item)}
                                                className="p-1 text-slate-500 hover:text-primary-600"
                                            >
                                                <PencilSimple size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                                className="p-1 text-slate-500 hover:text-red-600"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                        Menampilkan {paginated.length} dari {filtered.length}{" "}
                        data
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setPage(currentPage - 1)}
                            className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded-lg text-xs disabled:opacity-40"
                        >
                            Previous
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setPage(currentPage + 1)}
                            className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded-lg text-xs disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <BeritaModal editing={editing} onClose={closeModal} />
            )}
        </section>
    );
}

function BeritaModal({ editing, onClose }) {
    const isEdit = !!editing;

    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            judul: editing?.judul || "",
            ringkasan: editing?.ringkasan || "",
            konten: editing?.konten || "",
            kategori: editing?.kategori || "Kegiatan",
            status: editing?.status || "draft",
            tanggal: editing?.tanggal || new Date().toISOString().slice(0, 10),
            gambar: null,
        });

    const submit = (e) => {
        e.preventDefault();

        const url = isEdit
            ? route("admin.berita.update", editing.id)
            : route("admin.berita.store");

        post(url, {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl p-6 my-8">
                <h3 className="font-display font-semibold text-lg mb-4">
                    {isEdit ? "Edit Berita" : "Tambah Berita"}
                </h3>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Judul
                        </label>
                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) => setData("judul", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        {errors.judul && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.judul}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Kategori
                            </label>
                            <select
                                value={data.kategori}
                                onChange={(e) =>
                                    setData("kategori", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                {KATEGORI_OPTIONS.map((k) => (
                                    <option key={k} value={k}>
                                        {k}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Status
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
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
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Ringkasan
                        </label>
                        <textarea
                            rows="2"
                            value={data.ringkasan}
                            onChange={(e) =>
                                setData("ringkasan", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Konten
                        </label>
                        <textarea
                            rows="5"
                            value={data.konten}
                            onChange={(e) => setData("konten", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        ></textarea>
                        {errors.konten && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.konten}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Gambar
                        </label>
                        {isEdit && editing.gambar_url && (
                            <img
                                src={editing.gambar_url}
                                alt="Gambar"
                                className="w-32 h-20 object-cover rounded-lg mb-2"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData("gambar", e.target.files[0])
                            }
                            className="w-full text-sm text-slate-600 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                        />
                        {errors.gambar && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.gambar}
                            </p>
                        )}
                        {progress && (
                            <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                                <div
                                    className="bg-primary-500 h-2 rounded-full transition-all"
                                    style={{ width: `${progress.percentage}%` }}
                                ></div>
                            </div>
                        )}
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
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
