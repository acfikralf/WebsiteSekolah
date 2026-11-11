import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function SectionPolling({ polling = null }) {
    const [form, setForm] = useState({
        pertanyaan:
            polling?.pertanyaan ||
            'Menurut Anda, informasi apa yang paling bermanfaat?',
        aktif: polling?.aktif ?? true,
        options:
            polling?.options?.map((o) => ({
                id: o.id,
                opsi: o.opsi,
            })) || [
                { opsi: 'Berita' },
                { opsi: 'Prestasi' },
                { opsi: 'Agenda' },
                { opsi: 'PPDB' },
            ],
    });

    const [processing, setProcessing] = useState(false);

    const totalVotes =
        polling?.options?.reduce(
            (sum, option) => sum + Number(option.votes || 0),
            0
        ) || 0;

    const handleOptionChange = (idx, value) => {
        const updatedOptions = [...form.options];

        updatedOptions[idx] = {
            ...updatedOptions[idx],
            opsi: value,
        };

        setForm({
            ...form,
            options: updatedOptions,
        });
    };

    const addOption = () => {
        setForm({
            ...form,
            options: [
                ...form.options,
                {
                    opsi: '',
                },
            ],
        });
    };

    const removeOption = (idx) => {
        if (form.options.length <= 2) {
            alert('Minimal 2 opsi.');
            return;
        }

        setForm({
            ...form,
            options: form.options.filter((_, i) => i !== idx),
        });
    };

    const submit = (e) => {
        e.preventDefault();

        // Cek opsi kosong
        const hasEmptyOption = form.options.some(
            (option) => !option.opsi.trim()
        );

        if (hasEmptyOption) {
            alert('Semua opsi jawaban harus diisi.');
            return;
        }

        setProcessing(true);

        router.post(route('admin.polling.store'), form, {
            preserveScroll: true,

            onSuccess: () => {
                // Tidak perlu melakukan apa-apa.
                // Inertia akan mengambil data polling terbaru
                // dari server.
            },

            onError: (errors) => {
                console.error('Gagal menyimpan polling:', errors);
            },

            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const resetVotes = () => {
        if (!polling) return;

        if (confirm('Reset semua suara polling ini?')) {
            router.post(
                route('admin.polling.reset', polling.id),
                {},
                {
                    preserveScroll: true,
                }
            );
        }
    };

    return (
        <section id="section-polling">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">
                    Polling
                </h2>

                <div className="flex gap-2">
                    {polling && (
                        <button
                            type="button"
                            onClick={resetVotes}
                            className="inline-flex items-center px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600"
                        >
                            <i className="ph ph-arrow-counter-clockwise mr-1"></i>
                            Reset Suara
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* FORM POLLING */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4">
                        Pengaturan Polling
                    </h3>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Pertanyaan */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Pertanyaan
                            </label>

                            <input
                                type="text"
                                value={form.pertanyaan}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        pertanyaan: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                                placeholder="Masukkan pertanyaan polling"
                            />
                        </div>

                        {/* Opsi */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Opsi Jawaban
                            </label>

                            <div className="space-y-2">
                                {form.options.map((opt, idx) => (
                                    <div
                                        key={opt.id ?? `new-${idx}`}
                                        className="flex gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={opt.opsi}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    idx,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Opsi ${idx + 1}`}
                                            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeOption(idx)}
                                            className="px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50"
                                            title="Hapus opsi"
                                        >
                                            <i className="ph ph-trash"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addOption}
                                className="mt-2 inline-flex items-center text-sm text-primary-600 dark:text-accent-400 hover:underline"
                            >
                                <i className="ph ph-plus mr-1"></i>
                                Tambah Opsi
                            </button>
                        </div>

                        {/* Aktif */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="polling-aktif"
                                checked={form.aktif}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        aktif: e.target.checked,
                                    })
                                }
                                className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                            />

                            <label
                                htmlFor="polling-aktif"
                                className="text-sm text-slate-700 dark:text-slate-300"
                            >
                                Aktifkan polling ini di halaman depan
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60"
                        >
                            {processing
                                ? 'Menyimpan...'
                                : polling
                                  ? 'Update Polling'
                                  : 'Simpan Polling'}
                        </button>
                    </form>
                </div>

                {/* HASIL LIVE */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4">
                        Hasil Saat Ini
                    </h3>

                    {!polling || !polling.options?.length ? (
                        <p className="text-sm text-slate-500 text-center py-4">
                            Belum ada polling.
                        </p>
                    ) : (
                        <>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 italic">
                                "{polling.pertanyaan}"
                            </p>

                            <div className="space-y-3">
                                {polling.options.map((opt) => {
                                    const percent =
                                        totalVotes > 0
                                            ? Math.round(
                                                  (Number(opt.votes || 0) /
                                                      totalVotes) *
                                                      100
                                              )
                                            : 0;

                                    return (
                                        <div key={opt.id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-slate-700 dark:text-slate-300">
                                                    {opt.opsi}
                                                </span>

                                                <span className="font-medium text-slate-900 dark:text-white">
                                                    {opt.votes} suara ({percent}
                                                    %)
                                                </span>
                                            </div>

                                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                                <div
                                                    className="bg-primary-500 dark:bg-accent-400 h-2 rounded-full transition-all"
                                                    style={{
                                                        width: `${percent}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <p className="mt-4 text-xs text-slate-400">
                                Total suara: {totalVotes}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}