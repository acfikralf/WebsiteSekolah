import { useState, useEffect } from 'react';
import { ChartBar } from '@phosphor-icons/react';

export default function Polling() {
    const [hasVoted, setHasVoted] = useState(false);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        if (localStorage.getItem('pollVoted')) {
            setHasVoted(true);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selected) return;
        localStorage.setItem('pollVoted', 'true');
        setHasVoted(true);
    };

    const results = [
        { label: 'Berita', votes: 45 },
        { label: 'Prestasi', votes: 30 },
        { label: 'Agenda', votes: 25 },
        { label: 'PPDB', votes: 15 },
    ];
    const total = results.reduce((sum, r) => sum + r.votes, 0);

    return (
        <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 islamic-pattern">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 reveal">
                    <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <ChartBar size={24} className="text-primary-600 dark:text-accent-400" />
                        Menurut Anda, informasi apa yang paling bermanfaat?
                    </h3>
                    {!hasVoted ? (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {['Berita', 'Prestasi', 'Agenda', 'PPDB'].map((option) => (
                                <label key={option} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors">
                                    <input
                                        type="radio"
                                        name="opsi"
                                        value={option}
                                        checked={selected === option}
                                        onChange={(e) => setSelected(e.target.value)}
                                        className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                                    />
                                    <span className="text-slate-700 dark:text-slate-300">{option}</span>
                                </label>
                            ))}
                            <button type="submit" disabled={!selected} className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl disabled:opacity-50 shadow-lg shadow-primary-600/20 hover:shadow-primary-700/30 transition-all">
                                Vote
                            </button>
                        </form>
                    ) : (
                        <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Hasil Polling</h4>
                            {results.map((item) => {
                                const percent = Math.round((item.votes / total) * 100);
                                return (
                                    <div key={item.label} className="mb-3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                                            <span className="font-medium text-slate-900 dark:text-white">{percent}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                            <div className="bg-primary-500 dark:bg-accent-400 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
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