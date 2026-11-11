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
            'profil_sambutan'      => 'nullable|string',
            'profil_kepala_nama'   => 'nullable|string|max:255',
            'profil_npsn'          => 'nullable|string|max:50',
            'profil_status'        => 'nullable|string|max:50',
            'profil_alamat'        => 'nullable|string|max:255',
            'profil_telepon'       => 'nullable|string|max:50',
            'profil_email'         => 'nullable|email|max:255',
            'profil_tahun_berdiri' => 'nullable|string|max:10',
            'profil_kepala_foto'   => 'nullable|image|max:2048',
        ]);

        // Handle upload foto kepala sekolah
        if ($request->hasFile('profil_kepala_foto')) {
            $old = Setting::get('profil_kepala_foto');
            if ($old && Storage::disk('public')->exists($old)) {
                Storage::disk('public')->delete($old);
            }
            $data['profil_kepala_foto'] = $request->file('profil_kepala_foto')->store('profil', 'public');
        } else {
            // Jangan timpa kalau tidak upload foto baru
            unset($data['profil_kepala_foto']);
        }

        foreach ($data as $key => $value) {
            Setting::set($key, $value);
        }

        return back()->with('success', 'Profil sekolah berhasil disimpan.');
    }
}