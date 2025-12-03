<?php
session_start();
if (isset($_SESSION['user'])) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Acceso - Proyecto TECWEB</title>
    <link rel="stylesheet" href="https://bootswatch.com/4/superhero/bootstrap.min.css">
</head>
<body class="bg-dark">

<div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="col-md-4">
        <div class="card">
            <div class="card-header text-center">
                <h4>Inicio de sesión</h4>
            </div>
            <div class="card-body">
                <?php if (isset($_GET['error'])): ?>
                    <div class="alert alert-danger">
                        <?= htmlspecialchars($_GET['error']) ?>
                    </div>
                <?php endif; ?>

                <form action="login_process.php" method="POST">
                    <div class="form-group">
                        <label for="username">Usuario</label>
                        <input type="text"
                               class="form-control"
                               id="username"
                               name="username"
                               placeholder="usuario"
                               required>
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password"
                               class="form-control"
                               id="password"
                               name="password"
                               placeholder="contraseña"
                               required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

</body>
</html>
