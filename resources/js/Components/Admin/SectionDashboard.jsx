import { Link } from '@inertiajs/react';
import {
    Newspaper, UsersThree, Trophy, Calendar, Images, ChartBar,
    ArrowRight, TrendUp, Clock, MapPin, CheckCircle,
    SquaresFour, PencilLine, ChartLine, GraduationCap, Gear, UserCircle, Tent
} from '@phosphor-icons/react';

export default function SectionDashboard({
    stats = {},
    recentBerita = [],
    recentAgenda = [],
    recentPrestasi = [],
    polling = null,
}) {
    // Stat cards untuk ringkasan di bawah
    const statCards = [
        { key: 'berita', label: 'Berita', icon: Newspaper, accent: 'from-blue-500/10 to-blue-500/5', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
        { key: 'guru', label: 'Guru', icon: UsersThree, accent: 'from-emerald-500/10 to-emerald-500/5', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400' },
        { key: 'prestasi', label: 'Prestasi', icon: Trophy, accent: 'from-amber-500/10 to-amber-500/5', iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400' },
        { key: 'agenda', label: 'Agenda', icon: Calendar, accent: 'from-purple-500/10 to-purple-500/5', iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400' },
        { key: 'galeri', label: 'Galeri', icon: Images, accent: 'from-pink-500/10 to-pink-500/5', iconBg: 'bg-pink-100 dark:bg-pink-900/30', iconColor: 'text-pink-600 dark:text-pink-400' },
        { key: 'polling', label: 'Polling', icon: ChartBar, accent: 'from-cyan-500/10 to-cyan-500/5', iconBg: 'bg-cyan-100 dark:bg-cyan-900/30', iconColor: 'text-cyan-600 dark:text-cyan-400' },
    ];

    // DAFTAR MENU AKSI CEPAT (Dengan Warna)
    const quickActions = [
        { key: 'berita', label: 'Berita', icon: Newspaper, bg: 'bg-blue-100 dark:bg-blue-900/30', color: 'text-blue-600 dark:text-blue-400' },
        { key: 'agenda', label: 'Agenda', icon: Calendar, bg: 'bg-purple-100 dark:bg-purple-900/30', color: 'text-purple-600 dark:text-purple-400' },
        { key: 'prestasi', label: 'Prestasi', icon: Trophy, bg: 'bg-amber-100 dark:bg-amber-900/30', color: 'text-amber-600 dark:text-amber-400' },
        { key: 'ekstrakurikuler', label: 'Ekstrakurikuler', icon: Tent, bg: 'bg-teal-100 dark:bg-teal-900/30', color: 'text-teal-600 dark:text-teal-400' },
        { key: 'mading', label: 'Moderasi Mading', icon: PencilLine, bg: 'bg-pink-100 dark:bg-pink-900/30', color: 'text-pink-600 dark:text-pink-400' },
        { key: 'polling', label: 'Polling', icon: ChartBar, bg: 'bg-cyan-100 dark:bg-cyan-900/30', color: 'text-cyan-600 dark:text-cyan-400' },
        { key: 'guru', label: 'Guru', icon: UsersThree, bg: 'bg-emerald-100 dark:bg-emerald-900/30', color: 'text-emerald-600 dark:text-emerald-400' },
        { key: 'statistik', label: 'Statistik', icon: ChartLine, bg: 'bg-indigo-100 dark:bg-indigo-900/30', color: 'text-indigo-600 dark:text-indigo-400' },
        { key: 'profil', label: 'Profil Sekolah', icon: GraduationCap, bg: 'bg-orange-100 dark:bg-orange-900/30', color: 'text-orange-600 dark:text-orange-400' },
        { key: 'pengaturan', label: 'Pengaturan Website', icon: Gear, bg: 'bg-slate-200 dark:bg-slate-700', color: 'text-slate-700 dark:text-slate-300' },
        { key: 'akun', label: 'Akun Admin', icon: UserCircle, bg: 'bg-rose-100 dark:bg-rose-900/30', color: 'text-rose-600 dark:text-rose-400' },
    ];

    // Format tanggal Indonesia
    const fmtTanggal = (tgl, opts = { day: 'numeric', month: 'short', year: 'numeric' }) => {
        if (!tgl) return '-';
        return new Date(tgl).toLocaleDateString('id-ID', opts);
    };

    // Hitung total suara polling
    const totalVotes = polling?.options?.reduce((s, o) => s + o.votes, 0) || 0;
    const topPollingOption = polling?.options?.length
        ? [...polling.options].sort((a, b) => b.votes - a.votes)[0]
        : null;

    return (
        <section id="section-dashboard" className="space-y-6">
            {/* ===== WELCOME BANNER ===== */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 p-6 md:p-8 text-white">
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-accent-300 text-sm font-medium mb-1 flex items-center gap-1">
                            <TrendUp size={16} /> Selamat datang kembali
                        </p>
                        <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                            Assalamu'alaikum, Administrator 👋
                        </h2>
                        <p className="text-white/80 text-sm max-w-xl">
                            Berikut ringkasan aktivitas website SMP Islam Watestanjung hari ini.
                        </p>
                    </div>

                    <div className="flex gap-3 shrink-0">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium backdrop-blur-sm transition-colors"
                        >
                            <i className="ph ph-globe mr-2"></i> Lihat Website
                        </Link>
                    </div>
                </div>
            </div>

            {/* ===== AKSI CEPAT (BERWARNA) ===== */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
                <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-4">
                    Aksi Cepat
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                    {quickActions.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.key}
                                onClick={() => window.dispatchEvent(new CustomEvent('navigate-section', { detail: item.key }))}
                                className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
                            >
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                    <Icon size={18} className={item.color} weight="duotone" />
                                </div>
                                <span className="text-[11px] sm:text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors leading-tight break-words whitespace-normal">
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ===== STAT CARDS ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.key}
                            className={`relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all hover:-translate-y-1`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} pointer-events-none`}></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                                        <Icon size={22} className={card.iconColor} weight="duotone" />
                                    </div>
                                </div>
                                <div className="text-2xl font-display font-bold text-slate-900 dark:text-white leading-none">
                                    {stats[card.key] ?? 0}
                                </div>
                                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    {card.label}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ===== ROW 1: BERITA + AGENDA ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Berita Terbaru */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <Newspaper size={20} className="text-primary-600 dark:text-accent-400" />
                            Berita Terbaru
                        </h3>
                        <Link
                            href="/admin"
                            className="text-xs font-medium text-primary-600 dark:text-accent-400 hover:underline flex items-center gap-1"
                        >
                            Lihat semua <ArrowRight size={12} />
                        </Link>
                    </div>

                    {recentBerita.length === 0 ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
                            Belum ada berita.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {recentBerita.map((item) => {
                                const isPublished = ['published', 'Published'].includes(item.status);
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <div className="w-2 h-2 bg-accent-500 rounded-full shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate text-slate-900 dark:text-white">
                                                {item.judul}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {fmtTanggal(item.tanggal)}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-[10px] px-2 py-1 rounded-full shrink-0 font-medium ${
                                                isPublished
                                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                            }`}
                                        >
                                            {isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Agenda Terdekat */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <Calendar size={20} className="text-primary-600 dark:text-accent-400" />
                            Agenda Terdekat
                        </h3>
                    </div>

                    {recentAgenda.length === 0 ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
                            Tidak ada agenda terdekat.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {recentAgenda.map((item) => {
                                const d = new Date(item.tanggal);
                                const day = String(d.getDate()).padStart(2, '0');
                                const month = d.toLocaleString('id-ID', { month: 'short' });
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-accent-400 rounded-lg flex flex-col items-center justify-center shrink-0">
                                            <span className="text-base font-bold leading-none">{day}</span>
                                            <span className="text-[10px] uppercase mt-0.5">{month}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium truncate text-slate-900 dark:text-white">
                                                {item.judul}
                                            </p>
                                            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                {item.waktu && (
                                                    <span className="inline-flex items-center gap-1">
                                                        <Clock size={12} /> {item.waktu}
                                                    </span>
                                                )}
                                                {item.lokasi && (
                                                    <span className="inline-flex items-center gap-1 truncate">
                                                        <MapPin size={12} /> {item.lokasi}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* ===== ROW 2: PRESTASI + POLLING ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Prestasi Terbaru */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <Trophy size={20} className="text-primary-600 dark:text-accent-400" />
                            Prestasi Terbaru
                        </h3>
                    </div>

                    {recentPrestasi.length === 0 ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
                            Belum ada prestasi.
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            {recentPrestasi.map((item) => (
                                <div
                                    key={item.id}
                                    className="group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"
                                >
                                    <div className="aspect-video bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                        {item.foto_url ? (
                                            <img
                                                src={item.foto_url}
                                                alt={item.judul}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <Trophy size={28} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2.5">
                                        <p className="text-xs font-medium text-slate-900 dark:text-white line-clamp-2 leading-snug">
                                            {item.judul}
                                        </p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                                            {item.siswa}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Polling */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <ChartBar size={20} className="text-primary-600 dark:text-accent-400" />
                            Hasil Polling
                        </h3>
                        {polling?.aktif && (
                            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                Aktif
                            </span>
                        )}
                    </div>

                    {!polling ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
                            Belum ada polling.
                        </p>
                    ) : (
                        <>
                            <p className="text-sm text-slate-700 dark:text-slate-300 italic mb-4 leading-snug">
                                "{polling.pertanyaan}"
                            </p>

                            {topPollingOption && totalVotes > 0 && (
                                <div className="mb-4 p-3 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-lg flex items-center gap-2">
                                    <CheckCircle size={18} className="text-accent-600 dark:text-accent-400 shrink-0" weight="fill" />
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Pilihan terbanyak</p>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                                            {topPollingOption.opsi}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-3">
                                {polling.options?.map((opt) => {
                                    const percent = totalVotes > 0
                                        ? Math.round((opt.votes / totalVotes) * 100)
                                        : 0;
                                    return (
                                        <div key={opt.id}>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-600 dark:text-slate-400 truncate">
                                                    {opt.opsi}
                                                </span>
                                                <span className="font-medium text-slate-900 dark:text-white shrink-0 ml-2">
                                                    {opt.votes} ({percent}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                                                <div
                                                    className="bg-primary-500 dark:bg-accent-400 h-1.5 rounded-full transition-all duration-500"
                                                    style={{ width: `${percent}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <p className="mt-4 text-xs text-slate-400 text-center">
                                Total {totalVotes} suara dari pengunjung
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}