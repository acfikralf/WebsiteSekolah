
import MainLayout from '@/Layouts/MainLayout';
import {
    Eye,
    Target,
    CheckCircle,
    MapPin,
    Phone,
    Envelope,
    Calendar,
    StudentIcon,
    IdentificationCard,
    UserCircle,
    Flag,
    Rocket,
} from '@phosphor-icons/react';

export default function Profil({ profil = {} }) {
    // Memproses daftar Misi dan Tujuan
    const parseList = (value) => {
        return (value || '')
            .split(/\r?\n/)
            .map((item) => item.trim())
            .filter(Boolean);
    };

    // Memproses Timeline dan Program
    // Baris kosong dan baris yang hanya berisi | tidak akan ditampilkan
    const parseItems = (value) => {
        return (value || '')
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
                const [nama, ...desc] = line.split('|');

                return {
                    nama: nama?.trim() || '',
                    deskripsi: desc.join('|').trim(),
                };
            })
            .filter((item) => item.nama || item.deskripsi);
    };

    const misiList = parseList(profil.misi);
    const tujuanList = parseList(profil.tujuan);

    const timelineList = parseItems(profil.timeline);
    const programList = parseItems(profil.program);

    const kepalaFotoUrl = profil.kepala_foto
        ? `/storage/${profil.kepala_foto}`
        : null;

    const dataSekolah = [
        { icon: IdentificationCard, label: 'NPSN', value: profil.npsn },
        { icon: StudentIcon, label: 'Status', value: profil.status },
        { icon: Calendar, label: 'Tahun Berdiri', value: profil.tahun_berdiri },
        { icon: MapPin, label: 'Alamat', value: profil.alamat },
        { icon: Phone, label: 'Telepon / WA', value: profil.telepon },
        { icon: Envelope, label: 'Email', value: profil.email },
    ].filter((item) => item.value);

    return (
        <MainLayout>
            {/* HERO */}
            <section className="relative bg-gradient-to-r from-emerald-900 via-emerald-700 to-yellow-500 text-white overflow-hidden">
                <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 text-yellow-300 font-medium uppercase tracking-wider mb-4 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                            <StudentIcon size={16} />
                            Profil Sekolah
                        </p>

                        <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                            Mengenal Lebih Dekat
                            <br />
                            <span className="text-yellow-300">
                                SMP Islam Watestanjung
                            </span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* BODY */}
            <div className="bg-slate-50 dark:bg-slate-950">

                {/* SEJARAH */}
                {profil.sejarah && (
                    <section className="py-16 md:py-20">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
                                Sejarah Singkat
                            </h2>

                            <div className="w-24 h-1 bg-accent-500 mx-auto mb-8 rounded-full"></div>

                            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-justify md:text-center">
                                {profil.sejarah}
                            </p>
                        </div>
                    </section>
                )}

                {/* SAMBUTAN */}
                {profil.sambutan && (
                    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-900 islamic-pattern">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[180px_1fr] md:grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-start md:items-center">

                                <div className="relative mt-1 md:mt-0">
                                    <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-30"></div>

                                    {kepalaFotoUrl ? (
                                        <img
                                            src={kepalaFotoUrl}
                                            alt={profil.kepala_nama || 'Kepala Sekolah'}
                                            className="relative w-full rounded-xl sm:rounded-3xl shadow-lg sm:shadow-xl object-cover aspect-[3/4]"
                                        />
                                    ) : (
                                        <div className="relative w-full aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-xl sm:rounded-3xl flex items-center justify-center text-slate-400">
                                            <UserCircle className="w-10 h-10 sm:w-24 sm:h-24" weight="thin" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="mb-2 sm:mb-6 text-left">
                                        <p className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-1">
                                            Sambutan
                                        </p>

                                        <h2 className="text-lg sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                                            Kepala Sekolah
                                        </h2>

                                        <div className="w-10 sm:w-16 h-1 bg-primary-600 dark:bg-accent-400 mt-2 sm:mt-4 rounded-full"></div>
                                    </div>

                                    <div className="prose prose-sm sm:prose-base prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-justify md:text-left">
                                        <p className="whitespace-pre-line leading-relaxed text-[11px] sm:text-base">
                                            {profil.sambutan}
                                        </p>
                                    </div>

                                    <div className="mt-3 sm:mt-6 text-left">
                                        <p className="font-display font-semibold text-xs sm:text-lg text-slate-900 dark:text-white">
                                            {profil.kepala_nama}
                                        </p>

                                        <p className="text-[10px] sm:text-sm text-slate-500 dark:text-slate-400">
                                            Kepala SMP Islam Watestanjung
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* TIMELINE */}
                {timelineList.length > 0 && (
                    <section className="py-16 md:py-20">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                                    Timeline Perkembangan
                                </h2>

                                <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="relative border-l-4 border-primary-200 dark:border-slate-700 ml-4 md:ml-0 md:pl-0">
                                {timelineList.map((item, idx) => (
                                    <div key={idx} className="mb-8 last:mb-0 ml-8 relative">
                                        <span className="absolute -left-12 top-1 w-8 h-8 bg-primary-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 rounded-full flex items-center justify-center">
                                            <span className="w-2 h-2 bg-primary-600 dark:bg-accent-400 rounded-full"></span>
                                        </span>

                                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                                            {item.nama && (
                                                <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-bold rounded-full mb-3">
                                                    {item.nama}
                                                </span>
                                            )}

                                            {item.deskripsi && (
                                                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                                    {item.deskripsi}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* VISI MISI TUJUAN */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                                Visi, Misi & Tujuan
                            </h2>

                            <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">

                            {/* VISI */}
                            <div className="h-full bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <Eye size={26} className="text-primary-600 dark:text-accent-400 shrink-0" />

                                    <h3 className="text-lg sm:text-xl font-display font-semibold text-slate-900 dark:text-white">
                                        Visi
                                    </h3>
                                </div>

                                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {profil.visi || 'Belum ada data visi.'}
                                </p>
                            </div>

                            {/* MISI */}
                            <div className="h-full bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <Target size={26} className="text-primary-600 dark:text-accent-400 shrink-0" />

                                    <h3 className="text-lg sm:text-xl font-display font-semibold text-slate-900 dark:text-white">
                                        Misi
                                    </h3>
                                </div>

                                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                                    {misiList.map((misi, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <CheckCircle size={17} className="mt-1 text-primary-500 shrink-0" />

                                            <span className="text-sm leading-relaxed min-w-0 break-words">
                                                {misi}
                                            </span>
                                        </li>
                                    ))}

                                    {misiList.length === 0 && (
                                        <li className="text-sm text-slate-500">
                                            Belum ada data misi.
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* TUJUAN */}
                            <div className="h-full bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <Flag size={26} className="text-primary-600 dark:text-accent-400 shrink-0" />

                                    <h3 className="text-lg sm:text-xl font-display font-semibold text-slate-900 dark:text-white">
                                        Tujuan
                                    </h3>
                                </div>

                                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                                    {tujuanList.map((tujuan, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <CheckCircle size={17} className="mt-1 text-primary-500 shrink-0" />

                                            <span className="text-sm leading-relaxed min-w-0 break-words">
                                                {tujuan}
                                            </span>
                                        </li>
                                    ))}

                                    {tujuanList.length === 0 && (
                                        <li className="text-sm text-slate-500">
                                            Belum ada data tujuan.
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROGRAM UNGGULAN */}
                {programList.length > 0 && (
                    <section className="py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-8 sm:mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                                    Program Unggulan
                                </h2>

                                <div className="w-12 sm:w-24 h-1 bg-accent-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 items-stretch">
                                {programList.map((prog, idx) => (
                                    <div
                                        key={idx}
                                        className="h-full min-w-0 bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                            <Rocket className="w-4 h-4 sm:w-6 sm:h-6" />
                                        </div>

                                        {prog.nama && (
                                            <h3 className="font-display font-semibold text-xs sm:text-lg text-slate-900 dark:text-white mb-2 leading-snug break-words">
                                                {prog.nama}
                                            </h3>
                                        )}

                                        {prog.deskripsi && (
                                            <p className="text-[11px] sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                                                {prog.deskripsi}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* INFORMASI KONTAK */}
                {dataSekolah.length > 0 && (
                    <section className="py-12 sm:py-16 md:py-20">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-8 sm:mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                                    Informasi Kontak
                                </h2>

                                <div className="w-12 sm:w-24 h-1 bg-accent-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                                {dataSekolah.map((item, idx) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={idx}
                                            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 sm:p-5 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
                                        >
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 flex items-center justify-center shrink-0">
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>

                                            <div className="min-w-0 flex-1 mt-1 sm:mt-0">
                                                <p className="text-[9px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1">
                                                    {item.label}
                                                </p>

                                                <p className="text-xs sm:text-sm text-slate-900 dark:text-white font-medium break-words leading-relaxed">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </MainLayout>
    );
}
