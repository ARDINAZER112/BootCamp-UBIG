<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Admin') | Tokoku</title>

    <link rel="stylesheet" href="{{ asset('assets/admin/css/style.css') }}">
    @stack('styles')
</head>
<body>
    <div class="wrapper">
        @include('partials.admin-sidebar')

        <div class="main">
            @include('partials.admin-navbar')

            <div class="content p-4">
                @if (session('success'))
                    <div class="alert alert-success alert-dismissible fade show">
                        {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                @endif

                @yield('content')
            </div>

            @include('partials.admin-footer')
        </div>
    </div>

    <script src="{{ asset('assets/admin/js/app.js') }}"></script>
    @stack('scripts')
</body>
</html>
