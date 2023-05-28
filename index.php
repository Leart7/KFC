<?php 
include "autoloader.php";
use Kfc\Libs\Product;
use Kfc\Libs\Homecategory; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="bootstrap-5.3.0-alpha1-dist/css/bootstrap.css">
  <link rel="stylesheet" href="index.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="bootstrap-5.3.0-alpha1-dist/js/bootstrap.js"></script>
  <style>
    body{
  min-height: 2850px;
  
}
  </style>
</head>
<body>

  <nav class="navbar navbar-expand-md navbar-light mt-3">
    <div class="container d-inline ">
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="index.html" class="nav-link">HOME</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">COLONEL SANDERS</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">FINGER LICKIN' GOOD</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">RESTAURANTS</a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">JOIN OUR TEAM</a>
              </li>
            </ul>
        </div>
    </div>
</nav>



<div class="container">
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-8 align-self-center ">
      <p class="display-3 fw-bold text-center">The right way to<br>do chicken</p>
    </div>
  <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-4 d-flex flex-column align-items-center  " id="logo">
    <img src="images/kfclogo.png" alt="" class="d-block  img-fluid " >
    <a href="login.php"><button class="btn btn-danger text-light btn-lg ps-5 pe-5 fw-bold mb-3 ">DELIVERY</button></a>
  </div>
</div>
</div>

<div class="container mt-5">
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
      <img src="images/Twister_Box_1x1-1.jpg" alt="" class="img-fluid">
    </div>
    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
      <img src="images/Mbushje-e-20ve-1-min.jpg" alt="" class="img-fluid">
    </div>
  </div>
</div>

<section class="container">
  <p class="display-5 mt-5 fw-bold">Menu</p>
</section>
<div class="container mt-5">
  <ul class="nav nav-tabs nav-fill text-muted" id="menu" role="tablist" style="font-size:18px">
    <?php 

    $category = new Homecategory();
    $c = $category->find_id(1);
    $emriP1 = $c->getHome_kategoria();
    $idP1 = "id" .$c->getId();
    $katP1 = $c->getId();

    $categories = $category->find_other_homecategories();

     echo " <li class='nav-item' role='presentation'>";
     echo "<button class='nav-link active text-secondary' id='$emriP1-tab' data-bs-toggle='tab' data-bs-target='#$idP1' type='button' role='tab' aria-controls='home' aria-selected='true'>$emriP1</button>";
     echo "</li>";

     foreach($categories as $kategoria){
      $id = "id" .$kategoria->getId();
      echo " <li class='nav-item' role='presentation'> ";
      echo "<button class='nav-link text-secondary' id='{$kategoria->getHome_kategoria()}-tab' data-bs-toggle='tab' data-bs-target='#$id' type='button' role='tab' aria-controls='home' aria-selected='false'>{$kategoria->getHome_kategoria()}</button>";
      echo "</li>";
      
   }
    ?>
  </ul>
  
  <div class="tab-content" id="myTabbContent">
    <?php
      echo "<div class='tab-pane fade show active' id='$idP1' role='tabpanel' aria-labelledby='$emriP1-tab'>";
        $product = new Product();
        $products = $product->find_active_home_tab();

        echo "<div class='row'>";
        foreach($products as $produktet3){
          $produktiid = $produktet3->getId();
          echo "<div class='col-xl-3 col-lg-3 col-md-6 display-flex flex-column d-flex flex-column align-items-center'>";
                echo "<a href='product.php?pid=$produktiid'><img src='images/{$produktet3->getPhoto()}' alt='' class='img-fluid product' ></a>";
                echo "<a href='product.php?pid=$produktiid' class='h4 text-muted title' id='product-title'>{$produktet3->getEmri_produktit()}</a>";
                echo "<p class='h2 text-danger fw-bold'>{$produktet3->getCmimi()}€</p>";
                echo "</div>";
        }
      echo "</div>";
      echo "</div>";
      
      foreach($categories as $kategoria){
        $id = "id" .$kategoria->getId();
        $katid = $kategoria->getId();
        echo "<div class='tab-pane fade' id='$id' role='tabpanel' aria-labelledby='{$kategoria->getHome_kategoria()}-tab'>"; 
              $otherProducts = $product->find_other_home_tab($katid);
              echo "<div class='row '>";
              foreach($otherProducts as $produktet4){
                $produktiid = $produktet4->getId();
                echo "<div class='col-xl-3 col-lg-3 col-md-6 display-flex flex-column d-flex flex-column align-items-center'>";
                echo "<a href='product.php?pid=$produktiid'><img src='images/{$produktet4->getPhoto()}' alt='' class='img-fluid product' ></a>";
                echo "<a href='product.php?pid=$produktiid' class='h4 text-muted title' id='product-title'>{$produktet4->getEmri_produktit()}</a>";
                echo "<p class='h2 text-danger fw-bold'>{$produktet4->getCmimi()}€</p>";
                echo "</div>";
              }        
        echo "</div>";
        echo "</div>";
    }
    ?>
    </div>

</div>

<section class="container">
  <img src="images/banner.png" alt="" class="img-fluid ms-auto me-auto d-block mt-5">
</section>

<section class="container" id="description">
  <p class="display-3 fw-bold text-center">REAL & FRESH MEALS</p>
  <p class="text-danger text-center fw-bold" style="font-size:18px">We’re proud to serve wholesome, abundant, hot meals the way they<br>
    should be served—made with high-quality fresh chicken, freshly<br>
    prepared by real cooks in our kitchens.</p>
</section>

<hr class="container" style="margin-top: 10vh; margin-bottom: 7vh;">

<section class="container">
  <p class="text-center text-muted" style="font-size: 18px;">Want to find your nearest KFC?<br>
    Check our Map.  </p>
    <div class="d-flex justify-content-center">
      <button class="btn btn-danger px-3 me-3">MAP VIEW</button>
      <a href="login.php"><button class="btn btn-danger px-3">DELIVERY</button></a>
    </div>
</section>

<section class="container d-flex justify-content-around mt-5">
  <div>
    <p>&#169; 2022 KFC Kosovo Inc.</p>
  </div>
  <div class="icons">
    <i class="fa fa-facebook mx-3" style="font-size: 30px;"></i>
    <i class="fa fa-instagram mx-3" style="font-size: 30px;"></i>
    <i class="fa fa-youtube-play mx-3" style="font-size: 30px;"></i>
  </div>
</section>


<div class="container d-flex justify-content-center" id="decoration" style="height:5vh" >
  <div class="bg-danger mx-2 " style="width: 2%;"></div>
  <div class="bg-danger mx-2 " style="width: 2%;"></div>
  <div class="bg-danger mx-2 " style="width: 2%;"></div>
</div>

</body>
</html>
