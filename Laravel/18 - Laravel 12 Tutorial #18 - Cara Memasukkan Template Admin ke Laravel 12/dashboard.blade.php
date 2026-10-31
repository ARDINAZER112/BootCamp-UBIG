@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
    <h1>Dashboard</h1>
    <p>Total produk: {{ $totalProduk }}</p>
@endsection

@push('scripts')
    <script>console.log('Dashboard dimuat');</script>
@endpush
