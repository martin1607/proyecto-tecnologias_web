<?php
header('Content-Type: application/json; charset=utf-8');

$mysqli = new mysqli("localhost","root","Axelchivas1607","marketzone_fix");
if ($mysqli->connect_errno) {
    echo json_encode(["error"=>"Error BD"]);
    exit;
}

/**********************
  1) RECURSOS POR DEPTO
**********************/
$sqlDepto="
SELECT departamento, COUNT(*) AS total
FROM recursos
WHERE eliminado=0
GROUP BY departamento;
";

$porDepartamento=[];
$res=$mysqli->query($sqlDepto);
while($row=$res->fetch_assoc()){
    $porDepartamento[]=$row;
}

/**********************
  2) RECURSOS POR EXT
**********************/
$sqlExt="
SELECT extension, COUNT(*) AS total
FROM recursos
WHERE eliminado=0
GROUP BY extension;
";

$porExtension=[];
$res=$mysqli->query($sqlExt);
while($row=$res->fetch_assoc()){
    $porExtension[]=$row;
}

/**********************
  3) DESCARGAS POR DÍA
**********************/
$sqlDia="
SELECT 
    DAYNAME(fecha_hora) AS dia,
    COUNT(*) AS total
FROM bitacora_descargas
GROUP BY DAYNAME(fecha_hora);
";

$porDiaSemana=[];
$res=$mysqli->query($sqlDia);
while($row=$res->fetch_assoc()){
    $porDiaSemana[]=$row;
}

/***************
 RETORNO JSON
***************/
echo json_encode([
    "porDepartamento"=>$porDepartamento,
    "porExtension"=>$porExtension,
    "porDiaSemana"=>$porDiaSemana
], JSON_PRETTY_PRINT);

$mysqli->close();
