import { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Modal from '@/Components/Modal';
import { 
    Plus, Image as ImageIcon, BookOpen, 
    CheckCircle, X, CaretLeft, CaretRight 
} from '@phosphor-icons/react';

export default function MadingIndex({ madings = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [preview, setPreview] = useState(null);
    const [selectedMading, setSelectedMading] = useState(null); // Untuk Modal Baca
    const [toast, setToast] = useState(null); // State untuk Toast lokal

    const { flash } = usePage().props;
    console.log(madings); // Debug: Lihat data madings di console

    // Deteksi pesan flash dari Laravel
    useEffect(() => {
        if (flash?.success) {
            setToast(flash.success);
            setTimeout(() => setToast(null), 4000); // Hilang setelah 4 detik
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

    // Rotasi acak untuk efek "papan tempel"
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];

    return (
        <MainLayout>
            {/* Notifikasi Toast Lokal */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 bg-green-600 text-white rounded-xl shadow-2xl animate-slide-in-right">
                    <CheckCircle size={24} weight="fill" />
                    <span className="text-sm font-medium pr-2">{toast}</span>
                    <button onClick={() => setToast(null)} className="hover:bg-green-700 p-1 rounded-full"><X size={16} /></button>
                </div>
            )}

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 relative overflow-hidden islamic-pattern">
                <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Mading Digital</h1>
                        <p className="text-lg text-primary-100 max-w-2xl">
                            Pameran karya dan kreativitas murid-murid SMP Islam Watestanjung.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-1 shrink-0"
                    >
                        <Plus size={20} className="mr-2" /> Buat Karya Baru
                    </button>
                </div>
            </div>

            {/* Papan Mading */}
            <div className="py-16 bg-[#F3F4F6] dark:bg-slate-950 min-h-[60vh] relative">
                {/* Ornamen papan / grid tipis */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] opacity-20 dark:opacity-5 pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {madings.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 bg-white/50 dark:bg-slate-900/50 rounded-2xl backdrop-blur-sm border-2 border-dashed border-slate-300 dark:border-slate-700">
                            <BookOpen size={64} className="mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">Mading masih kosong.</p>
                            <p className="text-sm mt-1">Jadilah yang pertama mengirimkan karya!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
                            {madings.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => setSelectedMading(item)}
                                    className={`group bg-white p-3 pb-8 shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl relative ${rotations[index % rotations.length]}`}
                                >
                                    {/* Efek Selotip */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm -rotate-2 z-20"></div>
                                    
                                    {/* Gambar Karya */}
                                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative mb-4">
                                        {item.gambar_url ? (
                                            <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <BookOpen size={48} />
                                            </div>
                                        )}
                                        <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider backdrop-blur-sm">
                                            {item.kategori}
                                        </span>
                                    </div>

                                    {/* Teks Karya */}
                                    <div className="text-center px-1">
                                        <h3 className="font-display font-bold text-lg text-slate-800 line-clamp-2 leading-tight mb-2">
                                            {item.judul}
                                        </h3>
                                        <div className="w-8 h-0.5 bg-slate-300 mx-auto mb-3"></div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                            {item.nama_murid} <span className="text-slate-400 mx-1">•</span> {item.kelas}
                                        </p>
                                        
                                        {item.konten && (
                                            <p className="text-sm text-slate-600 line-clamp-2 italic mt-3 font-serif">
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

            {/* Modal Baca Karya (Lightbox) */}
            {selectedMading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSelectedMading(null)}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* Header Modal */}
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
                        
                        {/* Body Modal */}
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
                    {/* ... (Isi form sama persis seperti sebelumnya) ... */}
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
                        <label className="block text-sm font-medium mb-1">Isi Teks (Opsional, untuk puisi/cerpen)</label>
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