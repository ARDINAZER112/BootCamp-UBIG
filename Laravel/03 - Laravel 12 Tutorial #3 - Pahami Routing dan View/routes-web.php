<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/halo', function () {
    return 'Halo Laravel 12';
});

// Route::view: langsung ke view tanpa closure
Route::view('/tentang', 'tentang', ['judul' => 'Tentang Kami']);

// Parameter wajib + constraint angka
Route::get('/produk/{id}', function (string $id) {
    return "Produk #{$id}";
})->whereNumber('id');

// Parameter opsional
Route::get('/kategori/{nama?}', function (?string $nama = 'semua') {
    return "Kategori: {$nama}";
});

// Mengirim data ke view
Route::get('/profil', function () {
    $nama = 'Ardi';
    $skill = ['PHP', 'Laravel', 'React'];
    return view('profil', compact('nama', 'skill'));
});

// Nama rute dan group
Route::get('/kontak', fn () => view('kontak'))->name('kontak');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', fn () => 'Dashboard')->name('dashboard');
    Route::get('/laporan', fn () => 'Laporan')->name('laporan');
});

// Rute tidak ditemukan
Route::fallback(fn () => response('Halaman tidak ditemukan', 404));
