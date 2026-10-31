<form action="{{ route('products.index') }}" method="GET" class="row g-2 mb-3">
    <div class="col-auto">
        <input type="search" name="search" class="form-control"
               placeholder="Cari produk..." value="{{ request('search') }}">
    </div>
    <div class="col-auto">
        <button type="submit" class="btn btn-primary">Cari</button>
        @if (request('search'))
            <a href="{{ route('products.index') }}" class="btn btn-outline-secondary">Reset</a>
        @endif
    </div>
</form>
