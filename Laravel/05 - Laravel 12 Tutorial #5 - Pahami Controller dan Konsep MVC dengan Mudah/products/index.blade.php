@extends('layouts.app')

@section('content')
    <h1>Daftar Produk</h1>
    <ul>
        @foreach ($products as $p)
            <li>{{ $p['name'] }} - Rp {{ number_format($p['price'], 0, ',', '.') }}</li>
        @endforeach
    </ul>
@endsection
