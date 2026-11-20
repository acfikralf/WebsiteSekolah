import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { CalendarDots, ArrowLeft, Tag, User, ArrowRight } from '@phosphor-icons/react';

export default function BeritaShow({ berita, beritaLainnya = [] }) {
    // Format tanggal
    const formatTanggal = (tgl) => {
        return new Date(tgl).toLocaleDateString('id-ID', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <MainLayout>
            {/* Header / Hero */}
            <div className="bg-slate-900 text-white pt-12 pb-32 relative overflow-hidden">
                {berita.gambar_url && (
                    <div className="absolute inset-0 opacity-20">
                        <img src={berita.gambar_url} alt={berita.judul} className="w-full h-full object-cover blur-sm" />
                    </div>
                )}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/berita" className="inline-flex items-center text-accent-400 hover:text-accent-300 font-medium mb-6 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Kembali ke Daftar Berita
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-4">
                        <span className="bg-accent-500 text-white font-medium px-3 py-1 rounded-full flex items-center gap-1">
                            <Tag size={14} /> {berita.kategori}
                        </span>
                        <span className="flex items-center gap-1">
                            <CalendarDots size={16} /> {formatTanggal(berita.tanggal)}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-4">
                        {berita.judul}
                    </h1>
                </div>
            </div>

            {/* Konten Utama */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 mb-16">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    {/* Gambar Utama */}
                    {berita.gambar_url && (
                        <img 
                            src={berita.gambar_url} 
                            alt={berita.judul} 
                            className="w-full h-auto max-h-[500px] object-cover" 
                        />
                    )}

                    <div className="p-6 md:p-10">
                        {/* Ringkasan */}
                        {berita.ringkasan && (
                            <p className="text-lg font-medium text-slate-600 dark:text-slate-400 italic border-l-4 border-primary-500 pl-4 mb-8">
                                "{berita.ringkasan}"
                            </p>
                        )}

                        {/* Isi Berita */}
                        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                            {/* whitespace-pre-line agar enter/paragraf dari admin terbaca */}
                            <div className="whitespace-pre-line leading-relaxed text-justify md:text-left">
                                {berita.konten}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rekomendasi Berita Lainnya */}
            {beritaLainnya.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-950 py-16 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                                Berita Lainnya
                            </h2>
                            <Link href="/berita" className="text-primary-600 dark:text-accent-400 font-medium hover:underline flex items-center gap-1">
                                Lihat Semua <ArrowRight size={16} />
                            </Link>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            {beritaLainnya.map((item) => (
                                <Link key={item.id} href={`/berita/${item.id}`} className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 flex flex-col">
                                    <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        {item.gambar_url ? (
                                            <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <i className="ph ph-image text-4xl"></i>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <span className="text-xs text-primary-600 dark:text-accent-400 font-medium mb-2">{item.kategori}</span>
                                        <h3 className="font-display font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2 mb-2">
                                            {item.judul}
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-auto">{formatTanggal(item.tanggal)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}