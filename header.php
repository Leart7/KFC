<?php 
require_once "autoloader.php";
use Kfc\Libs\Cart;
use Kfc\Libs\User;
use Kfc\Libs\Session;
$session = new Session();
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KFC</title>
  <link rel="stylesheet" href="includes/bootstrap.min.css">
  <link rel="stylesheet" href="index.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://kit.fontawesome.com/03fc5cf120.js" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
</head>
<body>
  
  <nav class="navbar navbar-expand-md navbar-light border-bottom  ">
    <div class="container d-inline me-4">
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
             
                <li class="nav-item me-3">
                    <a href="delivery.php" class="nav-link text-danger"><i class="fa fa-home me-1"></i>HOME</a>
                </li>
                <li class="nav-item me-3">
                  <div class="btn-group">
                    <button class="btn btn-outline-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" style="font-size: 18px;">
                        MORE
                    </button>
                    <div class="dropdown-menu" id="test">
                        <a class="dropdown-item " href="#">Politikat e Privatesise</a>
                        <a class="dropdown-item" href="#">Terms of use</a>
                        <a class="dropdown-item" href="#">Privacy Policy</a>
                        <a class="dropdown-item" href="#">Contact Us</a>
                        <a class="dropdown-item" href="#">Help with an order</a>
                        <a class="dropdown-item" href="#">Account and Payment Options</a>
                        <a class="dropdown-item" href="#">Guide to Ordering</a>
                    </div>
                  </div>
                </li>
                <?php
                  if(!$session->isSignedIn()){
                    echo "<li class='nav-item me-3' >";
                    echo "<a href='login.php' class='nav-link text-danger' id='loginli'><i class='fa fa-sign-in me-1'></i>LOGIN</a>";
                    echo "</li>";
                    echo "<li class='nav-item me-3'>";
                    echo "<a href='signup.php' class='nav-link text-danger' id='signupli'><i class='fa fa-user-plus me-1'></i>SIGN UP</a>";
                    echo "</li>";
                  }
                ?>
                <?php
                  if($session->isSignedIn()){
                    echo "<li class='nav-item me-3'>";
                    echo "<a href='myaccount.php' class='nav-link text-danger'><i class='fa-solid fa-user me-1'></i>MY ACCOUNT</a>";
                    echo "</li>";
                    echo "<li class='nav-item me-3'>";
                    echo "<a href='logout.php' class='nav-link text-danger'><i class='fa-solid fa-power-off me-1'></i>LOGOUT</a>";
                    echo "</li>";
                    
                    $userEmail = $_SESSION['userId'];
                    $user = new user();
                    $u = $user->find_id($userEmail);
                  }
                ?>
                <li class="nav-item" style="max-width:85px" >
                  <a href="#" class="nav-link text-white px-3 rounded fw-bold bg-danger" id="shoppingbag"><i class="fa fa-bag-shopping me-2"></i>
                    <p class="d-inline">  
                    <?php 
                    if($session->isSignedIn()){
                  $cart = new Cart();
                  $value = $cart->getSasiaTotale($user->getId());
                  echo $value;
                    }
                  
                  ?></p>
                  </a>
              </li>
            </ul>
        </div>
    </div>
  </nav>