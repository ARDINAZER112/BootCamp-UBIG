<div class="mb-3">
    <label for="name" class="form-label">Nama</label>
    <input type="text" id="name" name="name"
           class="form-control @error('name') is-invalid @enderror"
           value="{{ old('name') }}">
    @error('name')
        <div class="invalid-feedback">{{ $message }}</div>
    @enderror
</div>

{{-- Daftar semua error sekaligus --}}
@if ($errors->any())
    <div class="alert alert-danger">
        <ul class="mb-0">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
