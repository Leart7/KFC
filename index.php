<?php 
include "autoloader.php";
use Kfc\Libs\Product;
use Kfc\Libs\Homecategory; 
?>

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
