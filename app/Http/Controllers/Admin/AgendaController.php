<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaController extends Controller
{

    public function store(Request $request)
    {
        $data = $request->validate([
            'judul'     => 'required|string|max:255',
            'tanggal'   => 'required|date',
            'waktu'     => 'nullable|string|max:100',
            'lokasi'    => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        Agenda::create($data);
        return back()->with('success', 'Agenda berhasil ditambahkan.');
    }

    public function update(Request $request, Agenda $agenda)
    {
        $data = $request->validate([
            'judul'     => 'required|string|max:255',
            'tanggal'   => 'required|date',
            'waktu'     => 'nullable|string|max:100',
            'lokasi'    => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        $agenda->update($data);
        return back()->with('success', 'Agenda berhasil diperbarui.');
    }

    public function destroy(Agenda $agenda)
    {
        $agenda->delete();
        return back()->with('success', 'Agenda berhasil dihapus.');
    }
}