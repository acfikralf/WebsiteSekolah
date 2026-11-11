import { useForm } from '@inertiajs/react'; // Perbaiki typo import: '@inertiajs/react'

export default function SectionPengaturan({ settings}) {

    const { data, setData, put, processing, recentlySuccessful } = useForm({
        site_title: settings?.site_title || '',
        site_tagline: settings?.site_tagline || '',
        site_description: settings?.site_description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.settings.update'));
    };

    return (
        <section id="section-pengaturan">
            <h2 className="text-xl font-display font-semibold mb-6">Pengaturan Website</h2>
            <form onSubmit={submit} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Judul Website</label>
                    <input
                        type="text"
                        value={data.site_title} // <--- UBAH INI (dari site.title)
                        onChange={(e) => setData('site_title', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Tagline</label>
                    <input
                        type="text"
                        value={data.site_tagline} // <--- UBAH INI (dari site.tagline)
                        onChange={(e) => setData('site_tagline', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Meta Description</label>
                    <textarea
                        rows="3"
                        value={data.site_description} // <--- UBAH INI (dari site.description)
                        onChange={(e) => setData('site_description', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    ></textarea>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                    {recentlySuccessful && (
                        <span className="text-sm text-primary-600 dark:text-accent-400">
                            ✓ Tersimpan
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
}