<form action="{{ route('products.destroy', $product) }}" method="POST"
      onsubmit="return confirm('Yakin ingin menghapus {{ $product->name }}?')" class="d-inline">
    @csrf
    @method('DELETE')
    <button type="submit" class="btn btn-sm btn-danger">Hapus</button>
</form>
