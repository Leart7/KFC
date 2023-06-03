<?php

namespace App\Controllers;

use \Core\View;
use \Core\Controller;
use App\Models\Product;
use App\Models\Homecategory;

use App\Models\Cart;
use App\Models\User;


class ProductController extends Controller
{


    public function index()
    {
        $homecategories = Homecategory::where('id', '<>', 1)->with('products')->get();
        $activeHomeCategory = Homecategory::with('products')->first();
        View::renderTemplate('Products/index.html', ['homecategories'=>$homecategories, 'activeHomeCategory'=>$activeHomeCategory]);
    }

    public function details(){
        $product = Product::find($_GET['id']);
        View::renderTemplate('Products/productdetails.html', ['product'=>$product]);
    }
}
