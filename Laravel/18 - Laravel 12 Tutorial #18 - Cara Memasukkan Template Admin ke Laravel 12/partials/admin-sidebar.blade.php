<aside class="sidebar">
    <a class="brand" href="{{ route('dashboard') }}">Tokoku Admin</a>

    <ul class="nav flex-column">
        <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}"
               href="{{ route('dashboard') }}">Dashboard</a>
        </li>
        <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('products.*') ? 'active' : '' }}"
               href="{{ route('products.index') }}">Produk</a>
        </li>
    </ul>
</aside>
