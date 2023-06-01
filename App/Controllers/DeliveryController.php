<?php

namespace App\Controllers;

use \Core\View;
use \Core\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use App\Models\Cart;
use App\Helper\Session;
use Illuminate\Database\Capsule\Manager as DB;



/**
 * Home controller
 */
class DeliveryController extends Controller
{

    /**
     * Show the index page
     *
     * @return void
     */
    public function index()
    {
        $session = Session::getInstance();
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $userEmail = $user->email;
        // $categories = Category::with(['products' => function($query) {
        //     $query->leftJoin('carts', 'products.id', '=', 'carts.product_id')
        //           ->select('products.*', DB::raw('SUM(carts.quantity) as total_quantity'))
        //           ->groupBy('products.id');
        // }])->get();
        $categories = Category::with(['products' => function($query) use ($user) {
            $query->leftJoin(DB::raw('(SELECT product_id, SUM(quantity) as total_quantity FROM carts WHERE user_id = ' . $user->id . ' GROUP BY product_id) as user_carts'), function($join) {
                $join->on('products.id', '=', 'user_carts.product_id');
            })
            ->select('products.*', 'user_carts.total_quantity')
            ->groupBy('products.id');
        }])->get();

        $products = Product::with(['carts' => function ($query) use ($user) {
            $query->where('user_id', $user->id)
                  ->select('id', 'product_id', 'quantity');
        }])->get();
        

        // dd($products);
        $totalPrice = Product::join('carts', 'products.id', '=', 'carts.product_id')
                     ->where('carts.user_id', $user->id)
                     ->selectRaw('SUM(products.price * carts.quantity) as total_price')
                     ->value('total_price');

        $cartItems = Cart::leftJoin('products', 'carts.product_id', '=', 'products.id')
        ->leftJoin('users', 'carts.user_id', '=', 'users.id')
        ->where('users.email', $userEmail)
        ->select('carts.id', 'carts.user_id', 'carts.product_id', 'carts.quantity', DB::raw('carts.quantity * products.price as total_price'))
        ->get();

        $numberOfProducts = Cart::where('user_id', $user->id)
        ->selectRaw('SUM(quantity) as numofproducts')
        ->value('numofproducts');

        
        View::renderTemplate('ClientPage/delivery.html', ['categories'=>$categories, 'products'=>$products, 'cartproducts'=>$cartItems, 'totalprice'=>$totalPrice, 'numofproducts'=>$numberOfProducts, 'user'=>$user]);
    }

    // public function store(){
    //     $session = Session::getInstance();
    //     $user = $_SESSION['userId'];
    //     $user = User::find($user);

    //     $id = $_POST['idprodukti'];
    //     $idProdukti = Product::find($id);
    //     $sasia = $_POST['vlera'];
    //     $cart = new Cart();
    //     $cart->product_id = $idProdukti->id;
    //     $cart->user_id = $user->id;
    //     $cart->quantity = $sasia;
    //     $cart->save();

    //     $this->index();
    // }

    public function store()
{
    $session = Session::getInstance();
    $user = $_SESSION['userId'];
    $user = User::find($user);

    $id = $_POST['idprodukti'];
    $idProdukti = Product::find($id);
    $sasia = $_POST['vlera'];

    $existingCartItem = Cart::where('user_id', $user->id)
                            ->where('product_id', $idProdukti->id)
                            ->first();

    if ($existingCartItem) {
        $existingCartItem->quantity += $sasia;
        $existingCartItem->save();
    } else {
        $cart = new Cart();
        $cart->product_id = $idProdukti->id;
        $cart->user_id = $user->id;
        $cart->quantity = $sasia;
        $cart->save();
    }

    $this->index();
}


    public function update(){
        $id = $_POST['idprodukti'];
        $sasia = $_POST['vlera'];
        $cart = Cart::find($id);
        $cart->quantity = $sasia;
        $cart->save();
        $this->index();
    }

    public function delete(){
        $id = $_POST['idcart'];
        $cart = Cart::find($id);
        $value = $_POST['lista'];
        if($value == 0){
            $cart->delete();
            $this->index();
        }else{
            $cart->quantity = $value;
            $cart->save();
            $this->index();
        }
    }

}
