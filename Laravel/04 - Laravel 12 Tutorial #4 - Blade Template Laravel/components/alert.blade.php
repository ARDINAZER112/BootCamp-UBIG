@props(['type' => 'info'])

<div {{ $attributes->merge(['class' => "alert alert-$type"]) }}>
    {{ $slot }}
</div>

{{-- Pemakaian: <x-alert type="danger">Terjadi kesalahan</x-alert> --}}
