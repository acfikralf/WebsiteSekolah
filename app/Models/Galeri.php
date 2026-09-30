<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galeri extends Model
{
    protected $fillable = ['judul', 'kategori', 'gambar', 'urutan'];

    public function getGambarUrlAttribute(): ?string
    {
        return $this->gambar ? asset('storage/' . $this->gambar) : null;
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('urutan')->orderByDesc('id');
    }
}