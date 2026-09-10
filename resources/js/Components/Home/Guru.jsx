import useReveal from '@/hooks/useReveal';

export default function Guru() {
    const titleRef = useReveal();
    const teachers = [
        { img: 'https://picsum.photos/seed/teacher1/400/500', name: 'Ust. Ahmad Fauzi, S.Pd.I.', role: 'Kepala Sekolah', subject: 'Pendidikan Agama Islam' },
        { img: 'https://picsum.photos/seed/teacher2/400/500', name: 'Siti Aminah, S.Pd.', role: 'Guru Matematika', subject: 'Wali Kelas 9A' },
        { img: 'https://picsum.photos/seed/teacher3/400/500', name: 'Budi Santoso, S.Pd.', role: 'Guru IPA', subject: 'Pembina OSN' },
        { img: 'https://picsum.photos/seed/teacher4/400/500', name: 'Dewi Lestari, S.Pd.', role: 'Guru Bahasa Inggris', subject: 'Wali Kelas 7B' },
    ];

    return (
        <section id="guru" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Guru Kami</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Pendidik profesional dan berdedikasi</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teachers.map((teacher, idx) => (
                        <div key={idx} className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 reveal">
                            <div className="aspect-[3/4] overflow-hidden relative">
                                <img src={teacher.img} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">{teacher.name}</h3>
                                <p className="text-sm text-primary-600 dark:text-accent-400 mt-1">{teacher.role}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{teacher.subject}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}