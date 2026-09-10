import useReveal from '@/hooks/useReveal';

export default function Galeri() {
    const titleRef = useReveal();
    const images = [
        { src: 'https://picsum.photos/seed/gallery1/600/400', label: 'Kegiatan Keagamaan' },
        { src: 'https://picsum.photos/seed/gallery2/600/400', label: 'Upacara Bendera' },
        { src: 'https://picsum.photos/seed/gallery3/600/400', label: 'Pramuka' },
        { src: 'https://picsum.photos/seed/gallery4/600/400', label: 'Lomba Tahfidz' },
        { src: 'https://picsum.photos/seed/gallery5/600/400', label: 'Futsal' },
        { src: 'https://picsum.photos/seed/gallery6/600/400', label: 'Hadrah' },
    ];

    return (
        <section id="galeri" className="py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Galeri Kegiatan</h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Dokumentasi kegiatan sekolah</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative overflow-hidden rounded-2xl group reveal">
                            <img src={img.src} alt={img.label} className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                            <div className="absolute inset-0 bg-primary-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-sm font-medium">{img.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}