{{-- Perhatikan enctype --}}
<form action="{{ route('products.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    {{-- ...field lain... --}}

    <div class="mb-3">
        <label for="image" class="form-label">Gambar</label>
        <input type="file" id="image" name="image"
               class="form-control @error('image') is-invalid @enderror" accept="image/*">
        @error('image') <div class="invalid-feedback">{{ $message }}</div> @enderror
    </div>

    <button type="submit" class="btn btn-primary">Simpan</button>
</form>
