<?php 
include "header.php"; 
use Kfc\Libs\Category;
use Kfc\Libs\Cart; 
use Kfc\Libs\Product;
use Kfc\Libs\User;
use Kfc\Libs\Session;
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
              echo "<div class='col-md-12 bg-white product-container2 d-flex ' data-bs-toggle='modal' data-bs-target='#myModal$id' style='height:10vh; position:relative'>";    
              $cart = new Cart();
              $shumaSasise = $cart->getSasiaProduktit($id,$user->getId());
              if($shumaSasise > 0){
                echo "<div class='bg-danger px-2 h-25 text-white fw-bold' style='position:absolute; top:0; left:0;'>{$shumaSasise}</div>";
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

<?php
          $products = $product->find_all();
          foreach($products as $produkti){
            $id = $produkti->getId();
            echo "<div class='modal' id='myModal$id'> ";
            echo " <div class='modal-dialog modal-dialog-scrollable modal-xl' id='modalwidth'>";
            echo " <div class='modal-content'>";
            echo "<div class='modal-header'>";
            echo "<h4 class='modal-title ms-4 text-danger'>{$produkti->getEmri_produktit()}</h4>";
            echo "<button type='button' class='btn-close' data-bs-dismiss='modal'></button>";
            echo "</div>";
            echo "<div class='modal-body'>";
            echo "<p class='ms-4 text-dark' style='font-size: 18px;'>Photo Gallery</p>";
            echo "<div class='ms-4' style='height:15vh'>";
            echo "<img src='images/{$produkti->getPhoto()}' alt='' class='h-75'>";
            echo "</div>";
            echo "<p class='ms-4 text-dark' style='font-size: 18px;''>Shto Menu</p>";
            echo "<div class='form-check ms-5'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check1' name='option1' value='something' >";
            echo "<label class='form-check-label  w-100' for='check1'>Menu me Potato Wedges + Pije</label>";
            echo "</div>";
            echo "<p class='ms-4 text-dark mt-4' style='font-size: 18px;'>SHTO (max 10)</p>";
            echo "<div class='form-check ms-5'>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Potato Wedges</label>";
            echo "<p class='text-danger me-3'>+1.49€</p>";
            echo " </div>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Mayonaisse</label>";
            echo "<p class='text-danger me-3'>+0.10€</p>";
            echo " </div>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Ketchup</label>";
            echo "<p class='text-danger me-3'>+0.10€</p>";
            echo " </div>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Heineken</label>";
            echo "<p class='text-danger me-3'>+2.49€</p>";
            echo " </div>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Uje</label>";
            echo "<p class='text-danger me-3'>+0.79€</p>";
            echo " </div>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Miser</label>";
            echo "<p class='text-danger me-3'>+0.69€</p>";
            echo " </div>";
            echo "</div>";
            echo "<p class='ms-4 text-dark' style='font-size: 18px;'>Special Instructions</p>";
            echo "<form class='mx-4'>";
            echo "<div class='mb-3'>";
            echo " <input type='text' class='form-control shadow-none pb-5'  id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Add any special instructions' style='height: 8vh;''>";
            echo "</div>";
            echo "</form>";
            echo "</div>";
            echo "<div class='modal-footer d-flex align-items-center justify-content-between'>";
            echo "<form method='post' target='frame'>";
            echo "<button class='btn btn-transparent shadow-none text-secondary ms-4 minus' style='font-size: 50px;' name='minus{$produkti->getId()}'><p class='minuscontent'>-</p></button>";
            echo "<button class='btn btn-transparent shadow-none text-danger me-auto plus' style='font-size: 50px;' name='plus{$produkti->getId()}'><p>+</p></button>";
            echo "</form>";
            
              
            
            echo "<form method='post'>";
            echo "<div class='d-flex'>";
            
            echo "<button class='btn btn-danger px-5 py-3 d-flex justify-content-center align-items-center fw-bold butoni ' name='shto{$produkti->getId()}'><input class='px-2 py-2 number' name='vlera{$produkti->getId()}' value='1'>Add</button>";
            echo "</div>";
            echo "</form>";
            // echo "<input class='m-4' class='cmimi' value='{$produkti['cmimi']}'>";
            echo "</div>";
            echo "</div>";
            echo "</div>";
            echo "</div>";
            $numri = 0;
            if(isset($_POST['shto'.$produkti->getId()])){
              $sasia = $_POST['vlera'.$produkti->getId()];
              $numri = $sasia;
              $cart->insertCart($produkti->getId(),$user->getId(), $numri);
              echo("<script>location.href = 'delivery.php'</script>");
          }

      }      
            $value = $cart->getSasiaTotale($user->getId());
            echo "<input type='hidden' id='vlerasasise' class='fw-bold display-1 text-dark' value='{$value}'>";
        ?>

<?php
          $products = $product->find_all();
          foreach($products as $produkti){
            $id = $produkti->getId();
            $sasia = $cart->getSasiaProduktit($id,$user->getId());
            
            echo "<div class='modal' id='myModaledit$id'>";
            echo " <div class='modal-dialog modal-dialog-scrollable modal-xl'>";
            echo " <div class='modal-content'>";
            echo "<div class='modal-header'>";
            echo "<h4 class='modal-title ms-4 text-danger'>{$produkti->getEmri_produktit()}</h4>";
            echo "<button type='button' class='btn-close' data-bs-dismiss='modal'></button>";
            echo "</div>";
            echo "<div class='modal-body'>";
            echo "<p class='ms-4 text-dark' style='font-size: 18px;'>Photo Gallery</p>";
            echo "<div class='ms-4' style='height:15vh'>";
            echo "<img src='images/{$produkti->getPhoto()}' alt='' class='h-75'>";
            echo "</div>";
            echo "<p class='ms-4 text-dark' style='font-size: 18px;''>Shto Menu</p>";
            echo "<div class='form-check ms-5'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check1' name='option1' value='something' >";
            echo "<label class='form-check-label  w-100' for='check1'>Menu me Potato Wedges + Pije</label>";
            echo "</div>";
            echo "<p class='ms-4 text-dark mt-4' style='font-size: 18px;'>SHTO (max 10)</p>";
            echo "<div class='form-check ms-5'>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Potato Wedges</label>";
            echo "<p class='text-danger me-3'>+1.49€</p>";
            echo " </div>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Mayonaisse</label>";
            echo "<p class='text-danger me-3'>+0.10€</p>";
            echo " </div>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Ketchup</label>";
            echo "<p class='text-danger me-3'>+0.10€</p>";
            echo " </div>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Heineken</label>";
            echo "<p class='text-danger me-3'>+2.49€</p>";
            echo " </div>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Uje</label>";
            echo "<p class='text-danger me-3'>+0.79€</p>";
            echo " </div>";
            echo "<div class='my-3 d-flex formdiv'>";
            echo "<input class='form-check-input bg-secondary shadow-none' type='checkbox' id='check2' name='option1' value='something' >";
            echo "<label class='form-check-label w-100 ps-2' for='check2'>Miser</label>";
            echo "<p class='text-danger me-3'>+0.69€</p>";
            echo " </div>";
            echo "</div>";
            echo "<p class='ms-4 text-dark' style='font-size: 18px;'>Special Instructions</p>";
            echo "<form class='mx-4'>";
            echo "<div class='mb-3'>";
            echo " <input type='text' class='form-control shadow-none pb-5'  id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Add any special instructions' style='height: 8vh;''>";
            echo "</div>";
            echo "</form>";
            echo "</div>";
            echo "<div class='modal-footer d-flex align-items-center justify-content-between'>";
            echo "<form method='post' target='frame'>";
            echo "<button class='btn btn-transparent shadow-none text-secondary ms-4 minustwo' style='font-size: 50px;' name='minustwo{$produkti->getId()}'><p class='minuscontenttwo'>-</p></button>";
            echo "<button class='btn btn-transparent shadow-none text-danger me-auto plustwo' style='font-size: 50px;' name='plustwo{$produkti->getId()}'><p>+</p></button>";
            echo "</form>";
            
              
            
            echo "<form method='post'>";
            echo "<div class='d-flex'>";
            echo "<button class='btn btn-danger px-5 py-3 d-flex justify-content-center align-items-center fw-bold butoni' style='width:500px' name='shtotwo{$produkti->getId()}'><input class='px-3 py-2 numbertwo ' name='vleratwo{$produkti->getId()}' value='{$sasia}'>OK</button>";
            echo "</div>";
            echo "</form>";
            echo "</div>";
            echo "</div>";
            echo "</div>";
            echo "</div>";
            $numri = 0;
            if(isset($_POST['shtotwo'.$produkti->getId()])){
              $sasia = $_POST['vleratwo'.$produkti->getId()];
              $numri = $sasia;
              $cart->updateCart($produkti->getId(), $numri, $user->getId());
              echo("<script>location.href = 'delivery.php'</script>");
              }

}

        ?>
        </div>
    
    <!-- <script type="text/javascript">
    ;(function () {
        var reloads = [0],
            storageKey = 'reloadIndex',
            reloadIndex = parseInt(localStorage.getItem(storageKey), 10);

        if (reloadIndex >= reloads.length || isNaN(reloadIndex)) {
            localStorage.removeItem(storageKey);
            return;
        }

        setTimeout(function(){
            window.location.reload();
        }, reloads[reloadIndex]);

        localStorage.setItem(storageKey, parseInt(reloadIndex, 10) + 1);
    }());
</script>-->
<script>
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}
</script> 

