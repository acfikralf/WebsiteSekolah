<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mading extends Model
{
    protected $fillable = ['nama_murid', 'kelas', 'judul', 'kategori', 'konten', 'gambar', 'status'];

     protected $appends = ['gambar_url'];

    public function getGambarUrlAttribute(): ?string
    {
        return $this->gambar ? asset('storage/' . $this->gambar) : null;
    }
}
