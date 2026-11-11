<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ekstrakurikuler;
use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;

class EkstrakurikulerController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'settings'         => Setting::all_as_array(),
            'ekstrakurikulers' => \App\Models\Ekstrakurikuler::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'      => 'required|string|max:255',
            'pembina'   => 'nullable|string|max:255',
            'icon'      => 'nullable|string|max:100',
            'deskripsi' => 'nullable|string',
        ]);

        Ekstrakurikuler::create($validated);

        return back()->with('success', 'Ekstrakurikuler berhasil ditambahkan.');
    }

    public function update(Request $request, Ekstrakurikuler $ekstrakurikuler)
    {
        $validated = $request->validate([
            'nama'      => 'required|string|max:255',
            'pembina'   => 'nullable|string|max:255',
            'icon'      => 'nullable|string|max:100',
            'deskripsi' => 'nullable|string',
        ]);

        $ekstrakurikuler->update($validated);

        return back()->with('success', 'Ekstrakurikuler berhasil diperbarui.');
    }

    public function destroy(Ekstrakurikuler $ekstrakurikuler)
    {
        $ekstrakurikuler->delete();

        return back()->with('success', 'Ekstrakurikuler berhasil dihapus.');
    }
}
