@if ($product->image)
    <img src="{{ asset('storage/' . $product->image) }}" alt="{{ $product->name }}"
         class="img-thumbnail" style="max-width: 200px;">
@else
    <span class="text-muted">Tidak ada gambar</span>
@endif
