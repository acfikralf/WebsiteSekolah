<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prestasi extends Model
{
    protected $fillable = ['judul', 'siswa', 'kategori', 'tingkat', 'tanggal', 'foto', 'deskripsi'];
    protected $casts = ['tanggal' => 'date'];
}