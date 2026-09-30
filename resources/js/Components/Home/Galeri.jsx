import { useState } from 'react';
import useReveal from '@/hooks/useReveal';
import { usePage } from '@inertiajs/react'

export default function Galeri() {
    const titleRef = useReveal();
     const { galeris } = usePage().props;
    const [lightbox, setLightbox] = useState(null);

    // Tampilkan maksimal 6 di halaman depan
    const items = galeris.slice(0, 6);

    return (
        <section id="galeri" className="py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Galeri Kegiatan
                    </h2>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Dokumentasi kegiatan sekolah
                    </p>
                </div>

                {items.length === 0 ? (
                    <p className="text-center text-slate-500">Belum ada gambar galeri.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setLightbox(item)}
                                className="relative overflow-hidden rounded-2xl group reveal cursor-pointer"
                            >
                                <img
                                    src={item.gambar_url}
                                    alt={item.judul || 'Galeri'}
                                    className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-primary-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-sm font-medium text-center px-3">
                                        {item.judul || item.kategori || 'Lihat'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tombol lihat semua */}
                {galeris.length > 6 && (
                    <div className="text-center mt-10">
                        <a
                            href="#"
                            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5"
                        >
                            Lihat Semua Galeri
                            <i className="ph ph-arrow-right ml-2"></i>
                        </a>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    onClick={() => setLightbox(null)}
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                >
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute top-4 right-4 text-white text-3xl hover:text-accent-400"
                    >
                        <i className="ph ph-x"></i>
                    </button>
                    <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={lightbox.gambar_url}
                            alt={lightbox.judul || 'Galeri'}
                            className="w-full max-h-[80vh] object-contain rounded-xl"
                        />
                        {(lightbox.judul || lightbox.kategori) && (
                            <div className="mt-4 text-center text-white">
                                {lightbox.judul && <p className="font-display font-semibold text-lg">{lightbox.judul}</p>}
                                {lightbox.kategori && <p className="text-sm text-white/70 mt-1">{lightbox.kategori}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}