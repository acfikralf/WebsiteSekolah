<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    protected $fillable = ['nama', 'jabatan', 'mapel', 'foto', 'urutan'];

    /**
     * Accessor: URL lengkap foto.
     */
    public function getFotoUrlAttribute(): ?string
    {
        return $this->foto ? asset('storage/' . $this->foto) : null;
    }

    /**
     * Scope: urutkan berdasarkan kolom urutan.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('urutan')->orderBy('id');
    }
}