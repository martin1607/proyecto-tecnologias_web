<?php
// stats.php
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$user = 'root';
$pass = 'Axelchivas1607';
$db   = 'marketzone_fix';

$mysqli = new mysqli($host, $user, $pass, $db);
if ($mysqli->connect_errno) {
    echo json_encode([
        'error' => 'Error de conexión: ' . $mysqli->connect_error
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// 1) Recursos por departamento
$sqlDepto = "
    SELECT 
        IFNULL(departamento, 'Sin departamento') AS departamento,
        COUNT(*) AS total
    FROM recursos
    WHERE eliminado = 0
    GROUP BY departamento
    ORDER BY total DESC
";

$resultDepto = $mysqli->query($sqlDepto);
$porDepartamento = [];
if ($resultDepto) {
    while ($row = $resultDepto->fetch_assoc()) {
        $porDepartamento[] = $row;
    }
    $resultDepto->free();
}

// 2) Recursos por extensión
$sqlExt = "
    SELECT 
        IFNULL(extension, 'n/a') AS extension,
        COUNT(*) AS total
    FROM recursos
    WHERE eliminado = 0
    GROUP BY extension
    ORDER BY total DESC
";

$resultExt = $mysqli->query($sqlExt);
$porExtension = [];
if ($resultExt) {
    while ($row = $resultExt->fetch_assoc()) {
        $porExtension[] = $row;
    }
    $resultExt->free();
}

$mysqli->close();

echo json_encode([
    'porDepartamento' => $porDepartamento,
    'porExtension'    => $porExtension
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
