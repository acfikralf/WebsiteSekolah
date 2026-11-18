<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Guru extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'jabatan', 'mapel', 'urutan', 'foto'];

    // TAMBAHKAN INI:
    // Otomatis menambahkan properti 'foto_url' saat data dipanggil
    protected $appends = ['foto_url'];

    public function getFotoUrlAttribute()
    {
        if ($this->foto) {
            // Cek apakah file benar-benar ada di folder storage/app/public
            if (Storage::disk('public')->exists($this->foto)) {
                return Storage::disk('public')->url($this->foto);
            }
        }
        return null;
    }
}