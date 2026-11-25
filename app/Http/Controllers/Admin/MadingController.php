<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mading;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MadingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'activeSection' => 'mading',
            'madings' => Mading::latest()->get(),
        ]);
    }

    public function approve(Mading $mading)
    {
        $mading->update(['status' => 'published']);
        return back()->with('success', 'Karya berhasil dipublikasikan.');
    }

    public function destroy(Mading $mading)
    {
        if ($mading->gambar && Storage::disk('public')->exists($mading->gambar)) {
            Storage::disk('public')->delete($mading->gambar);
        }
        $mading->delete();
        return back()->with('success', 'Karya berhasil dihapus.');
    }
}