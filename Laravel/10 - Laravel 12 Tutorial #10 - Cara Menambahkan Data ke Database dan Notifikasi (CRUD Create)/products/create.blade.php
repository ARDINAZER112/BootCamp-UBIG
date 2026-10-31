@extends('layouts.app')

@section('title', 'Tambah Produk')

@section('content')
    <h1 class="mb-3">Tambah Produk</h1>

    <form action="{{ route('products.store') }}" method="POST">
        @csrf

        <div class="mb-3">
            <label for="name" class="form-label">Nama</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ old('name') }}">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Deskripsi</label>
            <textarea id="description" name="description" class="form-control">{{ old('description') }}</textarea>
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Harga</label>
            <input type="number" id="price" name="price" class="form-control" value="{{ old('price') }}">
        </div>
        <div class="mb-3">
            <label for="stock" class="form-label">Stok</label>
            <input type="number" id="stock" name="stock" class="form-control" value="{{ old('stock', 0) }}">
        </div>

        <button type="submit" class="btn btn-primary">Simpan</button>
        <a href="{{ route('products.index') }}" class="btn btn-secondary">Batal</a>
    </form>
@endsection
