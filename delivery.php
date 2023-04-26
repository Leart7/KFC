<?php 
include "header.php"; 
use Kfc\Libs\Category;
use Kfc\Libs\Cart; 
use Kfc\Libs\Product;
use Kfc\Libs\User;
use Kfc\Libs\Session;
use Kfc\Libs\Order;
use Kfc\Libs\Order_user;
use Kfc\Libs\Adresa;
if($session->isSignedIn()){
    $userr = new User();
    $userEmail = $_SESSION['userId'];
    $user = $userr->find_id($userEmail);
  }

  if(!$session->isSignedIn()){
    header("Location: login.php");
}
?>

<div class="container-fluid  ">
  <div class="row d-flex">
    <div class="container-fluid col-xxl-9 col-xl-9 col-lg-9 col-md-12 d-flex flex-column border border-top-0 border-bottom-0 border-start-0"  id="maincontainer">

    <section class="" >
        <img src="images/prekeqitu.png" alt="" class="img-fluid w-100">
      </section>

      <section class="container ">
        <p class="h3 text-dark fw-bold ms-4 mt-3">KFC GJILAN</p>  
      </section>

      <div class="container-fluid mt-5">
  <ul class="nav nav-tabs nav-fill" id="menu" role="tablist" style="font-size:18px">
  <?php 

    $category = new Category();
    $categories = $category->find_all();

     echo " <li class='nav-item' role='presentation'>";
     echo "<button class='nav-link active text-danger fw-bold' id='all-tab' data-bs-toggle='tab' data-bs-target='#all' type='button' role='tab' aria-controls='home' aria-selected='true'>All</button>";
     echo "</li>";

     foreach($categories as $kategoria){
      $id = "id" .$kategoria->getId();
      echo " <li class='nav-item' role='presentation'> ";
      echo "<button class='nav-link text-danger fw-bold' id='{$kategoria->getEmri_kategorise()}-tab' data-bs-toggle='tab' data-bs-target='#$id' type='button' role='tab' aria-controls='home' aria-selected='false'>{$kategoria->getEmri_kategorise()}</button>";
      echo "</li>";
   }
    ?>
  </ul>
  <div class="container-fluid pe-4">
          <div class="input-group mx-3 mt-3" >
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-magnifying-glass" style="font-size: 24px;"></i></span>
            </div>
            <input type="text" class="form-control shadow-none mb-3 " placeholder="Search" aria-label="Username" aria-describedby="basic-addon1">
          </div>
        </div>
  <div class="container-fluid tab-content mb-5 px-3" id="myTabContent" style="height:100%">
 
    <?php
      echo "<div class='tab-pane fade show active' id='all' role='tabpanel' aria-labelledby='all-tab'>";

            foreach($categories as $kategoria){
              
              echo "<p class='h4 mt-4 ms-3 mb-3'>{$kategoria->getEmri_kategorise()}</p>";
              
              echo "<div class='row g-2 px-3 w-100 ' id='rowi'>";

              $product = new Product();
              $products = $product->find_all_tabs($kategoria->getId());

              foreach($products as $produktet4){
                $id = $produktet4->getId();
              echo "<div class='col-md-6'>";
              echo "<div class='col-md-12 bg-white product-container2 d-flex ' data-bs-toggle='modal' data-bs-target='#myModal$id' style='height:10vh;'>";    
              $cart = new Cart();
              $shumaSasise = $cart->getSasiaProduktit($id,$user->getId());
              if($shumaSasise > 0){
                echo "<div class='bg-danger px-2 h-25 text-white fw-bold'>{$shumaSasise}</div>";
              }
              echo "<img src='images/{$produktet4->getPhoto()}' alt='' class='h-75 align-self-center px-3'>";
              echo "<p class='fw-bold text-dark mt-3 ms-2 '>{$produktet4->getEmri_produktit()}</p>";
              echo "<p class='text-danger mt-3 ms-auto pe-3'>{$produktet4->getCmimi()}€</p>";
              echo "</div>";
              echo "</div>";
              }
              
              echo "</div>";
            }
            echo "</div>";
      
      foreach($categories as $kategoria){
        $id = "id" .$kategoria->getId();
        $katId = $kategoria->getId();
        echo "<div class='tab-pane fade' id='$id' role='tabpanel' aria-labelledby='{$kategoria->getEmri_kategorise()}-tab'>"; 
        echo "<p class='h4 mt-4 ms-3 mb-3'>{$kategoria->getEmri_kategorise()}</p>";
        echo "<div class='row g-2 px-3 w-100 ' id='rowi'>";
        $products = $product->find_all_tabs($katId);

        foreach($products as $produktet4){
              $id = $produktet4->getId();
        echo "<div class='col-md-6'>";
        echo "<div class='col-md-12 bg-white product-container2 d-flex px-3' data-bs-toggle='modal' data-bs-target='#myModal$id' style='height:10vh;'>";
        echo "<img src='images/{$produktet4->getPhoto()}' alt='' class='h-75 align-self-center'>";
        echo "<p class='fw-bold text-dark mt-3 ms-2 '>{$produktet4->getEmri_produktit()}</p>";
        echo "<p class='text-danger mt-3 ms-auto'>{$produktet4->getCmimi()}€</p>";
        echo "</div>";
        echo "</div>";
              }        
        echo "</div>";
        echo "</div>";
    }
    ?>
    </div>
</div>