<?php

namespace App\Http\Controllers;

use App\Models\Mading;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MadingController extends Controller
{
    public function index()
    {
        return Inertia::render('Mading/Index', [
            'madings' => Mading::where('status', 'published')->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_murid' => 'required|string|max:255',
            'kelas' => 'required|string|max:50',
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string',
            'konten' => 'nullable|string',
            'gambar' => 'nullable|image|max:4096', // Max 4MB
        ]);

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('mading', 'public');
        }

        // Status default 'pending'
        Mading::create($data);

        return back()->with('success', 'Karya berhasil dikirim! Menunggu persetujuan admin.');
    }
}