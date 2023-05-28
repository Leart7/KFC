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
?>

<div class="container-fluid  ">
  <div class="row d-flex">
    <div class="container-fluid col-xxl-9 col-xl-9 col-lg-9 col-md-12 d-flex flex-column border border-top-0 border-bottom-0 border-start-0 align-items-center "  id="maincontainer">
    <div class="w-75">
      <hr>
        <form class="mt-4 w-75 me-3 ms-auto " method="post">
      <div class="mb-3">
          <label class="text-dark fw-bold mb-3">User Details</label>
          <input type="text" class="form-control shadow-none" id="name" aria-describedby="emailHelp" placeholder="Name" name="name" value="<?php if(!empty($user->getEmri())){echo $user->getEmri();} ?>">
      </div>
      <div class="mb-3">
          <input type="text" class="form-control shadow-none" id="lastname" aria-describedby="emailHelp" placeholder="Last name" name="lastname" value="<?php if(!empty($user->getMbiemri())){echo $user->getMbiemri();} ?>">
      </div>
      <div class="mb-3">
          <input type="email" class="form-control shadow-none" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name="email" value="<?php if(!empty($user->getId())){echo $user->getId();} ?>">
      </div>
      <div class="mb-3">
          <input type="text" class="form-control shadow-none" id="phone" placeholder="Phone / Mobile" name="phone" value="<?php if(!empty($user->getTelefoni())){echo $user->getTelefoni();} ?>">
      </div>
      <div class="input-group mb-3">
  <input type="text" class="form-control shadow-none" placeholder="Discount coupon" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <button class="btn btn-danger px-3 fw-bold" type="button">Apply</button>
  </div>
</div>
  </form>
  <hr class="mt-4">
      </div>
      <div class="w-75">
        <div class="w-75 ms-auto me-3">
        <p class="text-dark fw-bold">Address</p>
        <img src="images/staticmap.png" alt="" class="w-100">
        <div class="d-flex justify-content-between ">
          <div class="d-flex flex-column ">
            <?php  

            $adresa = new Adresa();
            $kushti =  $adresa->countAddress($user->getId());
            if($kushti > 0){
              $a = $adresa->noAddresses($user->getId());
            
              echo "<p type='text' class='border-0 text-dark fw-bold mt-2 noborder'>{$a->getAdresa()}</p>";
              echo "<p type='text' class='border-0 text-muted noborder' style='font-size:12px; margin-top:-1vh'>{$a->getNotes()}</p>";   
            }
            
            ?>
         
        
          </div>
        <button class="btn btn-outline-danger btn-sm rounded-pill px-3 h-25 mt-2">Change</button>
        </div>
        </div>
  <hr class="">
      </div>
      <div class="w-75">
        <div class="w-75 ms-auto me-3">
        <span class="text-dark fw-bold">Delivery time</span><span class="text-secondary fw-bold ms-4">ASAP</span>
        </div>
      
  <hr class="">
      </div>
      <div class="w-75">
        <div class="w-75 ms-auto me-3">
        <p class="text-dark fw-bold">Payment method</p>
        <label class="form-control border-0 labela" style="font-size:18px">
  <input type="radio" name="radio" value="option2" id="option2" style="height:25px; width:25px; vertical-align: middle;" />
  Cash (We do not accept Banknotes larger than 50 EUR)
</label>
<div class="ms-3 mt-3 text-muted" id="extra-text" style="display:none;">
<p>Don't have exact amount? Let us know how much will you pay</p>
<hr class="w-100 ms-auto">
</div>


<label class="form-control border-0 mt-3 labela" style="font-size:18px">
  <input type="radio" name="radio" value="option1" id="option1" style="height:25px; width:25px; vertical-align: middle;" />
  Card on delivery
</label>
        </div>
      
  <hr class="w-75 ms-auto">
      </div>
    </div>

    <script>
  // Get the radio buttons and extra text element
  const option1 = document.getElementById("option1");
  const option2 = document.getElementById("option2");
  const extraText = document.getElementById("extra-text");

  // Add an event listener to the radio buttons
  option1.addEventListener("change", toggleExtraText);
  option2.addEventListener("change", toggleExtraText);

  // Define the toggleExtraText function
  function toggleExtraText() {
    if (option2.checked) {
      extraText.style.display = "block";
    } else {
      extraText.style.display = "none";
    }
  }
