<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('madings', function (Blueprint $table) {
        $table->id();
        $table->string('nama_murid');
        $table->string('kelas');
        $table->string('judul');
        $table->string('kategori'); // Gambar, Puisi, Cerpen, Poster, dll
        $table->text('konten')->nullable(); // Teks karya (jika ada)
        $table->string('gambar')->nullable(); // Foto karya (jika ada)
        $table->enum('status', ['pending', 'published'])->default('pending');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('madings');
    }
};
