<?php

namespace App\Controllers;

use \Core\View;
use \Core\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use App\Models\Cart;




/**
 * Home controller
 */
class CartController extends Controller
{

    /**
     * Show the index page
     *
     * @return void
     */
    public function index()
    {
      $cartItems = Cart::with('user', 'product')->get(['id', 'user_id', 'product_id', 'quantity']);
      
        
        View::renderTemplate('Cart/Cart.html', ['cartItems'=>$cartItems]);
        
    }
}
