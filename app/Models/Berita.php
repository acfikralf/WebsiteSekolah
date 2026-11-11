<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Berita extends Model
{
    protected $fillable = [
        'judul', 'slug', 'ringkasan', 'konten', 'gambar',
        'kategori', 'status', 'tanggal',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    // Auto-generate slug dari judul
    protected static function booted(): void
    {
        static::creating(function ($berita) {
            if (empty($berita->slug)) {
                $berita->slug = Str::slug($berita->judul) . '-' . time();
            }
        });
    }

    // Helper: URL gambar lengkap atau null
    public function getGambarUrlAttribute(): ?string
    {
        return $this->gambar ? asset('storage/' . $this->gambar) : null;
    }
}