@extends('layouts.app')

@section('title', 'Label ' . $product->name)

@section('content')
    <h1>{{ $product->name }}</h1>

    <h5>QR Code (menuju halaman detail)</h5>
    {!! QrCode::size(200)->generate(route('products.show', $product)) !!}

    <h5 class="mt-4">Barcode</h5>
    {!! $barcodeSvg !!}
    <div>{{ $kode }}</div>

    <button onclick="window.print()" class="btn btn-primary mt-3">Cetak</button>
@endsection
