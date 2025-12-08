<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Catálogo de Recursos Digitales</title>
    <link rel="stylesheet" href="https://bootswatch.com/4/superhero/bootstrap.min.css">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="catalogo.php">Catálogo de Recursos</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <form class="form-inline ml-auto" onsubmit="return false;">
      <input class="form-control mr-sm-2"
             type="search"
             placeholder="Buscar por nombre, autor, departamento..."
             aria-label="Buscar"
             id="search-catalog">
      <button class="btn btn-success my-2 my-sm-0" type="button">
        Buscar
      </button>
    </form>

    <ul class="navbar-nav ml-2">
      <li class="nav-item">
        <a class="nav-link" href="login.php">Ir al Login / Dashboard</a>
      </li>
    </ul>
  </div>
</nav>

<div class="container my-4">
    <div class="row">
        <div class="col-12 mb-3">
            <h3 class="text-center">Catálogo público de recursos digitales</h3>
            <p class="text-center text-muted">
                Consulta y descarga los recursos registrados en el sistema.
            </p>
        </div>
    </div>

    <!-- Mensajes / estado -->
    <div class="row">
        <div class="col-12">
            <div id="catalogo-mensaje"></div>
        </div>
    </div>

    <!-- Contenedor de tarjetas -->
    <div class="row" id="catalogo-recursos">
        <!-- Aquí se insertan las cards con JS -->
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
<script src="catalogo.js"></script>
</body>
</html>
