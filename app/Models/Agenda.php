<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $fillable = ['judul', 'tanggal', 'waktu', 'lokasi', 'deskripsi'];
    protected $casts = ['tanggal' => 'date'];
}