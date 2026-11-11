<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GuruController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama'    => 'required|string|max:255',
            'jabatan' => 'nullable|string|max:255',
            'mapel'   => 'nullable|string|max:255',
            'urutan'  => 'nullable|integer',
            'foto'    => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('guru', 'public');
        }

        $data['urutan'] = $data['urutan'] ?? 0;

        Guru::create($data);
        return back()->with('success', 'Guru berhasil ditambahkan.');
    }

    public function update(Request $request, Guru $guru)
    {
        $data = $request->validate([
            'nama'    => 'required|string|max:255',
            'jabatan' => 'nullable|string|max:255',
            'mapel'   => 'nullable|string|max:255',
            'urutan'  => 'nullable|integer',
            'foto'    => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            // Hapus foto lama
            if ($guru->foto && Storage::disk('public')->exists($guru->foto)) {
                Storage::disk('public')->delete($guru->foto);
            }
            $data['foto'] = $request->file('foto')->store('guru', 'public');
        }

        $guru->update($data);
        return back()->with('success', 'Guru berhasil diperbarui.');
    }

    public function destroy(Guru $guru)
    {
        if ($guru->foto && Storage::disk('public')->exists($guru->foto)) {
            Storage::disk('public')->delete($guru->foto);
        }
        $guru->delete();
        return back()->with('success', 'Guru berhasil dihapus.');
    }
}
