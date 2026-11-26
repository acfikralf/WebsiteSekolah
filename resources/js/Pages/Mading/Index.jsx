import { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Modal from '@/Components/Modal';
import { 
    Plus, Image as ImageIcon, BookOpen, 
    CheckCircle, X 
} from '@phosphor-icons/react';

export default function MadingIndex({ madings = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [preview, setPreview] = useState(null);
    const [selectedMading, setSelectedMading] = useState(null);
    const [toast, setToast] = useState(null);

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            setToast(flash.success);
            setTimeout(() => setToast(null), 4000);
        }
    }, [flash]);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama_murid: '',
        kelas: '',
        judul: '',
        kategori: 'Gambar/Poster',
        konten: '',
        gambar: null,
    });

    const handleImage = (e) => {
        const file = e.target.files[0];
        setData('gambar', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('mading.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowForm(false);
                reset();
                setPreview(null);
            },
        });
    };

    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];

    return (
        <MainLayout>
            {/* Notifikasi Toast */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 bg-green-600 text-white rounded-xl shadow-2xl animate-slide-in-right">
                    <CheckCircle size={24} weight="fill" />
                    <span className="text-sm font-medium pr-2">{toast}</span>
                    <button onClick={() => setToast(null)} className="hover:bg-green-700 p-1 rounded-full"><X size={16} /></button>
                </div>
            )}

            {/* ===== HERO — WARNA HIJAU CERAH ===== */}
            <section 
                className="relative text-white overflow-hidden"
                style={{ background: 'linear-gradient(to bottom right, #059669, #047857)' }}
            >
                <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 border-[30px] border-white/10 rounded-full"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 text-yellow-300 font-medium uppercase tracking-wider mb-4 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
                            <BookOpen size={16} /> Mading Digital
                        </p>
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                            Pameran Karya<br />
                            <span className="text-yellow-300">Murid Kami</span>
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl">
                            Pameran karya dan kreativitas murid-murid SMP Islam Watestanjung.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== PAPAN MADING (JARAK SAMPING = JARAK ATAS) ===== */}
            <div className="p-3 sm:p-12 lg:p-20 bg-slate-100 dark:bg-slate-950">
                
                {/* Container papan dengan bingkai */}
                <div 
                    className="relative w-full rounded-lg shadow-2xl overflow-hidden"
                    style={{ 
                        backgroundColor: '#d4a373', // Warna gabus
                        backgroundImage: 'radial-gradient(#b5835a 1.5px, transparent 1.5px)', // Pola titik gabus
                        backgroundSize: '24px 24px',
                    }}
                >
                    {/* Bingkai Kayu (Frame) */}
                    <div className="absolute inset-0 border-[8px] sm:border-[16px] border-[#8b5a2b] pointer-events-none rounded-lg z-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]"></div>
                    <div className="absolute inset-[8px] sm:inset-[16px] border-2 border-[#6b4226] pointer-events-none rounded-sm z-0"></div>

                    {/* Konten di dalam papan */}
                    {/* Perbaikan: Padding HP (p-5) dibuat lebih lega dari sebelumnya (p-3) */}
                    <div className="relative z-10 p-5 sm:p-12 min-h-[500px]">
                        
                        {/* Tombol Buat Karya Baru */}
                        <div className="flex justify-end mb-5 sm:mb-6 relative z-20">
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center px-3 py-1.5 sm:px-5 sm:py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-[10px] sm:text-base font-bold rounded-lg sm:rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                            >
                                <Plus size={14} className="mr-1 sm:mr-2 sm:w-5 sm:h-5" /> Buat Karya Baru
                            </button>
                        </div>

                        {madings.length === 0 ? (
                            <div className="text-center py-20 text-slate-700 bg-white/30 backdrop-blur-sm rounded-xl border-2 border-dashed border-white/50">
                                <BookOpen size={64} className="mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-bold">Mading masih kosong.</p>
                                <p className="text-sm mt-1">Jadilah yang pertama mengirimkan karya!</p>
                            </div>
                        ) : (
                            /* 
                             * GRID RESPONSIF:
                             * Di HP: 3 kolom (grid-cols-3)
                             * Di Desktop: 4 kolom (xl:grid-cols-4) sesuai kode asli Anda
                             */
                            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 xl:gap-8 py-4">
                                {madings.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => setSelectedMading(item)}
                                        className={`group bg-white p-2 sm:p-3 pb-4 sm:pb-8 shadow-md sm:shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl relative ${rotations[index % rotations.length]}`}
                                    >
                                        {/* Selotip Kertas (Dikecilkan di HP) */}
                                        <div className="absolute -top-1.5 sm:-top-3 left-1/2 -translate-x-1/2 w-12 sm:w-20 h-4 sm:h-6 bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm sm:shadow-md -rotate-2 z-20"></div>
                                        
                                        {/* Pin payung (Dikecilkan di HP) */}
                                        <div className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 shadow-sm sm:shadow-md z-30 border border-red-700 sm:border-2"></div>

                                        <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative mb-2 sm:mb-4">
                                            {item.gambar_url ? (
                                                <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <BookOpen size={20} className="sm:w-12 sm:h-12" />
                                                </div>
                                            )}
                                            {/* Badge Kategori disembunyikan di HP agar tidak menutupi gambar */}
                                            <span className="hidden sm:block absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider backdrop-blur-sm">
                                                {item.kategori}
                                            </span>
                                        </div>

                                        <div className="text-center px-0.5 sm:px-1">
                                            <h3 className="font-display font-bold text-[9px] sm:text-lg text-slate-800 line-clamp-2 leading-tight mb-1 sm:mb-2">
                                                {item.judul}
                                            </h3>
                                            <div className="w-6 sm:w-8 h-0.5 bg-slate-300 mx-auto mb-1.5 sm:mb-3"></div>
                                            <p className="text-[7px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                                                {item.nama_murid}
                                            </p>
                                            <p className="text-[7px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                                                {item.kelas}
                                            </p>
                                            
                                            {/* Teks konten disembunyikan di HP */}
                                            {item.konten && (
                                                <p className="hidden sm:block text-sm text-slate-600 line-clamp-2 italic mt-3 font-serif">
                                                    "{item.konten}"
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Baca Karya */}
            {selectedMading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSelectedMading(null)}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
                            <div>
                                <span className="text-xs font-bold text-accent-500 uppercase">{selectedMading.kategori}</span>
                                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">{selectedMading.judul}</h3>
                                <p className="text-sm text-slate-500">Oleh: {selectedMading.nama_murid} (Kelas {selectedMading.kelas})</p>
                            </div>
                            <button onClick={() => setSelectedMading(null)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:bg-slate-200">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="max-h-[70vh] overflow-y-auto">
                            {selectedMading.gambar_url && (
                                <img src={selectedMading.gambar_url} alt={selectedMading.judul} className="w-full h-auto max-h-[40vh] object-contain bg-slate-100 dark:bg-slate-950" />
                            )}
                            {selectedMading.konten && (
                                <div className="p-6">
                                    <p className="whitespace-pre-line text-slate-700 dark:text-slate-300 leading-relaxed text-justify font-serif">
                                        {selectedMading.konten}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Form Kirim Karya */}
            <Modal show={showForm} onClose={() => setShowForm(false)} title="Kirim Karya ke Mading">
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                            <input type="text" value={data.nama_murid} onChange={e => setData('nama_murid', e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" required />
                            {errors.nama_murid && <p className="text-xs text-red-600 mt-1">{errors.nama_murid}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Kelas</label>
                            <input type="text" placeholder="Cth: 8A" value={data.kelas} onChange={e => setData('kelas', e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" required />
                            {errors.kelas && <p className="text-xs text-red-600 mt-1">{errors.kelas}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Judul Karya</label>
                        <input type="text" value={data.judul} onChange={e => setData('judul', e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Kategori Karya</label>
                        <select value={data.kategori} onChange={e => setData('kategori', e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700">
                            <option value="Gambar/Poster">Gambar / Poster</option>
                            <option value="Puisi">Puisi</option>
                            <option value="Cerpen">Cerpen / Cerita Pendek</option>
                            <option value="Karya Tulis">Karya Tulis</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Isi Teks (Opsional)</label>
                        <textarea rows="4" value={data.konten} onChange={e => setData('konten', e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Upload Gambar (Opsional)</label>
                        {preview && <img src={preview} className="w-32 h-32 object-cover rounded-lg mb-2" />}
                        <input type="file" accept="image/*" onChange={handleImage} className="w-full text-sm" />
                        {errors.gambar && <p className="text-xs text-red-600 mt-1">{errors.gambar}</p>}
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">Batal</button>
                        <button type="submit" disabled={processing} className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg disabled:opacity-60">
                            {processing ? 'Mengirim...' : 'Kirim Karya'}
                        </button>
                    </div>
                </form>
            </Modal>
        </MainLayout>
    );
}