<?php

namespace App\Http\Controllers;

use App\Models\PollingOption;
use Illuminate\Http\Request;

class PollingVoteController extends Controller
{
    public function vote(Request $request)
    {
        $data = $request->validate([
            'option_id' => 'required|exists:polling_options,id',
        ]);

        $option = PollingOption::findOrFail($data['option_id']);
        $option->increment('votes');

        // Kembalikan hasil terbaru
        $polling = $option->polling()->with('options')->first();

        return response()->json([
            'success' => true,
            'options' => $polling->options->map(fn ($o) => [
                'id'    => $o->id,
                'opsi'  => $o->opsi,
                'votes' => $o->votes,
            ]),
            'total' => $polling->options->sum('votes'),
        ]);
    }
}