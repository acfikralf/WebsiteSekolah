import MainLayout from '@/Layouts/MainLayout';
import useReveal from '@/hooks/useReveal';
import {
    Eye, Target, CheckCircle, MapPin, Phone, Envelope, Calendar,
    StudentIcon, IdentificationCard, ArrowRight, UserCircle, Flag, Rocket, Clock
} from '@phosphor-icons/react';

export default function Profil({ profil = {} }) {
    const misiList = (profil.misi || '').split('\n').map(m => m.trim()).filter(Boolean);
    const tujuanList = (profil.tujuan || '').split('\n').map(t => t.trim()).filter(Boolean);

    const timelineList = (profil.timeline || '').split('\n').filter(Boolean).map(line => {
        const [tahun, ...desc] = line.split('|');
        return { tahun: tahun?.trim(), deskripsi: desc.join('|').trim() };
    });

    const programList = (profil.program || '').split('\n').filter(Boolean).map(line => {
        const [nama, ...desc] = line.split('|');
        return { nama: nama?.trim(), deskripsi: desc.join('|').trim() };
    });

    const kepalaFotoUrl = profil.kepala_foto ? `/storage/${profil.kepala_foto}` : null;

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
            {/* ===== HERO — gradient hijau ke kuning (hijau lebih gelap) ===== */}
            <section className="relative bg-gradient-to-r from-emerald-900 via-emerald-700 to-yellow-500 text-white overflow-hidden">
                {/* Hiasan lingkaran tipis, bukan blur */}
                <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-2xl">
                        {/* Tulisan Profil Sekolah dibiarkan KUNING */}
                        <p className="inline-flex items-center gap-2 text-yellow-300 font-medium uppercase tracking-wider mb-4 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                            <StudentIcon size={16} /> Profil Sekolah
                        </p>
                        <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                            Mengenal Lebih Dekat<br />
                            <span className="text-yellow-300">
                                SMP Islam Watestanjung
                            </span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* ===== BODY WRAPPER ===== */}
            <div className="bg-slate-50 dark:bg-slate-950">
                {/* Sejarah */}
                {profil.sejarah && (
                    <section className="py-16 md:py-20">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">Sejarah Singkat</h2>
                            <div className="w-24 h-1 bg-accent-500 mx-auto mb-8 rounded-full"></div>
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-justify md:text-center">
                                {profil.sejarah}
                            </p>
                        </div>
                    </section>
                )}

                {/* Sambutan */}
                {profil.sambutan && (
                    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-900 islamic-pattern">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[180px_1fr] md:grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-start md:items-center">
                                <div className="relative mt-1 md:mt-0">
                                    <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-30"></div>
                                    {kepalaFotoUrl ? (
                                        <img src={kepalaFotoUrl} alt={profil.kepala_nama} className="relative w-full rounded-xl sm:rounded-3xl shadow-lg sm:shadow-xl object-cover aspect-[3/4]" />
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
                                    <div className="text-left mt-3 sm:mt-6">
                                        <a href="/profil" className="inline-flex items-center justify-center px-3 py-1.5 sm:px-0 sm:py-0 bg-primary-50 sm:bg-transparent dark:bg-slate-800 sm:dark:bg-transparent rounded-md sm:rounded-none text-[11px] sm:text-base text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 group transition-colors w-full sm:w-auto">
                                            Baca Selengkapnya
                                            <ArrowRight className="ml-1 sm:ml-1.5 w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Timeline */}
                {timelineList.length > 0 && (
                    <section className="py-16 md:py-20">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Timeline Perkembangan</h2>
                                <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                            </div>
                            <div className="relative border-l-4 border-primary-200 dark:border-slate-700 ml-4 md:ml-0 md:pl-0">
                                {timelineList.map((item, idx) => (
                                    <div key={idx} className="mb-10 ml-8 relative">
                                        <span className="absolute -left-12 top-1 w-8 h-8 bg-primary-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-primary-600 dark:bg-accent-400 rounded-full"></div>
                                        </span>
                                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                                            <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-bold rounded-full mb-3">
                                                {item.tahun}
                                            </span>
                                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.deskripsi}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Visi Misi Tujuan */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Visi, Misi & Tujuan</h2>
                            <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <Eye size={28} className="text-primary-600 dark:text-accent-400" />
                                    <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">Visi</h3>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{profil.visi}</p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <Target size={28} className="text-primary-600 dark:text-accent-400" />
                                    <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">Misi</h3>
                                </div>
                                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                                    {misiList.map((misi, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle size={18} className="mt-0.5 text-primary-500 shrink-0" />
                                            <span className="text-sm">{misi}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <Flag size={28} className="text-primary-600 dark:text-accent-400" />
                                    <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">Tujuan</h3>
                                </div>
                                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                                    {tujuanList.map((tujuan, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle size={18} className="mt-0.5 text-primary-500 shrink-0" />
                                            <span className="text-sm">{tujuan}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Program Unggulan - Diubah jadi 2 kolom di HP */}
                {programList.length > 0 && (
                    <section className="py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-8 sm:mb-12">
                                <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Program Unggulan</h2>
                                <div className="w-12 sm:w-24 h-1 bg-accent-500 mx-auto mt-2 sm:mt-4 rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                                {programList.map((prog, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4">
                                            <Rocket className="w-4 h-4 sm:w-6 sm:h-6" />
                                        </div>
                                        <h3 className="font-display font-semibold text-[11px] sm:text-lg text-slate-900 dark:text-white mb-1 sm:mb-2 leading-tight">{prog.nama}</h3>
                                        <p className="text-[9px] sm:text-sm text-slate-600 dark:text-slate-300 leading-snug line-clamp-3 sm:line-clamp-none">{prog.deskripsi}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Informasi Kontak - Diubah jadi 2 kolom di HP */}
                {dataSekolah.length > 0 && (
                    <section className="py-12 sm:py-16 md:py-20">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-8 sm:mb-12">
                                <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Informasi Kontak</h2>
                                <div className="w-12 sm:w-24 h-1 bg-accent-500 mx-auto mt-2 sm:mt-4 rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                                {dataSekolah.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 sm:p-5 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 flex items-center justify-center shrink-0">
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div className="min-w-0 flex-1 mt-1 sm:mt-0">
                                                <p className="text-[8px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-0.5 sm:mb-1">{item.label}</p>
                                                <p className="text-[10px] sm:text-sm text-slate-900 dark:text-white font-medium break-words leading-tight">{item.value}</p>
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