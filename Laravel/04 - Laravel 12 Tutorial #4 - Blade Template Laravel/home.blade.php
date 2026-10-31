@extends('layouts.app')

@section('title', 'Beranda')

@section('content')
    <h1>Selamat datang</h1>

    @php $produk = ['Kopi', 'Teh', 'Gula']; @endphp

    @forelse ($produk as $p)
        <p>{{ $loop->iteration }}. {{ $p }}</p>
    @empty
        <p>Belum ada produk</p>
    @endforelse

    @if (count($produk) > 2)
        <p>Banyak pilihan</p>
    @elseif (count($produk) > 0)
        <p>Sedikit pilihan</p>
    @endif
@endsection
