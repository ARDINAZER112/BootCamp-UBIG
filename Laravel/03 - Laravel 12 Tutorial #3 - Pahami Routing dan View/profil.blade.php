<h1>Halo, {{ $nama }}</h1>
<ul>
    @foreach ($skill as $s)
        <li>{{ $s }}</li>
    @endforeach
</ul>
