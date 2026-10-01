<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Polling extends Model
{
    protected $fillable = ['pertanyaan', 'aktif'];
    protected $casts    = ['aktif' => 'boolean'];

    public function options()
    {
        return $this->hasMany(PollingOption::class)->orderBy('urutan');
    }

    /**
     * Polling yang sedang aktif (hanya 1 yang dianggap aktif di frontend).
     */
    public static function active()
    {
        return static::where('aktif', true)->with('options')->latest()->first();
    }
}