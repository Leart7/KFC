
<div id="main-wrapper">

<?php
  include "header.php";
  use Kfc\Libs\Product;
  use Kfc\Libs\Category;
  use Kfc\Libs\Homecategory;
?>

<?php include "sidebar.php" ?>

<!--**********************************
    Content body start
***********************************-->
<div class="content-body">
    <div class="container-fluid">
        <?php
          
          if(isset($_GET['pid'])){
            $produktiid = $_GET['pid'];
            $product = new Product();
            $kategoria = new Category();
            $homecategory = new Homecategory();

            $p = $product->find_id($produktiid);
            $emri = $p->getEmri_produktit();
            $cmimi = $p->getCmimi();
            $k = $kategoria->find_id($p->getKategoria_id());
            $emriKategorise = $k->getEmri_kategorise();
            $foto = $p->getPhoto();
            if($p->getHome_category_id() != null){
              $hk = $homecategory->find_id($p->getHome_category_id());
              $emriHomeCategory = $hk->getHome_kategoria();
            }
            
            $pershkrimi = $p->getPershkrimi();
          }

          if (isset($_POST['update'])) {
            $p->setEmri_produktit($_POST['name']);
            $p->setPershkrimi($_POST['description']);
            $p->setCmimi($_POST['price']);
            $p->setKategoria_id($_POST['category']);
            $p->setHome_category_id($_POST['homecategory']);
            if(!empty($_FILES['image']['name'])){
                $p->setPhotoImage($_FILES['image']);
            }
            if($p->update()){
                echo("<script>location.href = 'ecom-product-grid.php'</script>");
                $session->message("Product modified successfully!");
            }
        }

          if(isset($_POST['remove'])){
            $p->delete();
            $session->message("Product deleted successfully!");
          }
          
        ?>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane fade show active" id="first">
                                        <img class="img-fluid" src="../images/<?php echo $foto ?>" alt="">
                                    </div>
                                    
                                </div>
                                <div class="tab-slide-content new-arrival-product mb-4 mb-xl-0">
                                    <!-- Nav tabs -->
                                </div>
                            </div>
                            <!--Tab slider End-->
                            <div class="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                                <div class="product-detail-content">
                                    <!--Product details-->
                                    <div class="new-arrival-content pr">
                                        <h4><?php echo $emri; ?></h4>
                <div class="d-table mb-2">
                  <p class="price float-left d-block"><?php echo $cmimi; ?>€</p>
                                        </div>
                                        <p>Availability: <span class="item"> In stock <i
                                                    class="fa fa-shopping-basket"></i></span>
                                        </p>
                                        <p>Product code: <span class="item" style="font-size:16px"><?php echo $produktiid; ?></span> </p>
                                        <p>Category: <span class="item"><?php echo $emriKategorise ; ?></span> </p>

                                        <p class="text-content">Description: <?php echo $pershkrimi; ?></p>
                                </div>
                            </div>
                            <form method="post" class="w-100 mt-5 rounded" enctype="multipart/form-data">
                            <div class="">
                                  <label for="name" class="form-label fw-bold">Product Name</label>
                                  <input type="text" class="form-control shadow-none" id="name" aria-describedby="emailHelp" placeholder="Name" name="name" value="<?php echo $emri ?>">
                              </div>
                              <div class="">
                                  <label for="price" class="form-label fw-bold">Price</label>
                                  <input type="text" class="form-control shadow-none" id="price" aria-describedby="emailHelp" placeholder="Price" name="price" value="<?php echo $cmimi ?>">
                              </div>
                              <div class="">
                                  <label for="description" class="form-label fw-bold">Description</label>
                                  <input type="text" class="form-control shadow-none" id="description" aria-describedby="emailHelp" placeholder="Description" name="description" value="<?php echo $pershkrimi ?>">
                              </div>
                              <!-- <div class="">
                                  <label for="category" class="form-label fw-bold">Category</label>
                                  <input type="text" class="form-control shadow-none" id="category" aria-describedby="emailHelp" placeholder="Description" name="category" value="<?php echo $emriKategorise ?>">
                              </div> -->
                              <div>
                              <label for="category" class="form-label fw-bold">Category</label>
                              <select class="form-control" id="exampleDropdown" name="category">
                              <?php
                                echo "<option value='{$p->getKategoria_id()}'>{$emriKategorise}</option>";
                                $categories = $kategoria->find_other_categories($p->getKategoria_id());
                                foreach($categories as $category){
                                  echo "<option value='{$category->getId()}'>{$category->getEmri_kategorise()}</option>";
                                }
                              ?>
                            </select>
                            </div>
                            <?php
                            if(isset($hk)){
                              echo '<div class="">';
                              echo '<label for="homecategories" class="form-label fw-bold">Home Category</label>';
                              echo '<select class="form-control" id="exampleDropdown2" name="homecategory">';
                              echo "<option value='{$p->getHome_category_id()}'>{$emriHomeCategory}</option>";
                              $homecategories = $homecategory->find_other_categories($p->getHome_category_id());
                              foreach($homecategories as $hcategory){
                              echo "<option value='{$hcategory->getId()}'>{$hcategory->getHome_kategoria()}</option>";
                                  }
                                  echo '</select>';
                                  echo '</div>';
                          }
                            ?>
                             <label for="image" class="form-label fw-bold">Product Image</label>
                        <div class="input-group custom_file_input ">
                        
                                    <div class="form-file">
                                        <input type="file" class="form-file-input form-control" name="image" id="image">
                                    </div>
                                </div> 
                              <button type="submit" class="btn btn-danger w-25 py-2 mb-5 fw-bold me-3 mt-3" name="update">UPDATE</button>
                              <button type="submit" class="btn btn-danger w-25 py-2 mb-5 fw-bold ms-3 mt-3" name="remove">REMOVE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

</div>
<?php include "footer.php" ?>