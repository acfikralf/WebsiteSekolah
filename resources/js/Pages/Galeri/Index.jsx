import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';

export default function GaleriIndex({ galeris = [] }) {
    const [lightbox, setLightbox] = useState(null);

    return (
        <MainLayout>
            <div className="bg-primary-700 dark:bg-primary-900 text-white py-16 relative overflow-hidden islamic-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Galeri Sekolah</h1>
                    <p className="text-lg text-primary-100 max-w-2xl">Dokumentasi kegiatan, fasilitas, dan momen berharga di sekolah kami.</p>
                </div>
            </div>

            <div className="py-16 md:py-20 bg-white dark:bg-slate-900 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galeris.map((item) => (
                            <div key={item.id} onClick={() => setLightbox(item)} className="relative overflow-hidden rounded-2xl group cursor-pointer aspect-square">
                                <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                                    <span className="text-white text-sm font-medium">{item.judul || 'Lihat'}</span>
                                </div>
                            </div>
                        ))}
                        {galeris.length === 0 && <p className="col-span-full text-center text-slate-500">Belum ada foto galeri.</p>}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightbox && (
                <div onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <button className="absolute top-4 right-4 text-white text-3xl hover:text-accent-400"><i className="ph ph-x"></i></button>
                    <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img src={lightbox.gambar_url} alt={lightbox.judul} className="w-full max-h-[80vh] object-contain rounded-xl" />
                        <div className="mt-4 text-center">
                            <p className="text-white font-display text-lg">{lightbox.judul}</p>
                            <p className="text-white/70 text-sm">{lightbox.kategori}</p>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}