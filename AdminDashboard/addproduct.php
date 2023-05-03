<div id="main-wrapper">
<?php
include "header.php";
use Kfc\Libs\Product;
use Kfc\Libs\Category;
use Kfc\Libs\Homecategory;
$kategoria = new Category();
$homecategory = new Homecategory();
 ?>
 <?php include "sidebar.php" ?>
 <?php
                if (isset($_POST['add']) && isset($_FILES['image'])) {
                    $product = new Product();
                    $product->setEmri_produktit($_POST['name']);
                    $product->setPershkrimi($_POST['description']);
                    $product->setCmimi($_POST['price']);
                    $product->setKategoria_id($_POST['category']);
                    $product->setHome_category_id($_POST['homecategory']);
                    $product->setPhotoImage($_FILES['image']);
                    $product->create();
                     
                }

                ?>
 <div class="content-body">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <!--Tab slider End-->
                            <div class="col">
                                <div class="product-detail-content">
                                    <!--Product details-->
                                    <p class="h1 text-center">ADD PRODUCT</p>    
                                    <form method="post" id="add_user" action="" enctype="multipart/form-data">
                                <div class="form-group">
                                <label for="name" class="form-label fw-bold">Product Name</label>
                                    <input class="form-control py-4" name="name" id="name" type="text" placeholder="Enter product name" />
                                </div>
                                <div class="form-group">
                                <label for="price" class="form-label fw-bold">Price</label>
                                    <input class="form-control py-4" name="price" id="price" type="text" placeholder="Enter price" />
                                </div>
                                <div class="form-group">
                                <label for="description" class="form-label fw-bold">Description</label>
                                    <input class="form-control py-4" name="description" id="description" type="text" placeholder="Enter Description" />
                                </div>
                                <div>
                                      <label for="category" class="form-label fw-bold">Category</label>
                                      <select class="form-control" id="exampleDropdown" name="category">
                                      <?php
                                        
                                        $categories = $kategoria->find_all();
                                        foreach($categories as $category){
                                          echo "<option value='{$category->getId()}'>{$category->getEmri_kategorise()}</option>";
                                        }
                                      ?>
                                    </select>
                                    </div>
                                    <div>
                                      <label for="homecategory" class="form-label fw-bold">Home Category</label>
                                      <select class="form-control" id="exampleDropdown" name="homecategory">
                                      <?php
                                        
                                        $homecategories = $homecategory->find_all();
                                        foreach($homecategories as $hcategory){
                                          echo "<option value='{$hcategory->getId()}'>{$hcategory->getHome_kategoria()}</option>";
                                        }
                                      ?>
                                    </select>
                                    </div>
                                    <label for="image" class="form-label fw-bold">Product Image</label>
                                <div class="input-group custom_file_input ">
                                
                                            <div class="form-file">
                                                <input type="file" class="form-file-input form-control" name="image" id="image">
                                            </div>
                                        </div> 

                                <div class="d-flex justify-content-center">
                              <button type="submit" class="btn btn-danger w-25 py-3 mb-5 fw-bold me-3 mt-3" name="add">ADD</button>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

</div>
    <?php
//     $product = new Product();
// $products = $product->find_all();
// foreach($products as $p){
//   echo $p->getEmri_produktit();
//   echo "<img src='images/{$p->getPhoto()}' style='width:35px'>";
// }
    ?>

<?php include "footer.php" ?>











