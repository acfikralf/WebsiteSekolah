import { useForm } from '@inertiajs/react';

export default function SectionStatistik({ settings }) {
    const { data, setData, put, processing, recentlySuccessful } = useForm({
        stat_siswa:           settings?.stat_siswa || '',
        stat_guru:            settings?.stat_guru || '',
        stat_prestasi:        settings?.stat_prestasi || '',
        stat_ekstrakurikuler: settings?.stat_ekstrakurikuler || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.statistik.update'));
    };

    return (
        <section id="section-statistik">
            <h2 className="text-xl font-display font-semibold mb-6">Statistik Sekolah</h2>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Jumlah Siswa</label>
                        <input
                            type="number"
                            value={data.stat_siswa}
                            onChange={(e) => setData('stat_siswa', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Jumlah Guru</label>
                        <input
                            type="number"
                            value={data.stat_guru}
                            onChange={(e) => setData('stat_guru', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Jumlah Prestasi</label>
                        <input
                            type="number"
                            value={data.stat_prestasi}
                            onChange={(e) => setData('stat_prestasi', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Jumlah Ekstrakurikuler</label>
                        <input
                            type="number"
                            value={data.stat_ekstrakurikuler}
                            onChange={(e) => setData('stat_ekstrakurikuler', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div className="col-span-full flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                        {recentlySuccessful && (
                            <span className="text-sm text-primary-600 dark:text-accent-400">
                                ✓ Tersimpan
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}