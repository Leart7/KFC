<?php

namespace App\Controllers;

use \Core\View;
use \Core\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;
use App\Models\Address;
use App\Models\Order;
use App\Models\OrderUser;
use App\Models\User;
use App\Helper\Session;
use Illuminate\Database\Capsule\Manager as DB;




/**
 * Home controller
 */
class MyaccountController extends Controller
{

    /**
     * Show the index page
     *
     * @return void
     */ 

    public function index()
    {
        $session = Session::getInstance();
        $message = '';
        if(!empty($session->message)){
            $message = $session->message;
        }
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $userId = $user->id;
        $address = Address::where('user_id', $user->id)->orderBy('updated_at', 'desc')->first();
        $addresses = [];
        if($address){
            $addresses = Address::where('user_id', $user->id)->where('id', '<>', $address->id)->get();

        }

        $orders = Order::with(['orderUser.user', 'product'])
        ->whereHas('orderUser', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->groupBy('order_user_id')
        ->get(); 
        View::renderTemplate('ClientPage/myaccount.html', ['user'=>$user, 'address'=>$address, 'addresses'=>$addresses, 'message'=>$message, 'orders'=>$orders]);
    }

    public function viewOrder(){
        $session = Session::getInstance();
        $user = $_SESSION['userId'];
                $user = User::find($user);
                $userId = $user->id;

        $orders = Order::with(['orderUser.user', 'product'])
        ->where('order_user_id', $_GET['id'])
        ->groupBy('order_user_id')
        ->limit(1)
        ->get(); 

        $products = Order::with('orderUser.user')
        ->with('product')
        ->whereHas('orderUser', function ($query) use ($userId) {
            $query->where('id', $_GET['id']);
        })
        ->get();

        $totalPrice = Order::where('order_user_id', $_GET['id'])->selectRaw('SUM(total) as total_price')->value('total_price');

        // dd($products);
        View::renderTemplate('ClientPage/orderDetails.html', ['user'=>$user, 'products'=>$products, 'orders'=>$orders, 'totalprice'=>$totalPrice]);
    }

    public function reorder(){
        $session = Session::getInstance();
        $user = $_SESSION['userId'];
                $user = User::find($user);
                $userId = $user->id;
        $userEmail = $user->email;

        $products = Order::with('product')
        ->whereHas('orderUser', function ($query) use ($userId) {
            $query->where('id', $_POST['orderid']);
        })
        ->get();

        $cartItems = Cart::leftJoin('products', 'carts.product_id', '=', 'products.id')
      ->leftJoin('users', 'carts.user_id', '=', 'users.id')
      ->where('users.email', $userEmail)
      ->select('carts.id', 'carts.user_id', 'carts.product_id', 'carts.quantity', DB::raw('carts.quantity * products.price as total_price'))
      ->get();

      foreach($cartItems as $c){
        $c->delete();
      }

        foreach($products as $p){
            $cart = new Cart();
            $cart->product_id = $p->product_id;
            $cart->user_id = $user->id;
            $cart->quantity = $p->quantity;
            $cart->save();
        }
        header('Location: delivery');
    }

    public function updateUser(){
        $session = Session::getInstance();
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $user->name = $_POST['name'];
        $user->surname = $_POST['lastname'];
        $user->email = $_POST['email'];
        if(!empty($_POST['password'])){
            $user->password = $_POST['password'];
        }
        $user->phone = $_POST['phone'];
        $user->save();
        $this->index();
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
        $this->index();
    }

    public function deleteAddress(){
        $session = Session::getInstance();
        $address = Address::find($_POST['addressid']);
        $address->delete();
        $session->message("Address");
        $this->index();
    }

    public function editAddress(){
        $session = Session::getInstance();
        $address = Address::find($_POST['addressid']);
        $address->address = $_POST['address'];
        $address->notes = $_POST['addressnotes'];
        $address->save();
        $session->message("Address");
        $this->index();
    }

    public function updateAddress(){
        $session = Session::getInstance();
        $address = Address::find($_POST['addressid']);
        $address->clicked = date('Y-m-d H:i:s');
        $address->save();
        $session->message("Address");
        $this->index();
    }

    public function myOrders(){
        $session = Session::getInstance();
        $session->message("Order");
        $this->index();
      }
}
