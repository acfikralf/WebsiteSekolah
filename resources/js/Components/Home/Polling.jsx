import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react'
import { ChartBar, CheckCircle } from '@phosphor-icons/react';

export default function Polling() {
    const { polling = null } = usePage().props;
    const [selected, setSelected] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [results, setResults] = useState(polling?.options || []);
    const [total, setTotal] = useState(
        polling?.options?.reduce((s, o) => s + o.votes, 0) || 0
    );
    const [submitting, setSubmitting] = useState(false);

    const storageKey = polling ? `polling_voted_${polling.id}` : null;

    // Cek apakah user sudah pernah vote di polling ini
    useEffect(() => {
        if (storageKey && localStorage.getItem(storageKey)) {
            setHasVoted(true);
        }
    }, [storageKey]);

    // Sinkronisasi results saat props berubah
    useEffect(() => {
        if (polling?.options) {
            setResults(polling.options);
            setTotal(polling.options.reduce((s, o) => s + o.votes, 0));
        }
    }, [polling]);

    const handleVote = async (e) => {
        e.preventDefault();
        if (!selected || submitting) return;

        setSubmitting(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

            const res = await fetch(route('polling.vote'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ option_id: selected }),
            });

            const data = await res.json();

            if (data.success) {
                setResults(data.options);
                setTotal(data.total);
                setHasVoted(true);
                if (storageKey) localStorage.setItem(storageKey, 'true');
            }
        } catch (err) {
            console.error('Vote error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    // Kalau tidak ada polling aktif, jangan render apa-apa
    if (!polling) return null;

    return (
        <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 islamic-pattern">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 reveal">
                    <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <ChartBar size={24} className="text-primary-600 dark:text-accent-400" />
                        {polling.pertanyaan}
                    </h3>

                    {!hasVoted ? (
                        <form onSubmit={handleVote} className="space-y-3">
                            {results.map((opt) => (
                                <label
                                    key={opt.id}
                                    className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name="opsi"
                                        value={opt.id}
                                        checked={selected === opt.id}
                                        onChange={() => setSelected(opt.id)}
                                        className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                                    />
                                    <span className="text-slate-700 dark:text-slate-300">{opt.opsi}</span>
                                </label>
                            ))}

                            <button
                                type="submit"
                                disabled={!selected || submitting}
                                className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl disabled:opacity-50 shadow-lg shadow-primary-600/20 transition-all"
                            >
                                {submitting ? 'Mengirim...' : 'Vote'}
                            </button>
                        </form>
                    ) : (
                        <div>
                            <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-accent-400">
                                <CheckCircle size={20} weight="fill" />
                                <span className="text-sm font-medium">Terima kasih telah memilih!</span>
                            </div>

                            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Hasil Polling</h4>

                            {results.map((item) => {
                                const percent = total > 0 ? Math.round((item.votes / total) * 100) : 0;
                                const isSelected = item.id === selected;
                                return (
                                    <div key={item.id} className="mb-3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className={`text-slate-700 dark:text-slate-300 ${isSelected ? 'font-semibold' : ''}`}>
                                                {item.opsi}
                                                {isSelected && <span className="ml-1 text-primary-600 dark:text-accent-400">✓</span>}
                                            </span>
                                            <span className="font-medium text-slate-900 dark:text-white">{percent}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-500 ${
                                                    isSelected ? 'bg-primary-500 dark:bg-accent-400' : 'bg-primary-400/60 dark:bg-accent-400/60'
                                                }`}
                                                style={{ width: `${percent}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}

                            <p className="mt-4 text-xs text-slate-400">Total suara: {total}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}