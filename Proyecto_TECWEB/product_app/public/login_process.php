<?php

session_start();


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.php');
    exit;
}

$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');

$USER_VALIDO = 'rodotex';
$PASS_VALIDA = '1234';

if ($username === $USER_VALIDO && $password === $PASS_VALIDA) {
   
    $_SESSION['user'] = $username;
    header('Location: dashboard.php');
    exit;
} else {
    
    $error = urlencode('Usuario o contraseña incorrectos');
    header("Location: login.php?error=$error");
    exit;
}