</script>
    
<div class="container-fluid col-xxl-3 col-xl-3 col-lg-3 col-md-12  border border-top-0 border-end-0"  id="sidebar" >
      <div class="d-flex flex-column text-center align-items-center w-100 mb-3" id="" >
      <p class="h3 text-danger mt-4 mb-3 fw-bold">YOUR ORDER</p>
      <div id="order" >
      <p class="h5 text-dark fw-bold">KFC GJILAN</p>
      <a href="delivery.php" class="text-danger mt-4 mb-3 fw-bold" id="editorder">Edit Order</a>
      <table class="table  table-borderless w-100">
        <tbody>
        <?php
          $product = new Product();
          $products = $cart->find_cart($user->getId());
          $totali = 0;
          $orderUser = new Order_user();
          $cart = new Cart();
          $carts = $cart->find_all();
          $id =  $orderUser->nextId();
          echo "<form method='post'>";
          if($kushti > 0 ){
            echo "<input type='text' hidden name='adresa' value='{$a->getAdresa()}'>";
            echo "<input type='text' hidden name='notes' value='{$a->getNotes()}'";
          }
         
          echo "</form>";
          if(isset($_POST['placeorder'])){
            foreach($carts as $c){
              $product = $product->find_id($c->getProdukti_id());
              
              $order = new Order();
              $order->insertOrder($id,$user->getId(), $c->getProdukti_id(),$c->getSasia(),$product->getCmimi(), date("Y-m-d h:i"), $_POST['adresa'], $_POST['notes']);
              $cart->deleteCart($c->getProdukti_id(),$user->getId());
              echo("<script>location.href = 'orderRecieved.php?id=$id'</script>");
            }
          }          

          foreach($products as $cart){
            $product = $product->find_id($cart->getProdukti_id());
          
            $emri = $product->getEmri_produktit();
            $sasia = $cart->getSasia();
            $product->setCmimi($product->getCmimi() *$sasia) ;
            $totali += $product->getCmimi();
            echo "<tr class='d-flex justify-content-between align-items-center  border border-start-0 border-top-0 border-end-0 pe-3' >";
            echo "<td class=''><p class='text-danger mt-3 fw-bold d-inline me-3' id='sasia'>{$sasia}<p class=' fw-bold mt-3 d-inline'>$emri</p></p>";
            echo "<td ><p class='mt-3 mx-2 d-inline'>{$product->getCmimi()}€</p></td>";
            echo "</tr>";
          }
          echo "<tr class='d-flex justify-content-between align-items-center  border border-start-0 border-top-0 border-end-0'>";
          echo "<td class='px-3'>Subtotal</td>";
          echo "<td class='px-3'>" .$totali . "€" ."</td> ";
          echo "</tr>";
          echo "<tr class='d-flex justify-content-between align-items-center  border border-start-0 border-top-0 border-end-0 '>";
          echo "<td class='px-3'>Tax(0%)</td>";
          echo "<td class='px-3'>0.00€</td>";
          echo "</tr>";
          echo "<tr class='d-flex justify-content-between align-items-center  border border-start-0 border-top-0 border-end-0'>";
          echo "<td class='px-3'>Delivery Fee</td>";
          echo "<td class='px-3'>0.00€</td> ";
          echo "</tr>";
          echo "<tr class='d-flex justify-content-between align-items-center text-dark border border-start-0 border-top-0 border-end-0' id='vat'>";
          echo "<td class='px-3'>";
          $value = $cart->getSasiaTotale($user->getId());
          echo $value; 
          echo "</td> ";
          echo "<td>Total including VAT(18%)</td> ";
          echo "<td class='px-3'>" .$totali ."€" . "</td> ";
          echo "</tr>";
      
          echo "</tbody>";
          echo "</table>"; 
          echo '<form method="post">';
          echo "<a href='orderRecieved.php?id=$id'><button class='btn btn-danger w-75 py-2 fw-bold' style='font-size:20px' name='placeorder'>PLACE ORDER</button></a>";
          echo '</form>';
        ?>
    </div>
    </div>
        </div>
    </div>
  </div>        
 <?php include "footer.php" ?>