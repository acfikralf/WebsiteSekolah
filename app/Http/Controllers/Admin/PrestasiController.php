<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Prestasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PrestasiController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'judul'     => 'required|string|max:255',
            'siswa'     => 'nullable|string|max:255',
            'kategori'  => 'nullable|string|max:100',
            'tingkat'   => 'nullable|string|max:100',
            'tanggal'   => 'nullable|date',
            'deskripsi' => 'nullable|string',
            'foto'      => 'nullable|image|max:2048', // max 2MB
        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('prestasi', 'public');
        }

        Prestasi::create($data);
        return back()->with('success', 'Prestasi berhasil ditambahkan.');
    }

    public function update(Request $request, Prestasi $prestasi)
    {
        $data = $request->validate([
            'judul'     => 'required|string|max:255',
            'siswa'     => 'nullable|string|max:255',
            'kategori'  => 'nullable|string|max:100',
            'tingkat'   => 'nullable|string|max:100',
            'tanggal'   => 'nullable|date',
            'deskripsi' => 'nullable|string',
            'foto'      => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            // hapus foto lama
            if ($prestasi->foto && Storage::disk('public')->exists($prestasi->foto)) {
                Storage::disk('public')->delete($prestasi->foto);
            }
            $data['foto'] = $request->file('foto')->store('prestasi', 'public');
        }

        $prestasi->update($data);
        return back()->with('success', 'Prestasi berhasil diperbarui.');
    }

    public function destroy(Prestasi $prestasi)
    {
        if ($prestasi->foto && Storage::disk('public')->exists($prestasi->foto)) {
            Storage::disk('public')->delete($prestasi->foto);
        }
        $prestasi->delete();
        return back()->with('success', 'Prestasi berhasil dihapus.');
    }
}
