<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class InvitationController extends Controller
{
    /**
     * Kirim undangan ke email.
     */
    public function send(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        // Cek apakah email sudah menjadi user
        if (User::where('email', $data['email'])->exists()) {
            return back()->withErrors([
                'email' => 'Email ini sudah terdaftar sebagai user.',
            ]);
        }

        // Buat invitation
        $invitation = Invitation::generateFor(
            $data['email'],
            auth()->id()
        );

        // Kirim email
        try {
            Mail::to($data['email'])->send(
                new InvitationMail($invitation)
            );
        } catch (\Exception $e) {
            return back()->withErrors([
                'email' => 'Gagal mengirim email: ' . $e->getMessage(),
            ]);
        }

        return back()->with(
            'success',
            'Undangan berhasil dikirim ke ' . $data['email']
        );
    }


    /**
     * Tampilkan halaman aktivasi invitation.
     *
     * Route:
     * GET /invitation/{token}
     */
    public function show(string $token)
    {
        $invitation = Invitation::where('token', $token)->first();

        // Invitation tidak ditemukan
        if (!$invitation) {
            return Inertia::render('Auth/AcceptInvitation', [
                'invitation' => null,
                'error' => 'Undangan tidak ditemukan atau tidak valid.',
            ]);
        }

        // Invitation sudah digunakan
        if ($invitation->accepted_at) {
            return Inertia::render('Auth/AcceptInvitation', [
                'invitation' => null,
                'error' => 'Undangan ini sudah pernah digunakan.',
            ]);
        }

        // Invitation sudah expired
        if ($invitation->isExpired()) {
            return Inertia::render('Auth/AcceptInvitation', [
                'invitation' => null,
                'error' => 'Undangan ini sudah kedaluwarsa.',
            ]);
        }

        // Invitation valid
        return Inertia::render('Auth/AcceptInvitation', [
            'invitation' => [
                'email' => $invitation->email,
                'token' => $invitation->token,
            ],
            'error' => null,
        ]);
    }


    /**
     * Proses aktivasi invitation.
     *
     * Route:
     * POST /invitation/{token}
     */
    public function accept(Request $request, string $token)
    {
        // Cari invitation berdasarkan token
        $invitation = Invitation::where('token', $token)->first();

        // Cek invitation
        if (!$invitation || !$invitation->isValid()) {
            return back()->withErrors([
                'error' => 'Undangan tidak valid atau sudah kedaluwarsa.',
            ]);
        }

        // Validasi form
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Cek apakah email sudah memiliki akun
        if (User::where('email', $invitation->email)->exists()) {
            return back()->withErrors([
                'error' => 'Email ini sudah memiliki akun.',
            ]);
        }

        // Buat user baru
        $user = User::create([
            'name' => $data['name'],
            'email' => $invitation->email,
            'password' => bcrypt($data['password']),
        ]);

        // Tandai invitation sudah digunakan
        $invitation->update([
            'accepted_at' => now(),
        ]);

        // Login otomatis sebagai user yang baru dibuat
        auth()->login($user);

        // Masuk ke dashboard
        return redirect()
            ->route('admin.dashboard')
            ->with(
                'success',
                'Selamat datang! Akun Anda berhasil diaktifkan.'
            );
    }


    /**
     * Hapus / batalkan invitation.
     */
    public function destroy(Invitation $invitation)
    {
        $invitation->delete();

        return back()->with(
            'success',
            'Undangan berhasil dibatalkan.'
        );
    }


    /**
     * Kirim ulang invitation.
     */
    public function resend(Invitation $invitation)
    {
        $email = $invitation->email;

        // Hapus invitation lama
        $invitation->delete();

        // Buat invitation baru
        $newInvitation = Invitation::generateFor(
            $email,
            auth()->id()
        );

        // Kirim email baru
        try {
            Mail::to($email)->send(
                new InvitationMail($newInvitation)
            );
        } catch (\Exception $e) {
            return back()->withErrors([
                'email' => 'Gagal mengirim ulang: ' . $e->getMessage(),
            ]);
        }

        return back()->with(
            'success',
            'Undangan berhasil dikirim ulang.'
        );
    }
}