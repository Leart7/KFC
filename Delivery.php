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
      <?php
  $orderUser = new Order_user();
if(isset($_POST['checkout'])){
echo '<script type="text/javascript">';
echo ';(function () {';
echo 'var reloads = [0],';
echo "storageKey = 'reloadIndex',";
echo 'reloadIndex = parseInt(localStorage.getItem(storageKey), 10);';
echo '';
echo 'if (reloadIndex >= reloads.length || isNaN(reloadIndex)) {';
echo 'localStorage.removeItem(storageKey);';
echo 'return;';
echo '}';
echo '';
echo 'setTimeout(function(){';
echo 'window.location.reload();';
echo '}, reloads[reloadIndex]);';
echo '';
echo 'localStorage.setItem(storageKey, parseInt(reloadIndex, 10) + 1);';
echo '}());';
echo '</script>';
  echo("<script>location.href = 'checkout.php'</script>");
  $orderUser->setEmail($user->getId());
  $orderUser->create();
}
?>

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
