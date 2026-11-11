<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GaleriController extends Controller
{

    /**
     * Store: bisa upload banyak file sekaligus.
     */
    public function store(Request $request)
    {
        $request->validate([
            'judul'      => 'nullable|string|max:255',
            'kategori'   => 'nullable|string|max:100',
            'urutan'     => 'nullable|integer',
            'gambar'     => 'required|array|min:1',
            'gambar.*'   => 'image|max:4096', // masing-masing max 4MB
        ]);

        $urutan = $request->input('urutan', 0);

        foreach ($request->file('gambar') as $file) {
            $path = $file->store('galeri', 'public');
            Galeri::create([
                'judul'    => $request->input('judul'),
                'kategori' => $request->input('kategori'),
                'gambar'   => $path,
                'urutan'   => $urutan,
            ]);
        }

        return back()->with('success', 'Galeri berhasil diunggah.');
    }

    public function update(Request $request, Galeri $galeri)
    {
        $data = $request->validate([
            'judul'    => 'nullable|string|max:255',
            'kategori' => 'nullable|string|max:100',
            'urutan'   => 'nullable|integer',
            'gambar'   => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('gambar')) {
            if ($galeri->gambar && Storage::disk('public')->exists($galeri->gambar)) {
                Storage::disk('public')->delete($galeri->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('galeri', 'public');
        }

        $galeri->update($data);
        return back()->with('success', 'Galeri berhasil diperbarui.');
    }

    public function destroy(Galeri $galeri)
    {
        if ($galeri->gambar && Storage::disk('public')->exists($galeri->gambar)) {
            Storage::disk('public')->delete($galeri->gambar);
        }
        $galeri->delete();
        return back()->with('success', 'Galeri berhasil dihapus.');
    }
}