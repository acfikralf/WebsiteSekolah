import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { FloppyDisk, Image, PencilSimple } from '@phosphor-icons/react';
import Modal from '@/Components/Modal';

export default function SectionProfil({ profil = {} }) {
    const [showEditModal, setShowEditModal] = useState(false);
    
    // Sesuaikan dengan format key dari database (flat)
    const [preview, setPreview] = useState(
        profil.profil_kepala_foto ? `/storage/${profil.profil_kepala_foto}` : null
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        profil_sejarah:       profil.profil_sejarah || '',
        profil_sambutan:      profil.profil_sambutan || '',
        profil_kepala_nama:   profil.profil_kepala_nama || '',
        profil_timeline:      profil.profil_timeline || '',
        profil_visi:          profil.profil_visi || '',
        profil_misi:          profil.profil_misi || '',
        profil_tujuan:        profil.profil_tujuan || '',
        profil_program:       profil.profil_program || '',
        profil_npsn:          profil.profil_npsn || '',
        profil_status:        profil.profil_status || '',
        profil_alamat:        profil.profil_alamat || '',
        profil_telepon:       profil.profil_telepon || '',
        profil_email:         profil.profil_email || '',
        profil_tahun_berdiri: profil.profil_tahun_berdiri || '',
        profil_kepala_foto:   null,
    });

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        setData('profil_kepala_foto', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.profil.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowEditModal(false);
            },
        });
    };

    const openEditModal = () => {
        setPreview(profil.profil_kepala_foto ? `/storage/${profil.profil_kepala_foto}` : null);
        setShowEditModal(true);
    };

    // --- PARSER DATA UNTUK TAMPILAN BACA ---
    const misiList = (profil.profil_misi || '').split('\n').filter(Boolean);
    const tujuanList = (profil.profil_tujuan || '').split('\n').filter(Boolean);
    
    const timelineList = (profil.profil_timeline || '').split('\n').filter(Boolean).map(line => {
        const [tahun, ...desc] = line.split('|');
        return { tahun: tahun?.trim(), deskripsi: desc.join('|').trim() };
    });

    const programList = (profil.profil_program || '').split('\n').filter(Boolean).map(line => {
        const [nama, ...desc] = line.split('|');
        return { nama: nama?.trim(), deskripsi: desc.join('|').trim() };
    });

    const fotoUrl = profil.profil_kepala_foto ? `/storage/${profil.profil_kepala_foto}` : null;

    return (
        <section id="section-profil" className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-display font-semibold">Profil Sekolah</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Ringkasan informasi profil yang tampil di website.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <a 
                        href="/profil" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        <i className="ph ph-arrow-square-out mr-2"></i> Lihat Halaman
                    </a>
                    <button 
                        onClick={openEditModal}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <PencilSimple size={16} className="mr-2" /> Edit Profil
                    </button>
                </div>
            </div>

            {/* ===== TAMPILAN BACA (READ-ONLY) ===== */}
            <div className="space-y-6">
                
                {/* Card: Sambutan & Foto */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Sambutan Kepala Sekolah</h3>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-32 h-40 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                            {fotoUrl ? (
                                <img src={fotoUrl} alt="Kepala Sekolah" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400"><Image size={32} /></div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{profil.profil_kepala_nama || '-'}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                                {profil.profil_sambutan || 'Belum ada sambutan.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card: Sejarah */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-3 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Sejarah Sekolah</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                        {profil.profil_sejarah || 'Belum ada data sejarah.'}
                    </p>
                </div>

                {/* Card: Visi Misi Tujuan */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="font-display font-semibold mb-3 text-slate-900 dark:text-white">Visi</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{profil.profil_visi || '-'}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="font-display font-semibold mb-3 text-slate-900 dark:text-white">Misi</h3>
                        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
                            {misiList.map((m, i) => <li key={i}>{m}</li>)}
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="font-display font-semibold mb-3 text-slate-900 dark:text-white">Tujuan</h3>
                        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
                            {tujuanList.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                    </div>
                </div>

                {/* Card: Timeline & Program */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Timeline Perkembangan</h3>
                        <div className="space-y-4 relative border-l border-slate-200 dark:border-slate-700 ml-3">
                            {timelineList.map((item, i) => (
                                <div key={i} className="ml-4 relative">
                                    <span className="absolute -left-[21px] top-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                                    <span className="font-bold text-sm text-primary-600 dark:text-accent-400">{item.tahun}</span>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.deskripsi}</p>
                                </div>
                            ))}
                            {timelineList.length === 0 && <p className="text-sm text-slate-500">Belum ada timeline.</p>}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Program Unggulan</h3>
                        <ul className="space-y-3">
                            {programList.map((prog, i) => (
                                <li key={i} className="flex flex-col">
                                    <span className="font-semibold text-sm text-slate-900 dark:text-white">{prog.nama}</span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{prog.deskripsi}</span>
                                </li>
                            ))}
                            {programList.length === 0 && <p className="text-sm text-slate-500">Belum ada program unggulan.</p>}
                        </ul>
                    </div>
                </div>

                {/* Card: Data Kontak */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Data Kontak & Sekolah</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div><span className="text-slate-500 block text-xs mb-1">NPSN</span> {profil.profil_npsn || '-'}</div>
                        <div><span className="text-slate-500 block text-xs mb-1">Status</span> {profil.profil_status || '-'}</div>
                        <div><span className="text-slate-500 block text-xs mb-1">Tahun Berdiri</span> {profil.profil_tahun_berdiri || '-'}</div>
                        <div><span className="text-slate-500 block text-xs mb-1">Telepon / No HP</span> {profil.profil_telepon || '-'}</div>
                        <div><span className="text-slate-500 block text-xs mb-1">Email</span> {profil.profil_email || '-'}</div>
                        <div className="sm:col-span-2 md:col-span-3"><span className="text-slate-500 block text-xs mb-1">Alamat</span> {profil.profil_alamat || '-'}</div>
                    </div>
                </div>

            </div>

            {/* ===== MODAL EDIT (FORM) ===== */}
            <Modal 
                show={showEditModal} 
                onClose={() => setShowEditModal(false)} 
                title="Edit Profil Sekolah"
                maxWidth="max-w-4xl"
            >
                <form onSubmit={submit} className="space-y-6">
                    {/* ... Isi form edit sama seperti sebelumnya ... */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                        <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white">Sambutan Kepala Sekolah</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium mb-2">Foto Kepala Sekolah</label>
                                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2">
                                    {preview ? <img src={preview} alt="Kepala Sekolah" className="w-full h-full object-cover" /> : <Image size={48} className="text-slate-400" />}
                                </div>
                                <input type="file" accept="image/*" onChange={handleFotoChange} className="w-full text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-primary-100 file:text-primary-700 hover:file:bg-primary-200" />
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nama Kepala Sekolah</label>
                                    <input type="text" value={data.profil_kepala_nama} onChange={(e) => setData('profil_kepala_nama', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sambutan</label>
                                    <textarea rows="5" value={data.profil_sambutan} onChange={(e) => setData('profil_sambutan', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary-500"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Sejarah Sekolah</label>
                        <textarea rows="4" value={data.profil_sejarah} onChange={(e) => setData('profil_sejarah', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Visi</label>
                            <textarea rows="4" value={data.profil_visi} onChange={(e) => setData('profil_visi', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Misi <span className="text-slate-400 font-normal text-xs">(1 poin/baris)</span></label>
                            <textarea rows="4" value={data.profil_misi} onChange={(e) => setData('profil_misi', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tujuan <span className="text-slate-400 font-normal text-xs">(1 poin/baris)</span></label>
                            <textarea rows="4" value={data.profil_tujuan} onChange={(e) => setData('profil_tujuan', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Timeline <span className="text-slate-400 font-normal text-xs">(Tahun | Deskripsi)</span></label>
                            <textarea rows="5" value={data.profil_timeline} onChange={(e) => setData('profil_timeline', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm font-mono text-xs focus:ring-2 focus:ring-primary-500" placeholder="1998 | Berdiri"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Program <span className="text-slate-400 font-normal text-xs">(Nama | Deskripsi)</span></label>
                            <textarea rows="5" value={data.profil_program} onChange={(e) => setData('profil_program', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm font-mono text-xs focus:ring-2 focus:ring-primary-500" placeholder="Tahfidz | Hafalan Qur'an"></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">NPSN</label>
                            <input type="text" value={data.profil_npsn} onChange={(e) => setData('profil_npsn', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select value={data.profil_status} onChange={(e) => setData('profil_status', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm">
                                <option value="">-- Pilih --</option>
                                <option value="Swasta">Swasta</option>
                                <option value="Negeri">Negeri</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tahun Berdiri</label>
                            <input type="text" value={data.profil_tahun_berdiri} onChange={(e) => setData('profil_tahun_berdiri', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Telepon</label>
                            <input type="text" value={data.profil_telepon} onChange={(e) => setData('profil_telepon', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" value={data.profil_email} onChange={(e) => setData('profil_email', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium mb-1">Alamat</label>
                            <textarea rows="2" value={data.profil_alamat} onChange={(e) => setData('profil_alamat', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button type="button" onClick={() => setShowEditModal(false)} className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">Batal</button>
                        <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60">
                            <FloppyDisk size={18} weight="fill" /> {processing ? 'Menyimpan...' : 'Simpan Profil'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}