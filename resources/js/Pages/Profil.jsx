import MainLayout from '@/Layouts/MainLayout';
import useReveal from '@/hooks/useReveal';
import {
    Eye, Target, CheckCircle, MapPin, Phone, Envelope, Calendar,
    StudentIcon , IdentificationCard, ArrowRight, UserCircle, Flag, Rocket, Clock
} from '@phosphor-icons/react';

export default function Profil({ profil = {} }) {
    // Parser data dari form admin
    const misiList = (profil.misi || '').split('\n').map(m => m.trim()).filter(Boolean);
    const tujuanList = (profil.tujuan || '').split('\n').map(t => t.trim()).filter(Boolean);
    
    // Parser Timeline: "1998 | Berdiri"
    const timelineList = (profil.timeline || '').split('\n').filter(Boolean).map(line => {
        const [tahun, ...desc] = line.split('|');
        return { tahun: tahun?.trim(), deskripsi: desc.join('|').trim() };
    });

    // Parser Program: "Tahfidz | Deskripsi"
    const programList = (profil.program || '').split('\n').filter(Boolean).map(line => {
        const [nama, ...desc] = line.split('|');
        return { nama: nama?.trim(), deskripsi: desc.join('|').trim() };
    });

    const kepalaFotoUrl = profil.kepala_foto ? `/storage/${profil.kepala_foto}` : null;

    const dataSekolah = [
        { icon: IdentificationCard, label: 'NPSN', value: profil.npsn },
        { icon: StudentIcon , label: 'Status', value: profil.status },
        { icon: Calendar, label: 'Tahun Berdiri', value: profil.tahun_berdiri },
        { icon: MapPin, label: 'Alamat', value: profil.alamat },
        { icon: Phone, label: 'Telepon / WA', value: profil.telepon },
        { icon: Envelope, label: 'Email', value: profil.email },
    ].filter((item) => item.value);

    return (
        <MainLayout>
            {/* ===== HERO ===== */}
            <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden islamic-pattern">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 text-accent-400 font-medium uppercase tracking-wider mb-4 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                            <StudentIcon  size={16} /> Profil Sekolah
                        </p>
                        <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
                            Mengenal Lebih Dekat<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
                                SMP Islam Watestanjung
                            </span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* ===== SEJARAH ===== */}
            {profil.sejarah && (
                <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">Sejarah Singkat</h2>
                        <div className="w-24 h-1 bg-accent-500 mx-auto mb-8 rounded-full"></div>
                        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-justify md:text-center">
                            {profil.sejarah}
                        </p>
                    </div>
                </section>
            )}

            {/* ===== SAMBUTAN KEPALA SEKOLAH ===== */}
            {profil.sambutan && (
                <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 islamic-pattern">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-3xl blur-2xl opacity-30"></div>
                                {kepalaFotoUrl ? (
                                    <img src={kepalaFotoUrl} alt={profil.kepala_nama} className="relative w-full max-w-md mx-auto rounded-3xl shadow-xl" />
                                ) : (
                                    <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-400">
                                        <UserCircle size={120} weight="thin" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-2">Sambutan</p>
                                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">Kepala Sekolah</h2>
                                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed mb-6 text-justify">
                                    {profil.sambutan}
                                </p>
                                <div>
                                    <p className="font-display font-semibold text-lg text-slate-900 dark:text-white">{profil.kepala_nama}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Kepala SMP Islam Watestanjung</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ===== TIMELINE ===== */}
            {timelineList.length > 0 && (
                <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
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
                                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
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

            {/* ===== VISI MISI TUJUAN ===== */}
            <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Visi, Misi & Tujuan</h2>
                        <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Visi */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye size={28} className="text-primary-600 dark:text-accent-400" />
                                <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">Visi</h3>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{profil.visi}</p>
                        </div>

                        {/* Misi */}
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

                        {/* Tujuan */}
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

            {/* ===== PROGRAM UNGGULAN ===== */}
            {programList.length > 0 && (
                <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Program Unggulan</h2>
                            <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {programList.map((prog, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 rounded-xl flex items-center justify-center mb-4">
                                        <Rocket size={24} />
                                    </div>
                                    <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-2">{prog.nama}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{prog.deskripsi}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== DATA KONTAK & SEKOLAH ===== */}
            {dataSekolah.length > 0 && (
                <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Informasi Kontak</h2>
                            <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dataSekolah.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-accent-400 flex items-center justify-center shrink-0">
                                            <Icon size={20} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1">{item.label}</p>
                                            <p className="text-slate-900 dark:text-white font-medium break-words text-sm">{item.value}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}