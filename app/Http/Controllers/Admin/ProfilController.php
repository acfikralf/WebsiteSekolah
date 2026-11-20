<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilController extends Controller
{
    public function update(Request $request)
    {
        $data = $request->validate([
            'profil_sejarah'       => 'nullable|string',
            'profil_visi'          => 'nullable|string',
            'profil_misi'          => 'nullable|string',
            'profil_tujuan'        => 'nullable|string',
            'profil_program'       => 'nullable|string',
            'profil_timeline'      => 'nullable|string',
            'profil_sambutan'      => 'nullable|string',

            'profil_kepala_nama'   => 'nullable|string|max:255',
            'profil_npsn'          => 'nullable|string|max:50',
            'profil_status'        => 'nullable|string|max:50',
            'profil_alamat'        => 'nullable|string|max:255',
            'profil_telepon'       => 'nullable|string|max:50',
            'profil_email'         => 'nullable|email|max:255',
            'profil_tahun_berdiri' => 'nullable|string|max:10',

            'profil_kepala_foto'   => 'nullable|image|max:8192',
        ]);

        // Upload foto kepala sekolah
        if ($request->hasFile('profil_kepala_foto')) {
            $oldFoto = Setting::get('profil_kepala_foto');

            // Simpan foto baru terlebih dahulu
            $newFoto = $request->file('profil_kepala_foto')
                ->store('profil', 'public');

            $data['profil_kepala_foto'] = $newFoto;

            // Hapus foto lama setelah foto baru berhasil disimpan
            if ($oldFoto && Storage::disk('public')->exists($oldFoto)) {
                Storage::disk('public')->delete($oldFoto);
            }
        } else {
            // Pertahankan foto lama jika tidak upload foto baru
            unset($data['profil_kepala_foto']);
        }

        // Simpan seluruh pengaturan profil
        foreach ($data as $key => $value) {
            Setting::set($key, $value);
        }

        return back()->with(
            'success',
            'Profil sekolah berhasil diperbarui.'
        );
    }
}
