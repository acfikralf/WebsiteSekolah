<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invitation extends Model
{
    protected $fillable = ['email', 'token', 'invited_by', 'expires_at', 'accepted_at'];
    protected $casts    = [
        'expires_at'  => 'datetime',
        'accepted_at' => 'datetime',
    ];

    public function inviter()
    {
        return $this->belongsTo(User::class, 'invited_by');
    }

    /**
     * Generate invitation baru untuk email tertentu.
     */
    public static function generateFor(string $email, ?int $invitedBy = null): self
    {
        // Hapus invite lama untuk email yang sama (kalau belum diterima)
        static::where('email', $email)->whereNull('accepted_at')->delete();

        return static::create([
            'email'      => $email,
            'token'      => Str::random(64),
            'invited_by' => $invitedBy,
            'expires_at' => now()->addDays(3), // berlaku 3 hari
        ]);
    }

    public function isValid(): bool
    {
        return !$this->accepted_at && $this->expires_at->isFuture();
    }

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }
}