<?php

?>
    
<div class="container-fluid col-xxl-3 col-xl-3 col-lg-3 col-md-12  border border-top-0 border-end-0 "  id="sidebar" >
      <div class="d-flex flex-column text-center align-items-center w-100" id="" style="height:100%">
      <p class="h3 text-danger mt-4 mb-3 fw-bold">YOUR ORDER</p>
      <img src="images/empty-cart.png" id="foto" alt="" class="img-fluid mt-5" style="width:40%" >
      <p class="h5 text-secondary mt-5" id="emptyorder">Your order is empty.</p>
      <div id="order" >
      <p class="h5 text-dark fw-bold">KFC GJILAN</p>
      <p class="">Min subtotal order: 5.00€</p>
      <form method="post">
      <a href="checkout.php"><button class="btn btn-danger w-75 py-2 fw-bold" style="font-size:20px" type="submit" name="checkout" >CHECKOUT</button></a>
      </form>
      
      <table class="table  table-borderless w-100">
        <tbody>
        <?php


          $products = $cart->find_cart($user->getId());
          $totali = 0;
          foreach($products as $cart){
            $product = $product->find_id($cart->getProdukti_id());
            
            if(isset($_POST['lista'.$cart->getProdukti_id()])){
              $vlera = $_POST['lista'.$cart->getProdukti_id()];
              if($vlera == 0){
                $cart->deleteCart($cart->getProdukti_id(), $user->getId());
                echo("<script>location.href = 'delivery.php'</script>");
                continue;
              }else{
                  $cart->updateCart($cart->getProdukti_id(), $vlera, $user->getId());
                  echo("<script>location.href = 'delivery.php'</script>");
                }
                
              }
          
            $emri = $product->getEmri_produktit();
            $sasia = $cart->getSasia();
            $product->setCmimi($product->getCmimi() *$sasia) ;
            $totali += $product->getCmimi();
            echo "<tr class='d-flex justify-content-between align-items-center  border border-start-0 border-top-0 border-end-0' >";
            echo "<td class=''><p class='text-danger mt-3 fw-bold d-inline  w-25' id='sasia'>{$sasia}</p>";
            
            echo "<form method='post' id='shtimi' class='d-inline'>";
            echo "<select class='form-select d-inline text-danger shadow-none ms-2' name='lista{$cart->getProdukti_id()}' aria-label='Default select example' style='width:2%; id='lista' onchange='this.form.submit()'>";
            echo "<option value='0'>Remove</option>";
            echo "<option value='1' selected>1</option>";
            for($i = 2; $i<100; $i++){
              echo "<option value='$i'>$i</option>";
            }
            echo "</select>";
            echo "</form>";
            echo "</td>";
           
            echo "<td class=' w-25'><p class=' fw-bold mt-3'>$emri</p></td>";
            echo "<td class=' w-25'></td>";
            echo "<td class='w-25 pe-4'><span class='fas fa-edit edit me-2' data-bs-toggle='modal' data-bs-target='#myModaledit{$cart->getProdukti_id()}' id='lapsi' style='color:green;font-size:20px'></span>{$product->getCmimi()}€</td>";
            echo "</tr>";

           
            
          }
          echo "<tr class='d-flex justify-content-between align-items-center  border border-start-0 border-top-0 border-end-0'>";
          echo "<td class='px-3'>Subtotal</td>";
          echo "<td class='me-4'>" .$totali . "€" ."</td> ";
          echo "</tr>";
          echo "<tr class='d-flex justify-content-between align-items-center  border border-start-0 border-top-0 border-end-0 '>";
          echo "<td class='px-3'>Tax(0%)</td>";
          echo "<td class='me-4'>0.00€</td>";
          echo "</tr>";
          echo "<tr class='d-flex justify-content-between align-items-center  border border-start-0 border-top-0 border-end-0'>";
          echo "<td class='px-3'>Delivery Fee</td>";
          echo "<td class='me-4'>0.00€</td> ";
          echo "</tr>";
          echo "<tr class='d-flex justify-content-between align-items-center text-dark border border-start-0 border-top-0 border-end-0' id='vat'>";
          echo "<td class='px-3'>";
          $value = $cart->getSasiaTotale($user->getId());
          echo $value; 
          echo "</td> ";
          echo "<td>Total including VAT(18%)</td> ";
          echo "<td class='px-3 me-3'>" .$totali ."€" . "</td> ";
          echo "</tr>";
          echo "</tbody>";
          echo "</table>"; 
        ?>
    </div>
    </div>
        </div>
    </div>
  </div>        
 <?php include "footer.php" ?>
