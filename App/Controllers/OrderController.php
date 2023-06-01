<?php

namespace App\Controllers;

use \Core\View;
use \Core\Controller;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderUser;
use App\Models\User;
use App\Helper\Session;






/**
 * Home controller
 */
class OrderController extends Controller
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
        $initials = User::selectRaw('LEFT(name, 1) as first_initial, LEFT(surname, 1) as last_initial')->where('id', $user->id)->get();

        $orders = Order::with(['orderUser.user', 'product'])
    ->select('orders.*')
    ->selectSub(function ($query) {
        $query->selectRaw('SUM(total)')
            ->from('orders as o')
            ->whereColumn('o.order_user_id', 'orders.order_user_id');
    }, 'total_price')
    ->groupBy('order_user_id')
    ->orderBy('created_at', 'desc')
    ->get();

    
    //   $totalPrice = Order::selectRaw('SUM(total) as total_price')->value('total_price');

      View::renderTemplate('Dashboard/orders.html', ['orders'=>$orders, 'user'=>$user, 'initials'=>$initials]);
    }

    public function orderDetails(){
        $session = Session::getInstance();
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $initials = User::selectRaw('LEFT(name, 1) as first_initial, LEFT(surname, 1) as last_initial')->where('id', $user->id)->get();

        $orderProducts = Order::where('order_user_id', $_GET['id'])->with('product')->get();
        $orderInfo = Order::with('orderUser.user')->where('order_user_id', $_GET['id'])->first();
        $totalPrice = Order::where('order_user_id', $_GET['id'])->selectRaw('SUM(total) as total_price')->value('total_price');
        // dd($totalPrice);
        View::renderTemplate('Dashboard/orderDetails.html', ['orderproducts'=>$orderProducts, 'orderId'=>$_GET['id'], 'orderinfo'=>$orderInfo, 'totalprice'=>$totalPrice, 'user'=>$user, 'initials'=>$initials]);
    }
}
