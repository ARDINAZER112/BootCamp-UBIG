@extends('layouts.app')

@section('title', $product->name)

@section('content')
    <h1>{{ $product->name }}</h1>

    <dl class="row">
        <dt class="col-sm-3">Harga</dt>
        <dd class="col-sm-9">Rp {{ number_format($product->price, 0, ',', '.') }}</dd>

        <dt class="col-sm-3">Stok</dt>
        <dd class="col-sm-9">{{ $product->stock }}</dd>

        <dt class="col-sm-3">Deskripsi</dt>
        <dd class="col-sm-9">{{ $product->description ?? '-' }}</dd>

        <dt class="col-sm-3">Dibuat</dt>
        <dd class="col-sm-9">{{ $product->created_at->format('d M Y H:i') }}</dd>
    </dl>

    <a href="{{ route('products.index') }}" class="btn btn-secondary">Kembali</a>
@endsection
