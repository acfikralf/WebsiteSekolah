    import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { FloppyDisk, Image } from '@phosphor-icons/react';

export default function SectionProfil({ profil = {} }) {
    const [preview, setPreview] = useState(
        profil.kepala_foto ? `/storage/${profil.kepala_foto}` : null
    );

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        profil_sejarah:       profil.sejarah || '',
        profil_sambutan:      profil.sambutan || '',
        profil_kepala_nama:   profil.kepala_nama || '',
        profil_timeline:      profil.timeline || '',
        profil_visi:          profil.visi || '',
        profil_misi:          profil.misi || '',
        profil_tujuan:        profil.tujuan || '',
        profil_program:       profil.program || '',
        profil_npsn:          profil.npsn || '',
        profil_status:        profil.status || '',
        profil_alamat:        profil.alamat || '',
        profil_telepon:       profil.telepon || '',
        profil_email:         profil.email || '',
        profil_tahun_berdiri: profil.tahun_berdiri || '',
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
        });
    };

    return (
        <section id="section-profil">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-display font-semibold">Profil Sekolah</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Informasi ini tampil di halaman <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">/profil</code>
                    </p>
                </div>
                <a href="/profil" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 text-sm text-primary-600 dark:text-accent-400 hover:underline">
                    <i className="ph ph-arrow-square-out mr-1"></i> Lihat Halaman
                </a>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* ===== SAMBUTAN KEPALA SEKOLAH ===== */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white">Sambutan Kepala Sekolah</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium mb-2">Foto Kepala Sekolah</label>
                            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2">
                                {preview ? <img src={preview} alt="Kepala Sekolah" className="w-full h-full object-cover" /> : <Image size={48} className="text-slate-400" />}
                            </div>
                            <input type="file" accept="image/*" onChange={handleFotoChange} className="w-full text-xs" />
                        </div>
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Kepala Sekolah</label>
                                <input type="text" value={data.profil_kepala_nama} onChange={(e) => setData('profil_kepala_nama', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Sambutan</label>
                                <textarea rows="5" value={data.profil_sambutan} onChange={(e) => setData('profil_sambutan', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== SEJARAH ===== */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white">Sejarah Sekolah</h3>
                    <textarea rows="4" value={data.profil_sejarah} onChange={(e) => setData('profil_sejarah', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"></textarea>
                </div>

                {/* ===== TIMELINE ===== */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-1 text-slate-900 dark:text-white">Timeline Perkembangan</h3>
                    <p className="text-xs text-slate-500 mb-3">Gunakan format: <code>Tahun | Deskripsi</code> (satu baris untuk satu item).</p>
                    <textarea rows="6" value={data.profil_timeline} onChange={(e) => setData('profil_timeline', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm font-mono text-xs" placeholder="1998 | Berdiri sebagai Madrasah&#10;2005 | Akreditasi Pertama"></textarea>
                </div>

                {/* ===== VISI MISI TUJUAN ===== */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white">Visi, Misi & Tujuan</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Visi</label>
                            <textarea rows="2" value={data.profil_visi} onChange={(e) => setData('profil_visi', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Misi <span className="text-slate-400 font-normal">(satu poin per baris)</span></label>
                            <textarea rows="4" value={data.profil_misi} onChange={(e) => setData('profil_misi', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tujuan <span className="text-slate-400 font-normal">(satu poin per baris)</span></label>
                            <textarea rows="4" value={data.profil_tujuan} onChange={(e) => setData('profil_tujuan', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"></textarea>
                        </div>
                    </div>
                </div>

                {/* ===== PROGRAM UNGGULAN ===== */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-1 text-slate-900 dark:text-white">Program Unggulan</h3>
                    <p className="text-xs text-slate-500 mb-3">Gunakan format: <code>Nama Program | Deskripsi</code> (satu baris untuk satu program).</p>
                    <textarea rows="6" value={data.profil_program} onChange={(e) => setData('profil_program', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm font-mono text-xs" placeholder="Tahfidz | Program hafalan Al-Qur'an&#10;Pramuka | Melatih kepemimpinan"></textarea>
                </div>

                {/* ===== DATA SEKOLAH ===== */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white">Data Kontak & Sekolah</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <label className="block text-sm font-medium mb-1">Telepon / No HP</label>
                            <input type="text" value={data.profil_telepon} onChange={(e) => setData('profil_telepon', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" value={data.profil_email} onChange={(e) => setData('profil_email', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Alamat</label>
                            <textarea rows="2" value={data.profil_alamat} onChange={(e) => setData('profil_alamat', e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"></textarea>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-60">
                        <FloppyDisk size={18} weight="fill" />
                        {processing ? 'Menyimpan...' : 'Simpan Profil'}
                    </button>
                    {recentlySuccessful && <span className="text-sm text-primary-600 dark:text-accent-400 flex items-center gap-1"><i className="ph ph-check-circle"></i> Tersimpan</span>}
                </div>
            </form>
        </section>
    );
}