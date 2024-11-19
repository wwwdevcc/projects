<?php include "header.php";
require_once '../src/auth/Auth.php';

$auth = new Auth('../data/users.json');

$auth->logout();

header("Location: /login.php");
exit;