import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Image as ImageIcon } from '@phosphor-icons/react';

export default function GaleriIndex({ galeris = [] }) {
    const [lightbox, setLightbox] = useState(null);
    console.log('galeris:', galeris);

    return (
        <MainLayout>
            {/* ===== HERO — gradient hijau ke kuning (disamakan dengan Profil) ===== */}
            <section className="relative bg-gradient-to-r from-emerald-900 via-emerald-700 to-yellow-500 text-white overflow-hidden">
                {/* Hiasan lingkaran tipis, bukan blur */}
                <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 text-yellow-300 font-medium uppercase tracking-wider mb-4 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                            <ImageIcon size={16} /> Galeri Sekolah
                        </p>
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                            Momen & Kegiatan<br />
                            <span className="text-yellow-300">
                                Berharga Kami
                            </span>
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl">
                            Dokumentasi kegiatan, fasilitas, dan momen berharga di sekolah kami.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== BODY WRAPPER ===== */}
            <div className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Grid 4 kolom di HP, 4 di Desktop */}
                    <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
                        {galeris.map((item) => (
                            <div 
                                key={item.id} 
                                onClick={() => setLightbox(item)} 
                                className="relative overflow-hidden rounded-lg sm:rounded-2xl group cursor-pointer aspect-square"
                            >
                                <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                
                                {/* Overlay Hover */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 sm:p-4 text-center">
                                    <span className="text-white text-[9px] sm:text-sm font-medium line-clamp-2">
                                        {item.judul || 'Lihat'}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {galeris.length === 0 && <p className="col-span-full text-center text-xs sm:text-base text-slate-500">Belum ada foto galeri.</p>}
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