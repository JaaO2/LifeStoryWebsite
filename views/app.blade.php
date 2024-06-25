<html>
  <head>
    <!-- Include Frontend Application (webpack mix) -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/sass/app.scss', 'resources/js/app.jsx'])
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://kit.fontawesome.com/8a564a3416.js" crossorigin="anonymous"></script>
    <link rel="icon" href="{{ asset('storage//logos/ls.png') }}" type="image/png">
    <title>Life Story - Polski serwer RPG</title>
  </head>

  <body>
    @yield('content')
  </body>

</html>
