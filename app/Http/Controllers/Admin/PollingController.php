<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Polling;
use App\Models\PollingOption;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PollingController extends Controller
{
    /**
     * Simpan / update polling + semua opsinya sekaligus.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'pertanyaan'       => 'required|string|max:255',
            'aktif'            => 'boolean',
            'options'          => 'required|array|min:2',
            'options.*.id'     => 'nullable|integer',
            'options.*.opsi'   => 'required|string|max:255',
        ]);

        // Kalau sudah ada polling, update. Kalau belum, buat baru.
        $polling = Polling::latest()->first();

        if ($polling) {
            $polling->update([
                'pertanyaan' => $data['pertanyaan'],
                'aktif'      => $data['aktif'] ?? true,
            ]);

            // Hapus opsi yang tidak ada di request, update yang ada
            $keptIds = collect($data['options'])->pluck('id')->filter()->toArray();
            $polling->options()->whereNotIn('id', $keptIds)->delete();

            foreach ($data['options'] as $i => $opt) {
                if (!empty($opt['id'])) {
                    PollingOption::where('id', $opt['id'])->update([
                        'opsi'   => $opt['opsi'],
                        'urutan' => $i + 1,
                    ]);
                } else {
                    PollingOption::create([
                        'polling_id' => $polling->id,
                        'opsi'       => $opt['opsi'],
                        'urutan'     => $i + 1,
                        'votes'      => 0,
                    ]);
                }
            }
        } else {
            $polling = Polling::create([
                'pertanyaan' => $data['pertanyaan'],
                'aktif'      => $data['aktif'] ?? true,
            ]);

            foreach ($data['options'] as $i => $opt) {
                PollingOption::create([
                    'polling_id' => $polling->id,
                    'opsi'       => $opt['opsi'],
                    'urutan'     => $i + 1,
                    'votes'      => 0,
                ]);
            }
        }

        return back()->with('success', 'Polling berhasil disimpan.');
    }

    /**
     * Reset semua suara.
     */
    public function reset(Polling $polling)
    {
        $polling->options()->update(['votes' => 0]);
        return back()->with('success', 'Suara polling berhasil direset.');
    }

    public function destroy(Polling $polling)
    {
        $polling->delete(); // options akan terhapus otomatis (cascade)
        return back()->with('success', 'Polling berhasil dihapus.');
    }
}