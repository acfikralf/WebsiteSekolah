<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Guru extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'jabatan',
        'mapel',
        'urutan',
        'foto',
    ];

    protected $appends = ['foto_url'];

    public function getFotoUrlAttribute()
    {
        if (empty($this->foto)) {
            return null;
        }

        return Storage::disk('public')->url($this->foto);
    }
}