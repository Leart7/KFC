<?php
use Kfc\Libs\Session;
require_once("autoloader.php");
$session = new Session();
$session->logout();
header("Location: ../index.php");
?>