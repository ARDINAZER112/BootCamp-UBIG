{{-- Di tabel index --}}
<td>{{ $product->category?->name ?? '-' }}</td>

{{-- Di form create/edit --}}
<div class="mb-3">
    <label for="category_id" class="form-label">Kategori</label>
    <select name="category_id" id="category_id" class="form-select">
        <option value="">-- Pilih kategori --</option>
        @foreach ($categories as $category)
            <option value="{{ $category->id }}"
                @selected(old('category_id', $product->category_id ?? null) == $category->id)>
                {{ $category->name }}
            </option>
        @endforeach
    </select>
</div>
