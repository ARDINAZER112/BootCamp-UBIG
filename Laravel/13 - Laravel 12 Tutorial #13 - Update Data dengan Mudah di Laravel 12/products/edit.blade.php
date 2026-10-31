@extends('layouts.app')

@section('title', 'Edit Produk')

@section('content')
    <h1 class="mb-3">Edit Produk</h1>

    <form action="{{ route('products.update', $product) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="name" class="form-label">Nama</label>
            <input type="text" id="name" name="name"
                   class="form-control @error('name') is-invalid @enderror"
                   value="{{ old('name', $product->name) }}">
            @error('name') <div class="invalid-feedback">{{ $message }}</div> @enderror
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Deskripsi</label>
            <textarea id="description" name="description" class="form-control">{{ old('description', $product->description) }}</textarea>
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Harga</label>
            <input type="number" id="price" name="price" class="form-control" value="{{ old('price', $product->price) }}">
        </div>
        <div class="mb-3">
            <label for="stock" class="form-label">Stok</label>
            <input type="number" id="stock" name="stock" class="form-control" value="{{ old('stock', $product->stock) }}">
        </div>

        <button type="submit" class="btn btn-primary">Perbarui</button>
        <a href="{{ route('products.index') }}" class="btn btn-secondary">Batal</a>
    </form>
@endsection
