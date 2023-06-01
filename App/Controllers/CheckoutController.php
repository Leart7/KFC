<?php

namespace App\Controllers;

use \Core\View;
use \Core\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Address;
use App\Models\OrderUser;
use App\Helper\Session;
use Illuminate\Database\Capsule\Manager as DB;



/**
 * Home controller
 */
class CheckoutController extends Controller
{

    public function create()
    {
      $session = Session::getInstance();
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $userEmail = $user->email;

        $orderUser = new OrderUser();
        $orderUser->user_id = $user->id;
        $orderUser->save();

      $cartItems = Cart::leftJoin('products', 'carts.product_id', '=', 'products.id')
      ->leftJoin('users', 'carts.user_id', '=', 'users.id')
      ->where('users.email', $userEmail)
      ->select('carts.id', 'carts.user_id', 'carts.product_id', 'carts.quantity', DB::raw('carts.quantity * products.price as total_price'))
      ->get();

      $totalPrice = Product::join('carts', 'products.id', '=', 'carts.product_id')
                     ->where('carts.user_id', $user->id)
                     ->selectRaw('SUM(products.price * carts.quantity) as total_price')
                     ->value('total_price');

      $numberOfProducts = Cart::where('user_id', $user->id)
      ->selectRaw('SUM(quantity) as numofproducts')
      ->value('numofproducts');
      $address = Address::where('user_id', $user->id)->orderBy('updated_at', 'desc')->first();

         View::renderTemplate('ClientPage/checkout.html', ['cartproducts'=>$cartItems, 'user'=>$user, 'totalprice'=>$totalPrice, 'numofproducts'=>$numberOfProducts, 'address'=>$address]);
    }

    public function orderCreate(){
      $session = Session::getInstance();
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $userEmail = $user->email;

      $cartItems = Cart::leftJoin('products', 'carts.product_id', '=', 'products.id')
      ->leftJoin('users', 'carts.user_id', '=', 'users.id')
      ->where('users.email', $userEmail)
      ->select('carts.id', 'carts.user_id', 'carts.product_id', 'carts.quantity', DB::raw('carts.quantity * products.price as total_price'))
      ->get();

      $maxId = OrderUser::where('user_id', $user->id)
    ->selectRaw('max(id) as last_id')
    ->value('last_id');

      foreach($cartItems as $c){
      $order = new Order();
        $order->order_user_id = $maxId;
        $order->product_id = $c->product_id;
        $order->quantity = $c->quantity;
        $order->total = $c->total_price;
        $order->address = $_POST['address'];
        $order->addressnotes = $_POST['addressnotes'];
        $order->name = $_POST['username2'];
        $order->surname = $_POST['lastname2'];
        $order->phone = $_POST['phone2'];
        $order->save();
        $c->delete();
      }

      $order = Order::where('order_user_id', $maxId)->with('product')->with('orderUser.user')->first();
      $products = Order::where('order_user_id', $maxId)->with('product')->with('orderUser.user')->get();
      $totalPrice = Order::where('order_user_id', $maxId)
    ->selectRaw('SUM(orders.total) as total_price')
    ->join('products', 'orders.product_id', '=', 'products.id')
    ->value('total_price');
    // dd($totalPrice);

      View::renderTemplate('ClientPage/order.html',['order'=>$order, 'orderid'=>$maxId, 'user'=>$user, 'products'=>$products, 'totalprice'=>$totalPrice]);
    }

    public function createAddress(){
      $session = Session::getInstance();
      $user = $_SESSION['userId'];
      $user = User::find($user);
      $address = new Address();
      $address->address = $_POST['address'];
      $address->notes = $_POST['addressnotes'];
      $address->user_id = $user->id;
      $address->save();
      $session->message("Address");
      $this->create();
  }

  public function editAddress(){
    $session = Session::getInstance();
    $address = Address::find($_POST['addressid']);
    $address->address = $_POST['address'];
    $address->notes = $_POST['addressnotes'];
    $address->save();
    $this->create();
}

    

}
