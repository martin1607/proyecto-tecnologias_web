<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Recursos Digitales - Dashboard</title>

    <link rel="stylesheet" href="https://bootswatch.com/4/superhero/bootstrap.min.css">
  </head>
  <body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="dashboard.php">Recursos Digitales</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="catalogo.php" target="_blank">Ver catálogo público</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="logout.php">Cerrar sesión</a>
          </li>
        </ul>

        <form class="form-inline ml-4" onsubmit="return false;">
          <input class="form-control mr-2" id="search"
                 type="text" placeholder="Buscar recurso...">
        </form>

      </div>
    </nav>

    <div class="container mt-4">
      <div class="row">

        <!-- FORMULARIO -->
        <div class="col-md-5">
          <div class="card">
            <div class="card-header"><h5 id="form-title">Agregar recurso digital</h5></div>
            <div class="card-body">

              <form id="product-form" enctype="multipart/form-data">
                <input type="hidden" id="productId">

                <label>Nombre</label>
                <input type="text" id="nombre" class="form-control" required>

                <label class="mt-2">Autor</label>
                <input type="text" id="autor" class="form-control" required>

                <label class="mt-2">Departamento</label>
                <input type="text" id="departamento" class="form-control" required>

                <label class="mt-2">Empresa</label>
                <input type="text" id="empresa" class="form-control" required>

                <label class="mt-2">Fecha creación</label>
                <input type="date" id="fecha_creacion" class="form-control" required>

                <label class="mt-2">Descripción</label>
                <textarea id="descripcion" class="form-control"></textarea>

                <label class="mt-2">Archivo</label>
                <input type="file" id="archivo" class="form-control" required>

                <button class="btn btn-primary btn-block mt-2" type="submit">Guardar</button>
                <button class="btn btn-secondary btn-block mt-2" type="button" id="btn-clear">
                  Limpiar
                </button>

              </form>
            </div>
          </div>
        </div>

        <!-- TABLA + GRÁFICAS -->
        <div class="col-md-7">

          <div class="card mb-4" id="product-result">
            <div class="card-header"><h5>Resultado</h5></div>
            <div class="card-body">
              <ul id="container"></ul>
            </div>
          </div>

          <div class="card">
            <div class="card-header"><h5>Lista de recursos digitales</h5></div>
            <div class="card-body p-0">
              <table class="table table-sm table-bordered mb-0">
                <thead>
                  <tr>
                    <th>ID</th><th>Nombre</th><th>Metadatos</th><th>Archivo</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="products"></tbody>
              </table>
            </div>
          </div>

          <!--GRÁFICAS -->
          <div class="card mt-4">
            <div class="card-header"><h5>Estadísticas de recursos</h5></div>
            <div class="card-body">

              <div class="row">
                <div class="col-md-6">
                  <h6 class="text-center">Recursos por departamento</h6>
                  <canvas id="chartDepartamentos" height="150"></canvas>
                </div>

                <div class="col-md-6">
                  <h6 class="text-center">Recursos por extensión</h6>
                  <canvas id="chartExtensiones" height="150"></canvas>
                </div>

                
                <div class="col-md-12 mt-4">
                  <h6 class="text-center">Descargas por día de la semana</h6>
                  <canvas id="chartDiaSemana" height="170"></canvas>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="app.js"></script>

  </body>
</html>
