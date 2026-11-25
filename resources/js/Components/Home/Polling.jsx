
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { ChartBar, CheckCircle, WarningCircle } from '@phosphor-icons/react';

const normalizeOptions = (options = []) => {
    return options.map((option) => ({
        ...option,
        votes: Number(option.votes) || 0,
    }));
};

export default function Polling() {
    const { polling = null } = usePage().props;

    const [selected, setSelected] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [checkingVote, setCheckingVote] = useState(true);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const storageKey = polling
        ? `polling_voted_${polling.id}`
        : null;

    // Sinkronisasi data polling dari server
    useEffect(() => {
        const options = normalizeOptions(polling?.options || []);

        setResults(options);
        setTotal(
            options.reduce((sum, option) => sum + option.votes, 0)
        );
    }, [polling?.id, polling?.options]);

    // Memeriksa status vote dari localStorage
    useEffect(() => {
        setCheckingVote(true);
        setError('');

        if (!storageKey) {
            setHasVoted(false);
            setSelected(null);
            setCheckingVote(false);
            return;
        }

        try {
            const savedVote = localStorage.getItem(storageKey);

            if (savedVote) {
                setHasVoted(true);

                // Mendukung data lama yang hanya menyimpan "true"
                if (savedVote !== 'true') {
                    setSelected(Number(savedVote));
                }
            } else {
                setHasVoted(false);
                setSelected(null);
            }
        } catch (err) {
            console.error('Storage error:', err);
            setHasVoted(false);
        } finally {
            setCheckingVote(false);
        }
    }, [storageKey]);

    // Mengirim vote ke server
    const handleVote = async (e) => {
        e.preventDefault();

        if (!selected || submitting || hasVoted) return;

        setSubmitting(true);
        setError('');

        try {
            const csrfToken = document.querySelector(
                'meta[name="csrf-token"]'
            )?.content;

            if (!csrfToken) {
                throw new Error('CSRF token tidak ditemukan.');
            }

            const res = await fetch(route('polling.vote'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    option_id: selected,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(
                    data.message || 'Gagal mengirim vote. Silakan coba lagi.'
                );
            }

            // Update hasil polling
            let updatedOptions;

            if (Array.isArray(data.options)) {
                updatedOptions = normalizeOptions(data.options);
            } else {
                // Fallback jika server tidak mengirim daftar opsi
                updatedOptions = results.map((option) => ({
                    ...option,
                    votes:
                        option.id === selected
                            ? option.votes + 1
                            : option.votes,
                }));
            }

            const updatedTotal = data.total != null
                ? Number(data.total)
                : updatedOptions.reduce(
                    (sum, option) => sum + option.votes,
                    0
                );

            setResults(updatedOptions);
            setTotal(updatedTotal);
            setHasVoted(true);

            // Simpan ID opsi yang dipilih
            try {
                if (storageKey) {
                    localStorage.setItem(
                        storageKey,
                        String(selected)
                    );
                }
            } catch (storageError) {
                console.error('Gagal menyimpan vote:', storageError);
            }

        } catch (err) {
            console.error('Vote error:', err);
            setError(
                err.message || 'Terjadi kesalahan. Silakan coba lagi.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Tidak menampilkan section jika tidak ada polling aktif
    if (!polling) return null;

    // Menghitung persentase hasil polling
    const getPercentage = (votes) => {
        return total > 0
            ? Math.round((Number(votes) / total) * 100)
            : 0;
    };

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950 islamic-pattern">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-slate-900 p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 reveal">

                    {/* Judul Polling */}
                    <h3 className="font-display font-bold sm:font-semibold text-base sm:text-xl text-slate-900 dark:text-white mb-4 sm:mb-6 flex items-start gap-2 leading-snug">
                        <ChartBar className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5 text-primary-600 dark:text-accent-400" />
                        <span>{polling.pertanyaan}</span>
                    </h3>

                    {checkingVote ? (
                        <div className="py-6 text-center text-sm text-slate-400">
                            Memeriksa status polling...
                        </div>
                    ) : !hasVoted ? (

                        /* Form Voting */
                        <form
                            onSubmit={handleVote}
                            className="space-y-2 sm:space-y-3"
                        >
                            {results.map((opt) => (
                                <label
                                    key={opt.id}
                                    className={`flex items-center gap-3 cursor-pointer p-2.5 sm:p-3 rounded-lg border transition-colors ${
                                        selected === opt.id
                                            ? 'border-primary-500 bg-primary-50 dark:bg-slate-800'
                                            : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="opsi"
                                        value={opt.id}
                                        checked={selected === opt.id}
                                        onChange={() => setSelected(opt.id)}
                                        disabled={submitting}
                                        className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 border-slate-300 focus:ring-primary-500 shrink-0"
                                    />

                                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-snug">
                                        {opt.opsi}
                                    </span>
                                </label>
                            ))}

                            {/* Pesan Error */}
                            {error && (
                                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs sm:text-sm">
                                    <WarningCircle className="w-5 h-5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!selected || submitting}
                                className="w-full mt-2 inline-flex items-center justify-center px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base font-medium rounded-lg sm:rounded-xl disabled:opacity-50 shadow-lg shadow-primary-600/20 transition-all active:scale-95 sm:active:scale-100"
                            >
                                {submitting ? 'Mengirim...' : 'Vote'}
                            </button>
                        </form>

                    ) : (

                        /* Hasil Polling */
                        <div>
                            <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-accent-400">
                                <CheckCircle
                                    className="w-5 h-5"
                                    weight="fill"
                                />
                                <span className="text-xs sm:text-sm font-medium">
                                    Terima kasih telah memilih!
                                </span>
                            </div>

                            <h4 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white mb-3 sm:mb-4">
                                Hasil Polling
                            </h4>

                            {results.map((item) => {
                                const percent = getPercentage(item.votes);
                                const isSelected =
                                    Number(item.id) === Number(selected);

                                return (
                                    <div
                                        key={item.id}
                                        className="mb-3 sm:mb-4"
                                    >
                                        <div className="flex justify-between text-xs sm:text-sm mb-1 gap-3">
                                            <span className={`text-slate-700 dark:text-slate-300 leading-snug pr-2 ${
                                                isSelected ? 'font-semibold' : ''
                                            }`}>
                                                {item.opsi}

                                                {isSelected && (
                                                    <span className="ml-1 text-primary-600 dark:text-accent-400">
                                                        ✓
                                                    </span>
                                                )}
                                            </span>

                                            <span className="font-medium text-slate-900 dark:text-white shrink-0 tabular-nums">
                                                {percent}%
                                            </span>
                                        </div>

                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
                                            <div
                                                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                                                    isSelected
                                                        ? 'bg-primary-500 dark:bg-accent-400'
                                                        : 'bg-primary-400/60 dark:bg-accent-400/60'
                                                }`}
                                                style={{
                                                    width: `${percent}%`,
                                                }}
                                            />
                                        </div>

                                        <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
                                            {item.votes} suara
                                        </p>
                                    </div>
                                );
                            })}

                            <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-slate-400">
                                Total suara: {total}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
