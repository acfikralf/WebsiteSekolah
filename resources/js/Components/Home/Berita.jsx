import useReveal from '@/hooks/useReveal';
import { CalendarDots, ArrowRight } from '@phosphor-icons/react';

export default function Berita() {
    const titleRef = useReveal();

    const news = [
        {
            img: 'https://picsum.photos/seed/news1/600/400',
            badge: 'Kegiatan',
            badgeColor: 'bg-accent-500',
            date: '12 September 2025',
            title: 'Peringatan Maulid Nabi Muhammad SAW 1447 H',
            desc: 'SMP Islam Watestanjung menggelar peringatan Maulid Nabi dengan berbagai kegiatan islami.',
        },
        {
            img: 'https://picsum.photos/seed/news2/600/400',
            badge: 'Prestasi',
            badgeColor: 'bg-secondary-500',
            date: '28 Agustus 2025',
            title: 'Siswa Raih Juara 1 Olimpiade Sains Kabupaten',
            desc: 'Prestasi membanggakan kembali diraih oleh siswa SMP Islam Watestanjung dalam ajang OSN.',
        },
        {
            img: 'https://picsum.photos/seed/news3/600/400',
            badge: 'Ekstrakurikuler',
            badgeColor: 'bg-primary-500',
            date: '15 Agustus 2025',
            title: 'Perkemahan Pramuka Penggalang 2025',
            desc: 'Kegiatan perkemahan untuk melatih kemandirian dan kerjasama antar siswa.',
        },
    ];

    return (
        <section id="berita" className="py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Berita Terbaru</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Informasi dan kegiatan terkini sekolah</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item, idx) => (
                        <article key={idx} className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col reveal">
                            <div className="relative overflow-hidden">
                                <img src={item.img} alt={item.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                <span className={`absolute top-3 left-3 ${item.badgeColor} text-white text-xs font-medium px-3 py-1 rounded-full shadow`}>{item.badge}</span>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
                                    <CalendarDots size={16} className="mr-1" />
                                    <time>{item.date}</time>
                                </div>
                                <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors">{item.title}</h3>
                                <p className="mt-2 text-slate-600 dark:text-slate-300 line-clamp-3 flex-grow">{item.desc}</p>
                                <a href="#" className="mt-4 inline-flex items-center text-primary-600 dark:text-accent-400 font-medium hover:text-primary-700 group/link">
                                    Baca Selengkapnya
                                    <ArrowRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="text-center mt-10 reveal">
                    <a href="#" className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-600/20 hover:shadow-primary-700/30 transition-all hover:-translate-y-0.5">
                        Lihat Semua Berita
                        <ArrowRight size={20} className="ml-2" />
                    </a>
                </div>
            </div>
        </section>
    );
}