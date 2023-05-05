<!--**********************************
        Main wrapper start
    ***********************************-->
    <div id="main-wrapper">

<?php  
include "header.php";
use Kfc\Libs\Product;
?>
		
	<?php include "sidebar.php" ?>

        <!--**********************************
            Content body start
        ***********************************-->
        <div class="content-body">
            <div class="container-fluid">
            <?php
                        if (!empty($session->message)) {
                            echo "<div class='row page-titles d-flex justify-content-center text-center align-items-center' style='background-color:rgb(168,227,177);'>";
                            echo  $session->message;
                            echo "</div>";
                            
                        }
                        ?>
                <div class="row">
								<?php
										$product = new Product();
										$products = $product->find_all();
                                        
										foreach($products as $p){
											 	
												echo '<div class="col-xl-3 col-lg-6 col-md-4 col-sm-6">';
												echo "<a href='ecom-product-detail.php?pid={$p->getId()}'>"; 
												echo '<div class="card">';
												echo '<div class="card-body">';
												echo '<div class="new-arrival-product">';
												echo '<div class="new-arrivals-img-contnent">';
												echo "<img class='img-fluid' src='../images/{$p->getPhoto()}' alt=''>";
												echo '</div>';
												echo '<div class="new-arrival-content text-center mt-3">';
												echo "<h4>{$p->getEmri_produktit()}</h4>";
												echo '';
												echo "<span class='price'>{$p->getCmimi()}€</span>";
												echo '</div>';
												echo '</div>';
												echo '</div>';
												echo '</div>';
												echo "</a>";
												echo '</div>';
												
										}
                                       
									?>
                    
                    <!-- <div class="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="new-arrival-product">
                                    <div class="new-arrivals-img-contnent">
                                        <img class="img-fluid" src="images/product/2.jpg" alt="">
                                    </div>
                                    <div class="new-arrival-content text-center mt-3">
                                        <h4>Striped Dress</h4>
                                        <ul class="star-rating">
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                        </ul>
                                        <span class="price">$159.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    
                </div>
            </div>
        </div>
        <!--**********************************
            Content body end
        ***********************************-->


        <!--**********************************
            Footer start
        ***********************************-->
        <div class="footer">
            <div class="copyright">
                <p>Copyright © Designed &amp; Developed by <a href="http://dexignzone.com/" target="_blank">DexignZone</a> 2022</p>
            </div>
        </div>
        <!--**********************************
            Footer end
        ***********************************-->

        <!--**********************************
           Support ticket button start
        ***********************************-->

        <!--**********************************
           Support ticket button end
        ***********************************-->


    </div>
    <!--**********************************
        Main wrapper end
    ***********************************-->

    <!--**********************************
        Scripts
    ***********************************-->
    <!-- Required vendors -->
    <script src="vendor/global/global.min.js"></script>
    <script src="js/custom.min.js"></script>
	<script src="js/deznav-init.js"></script>
	
    <script src="vendor/highlightjs/highlight.pack.min.js"></script>



</body>


<!-- Mirrored from koki.dexignzone.com/xhtml/ecom-product-grid.html by HTTrack Website Copier/3.x [XR&CO'2014], Sat, 01 Apr 2023 14:59:02 GMT -->
</html>
