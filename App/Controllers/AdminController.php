<?php

namespace App\Controllers;

use \Core\View;
use \Core\Controller;
use App\Helper\Session;
use App\Models\Product;
use App\Models\Category;
use App\Models\Homecategory;
use App\Models\Order;
use App\Models\OrderUser;
use App\Models\User;






/**
 * Home controller
 */
class AdminController extends Controller
{

    /**
     * Show the index page
     *
     * @return void
     */
    public function index()
    {
        $numOfProducts = Product::selectRaw('COUNT(id) as num_of_products')->value('num_of_products');
        $session = Session::getInstance();
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $initials = User::selectRaw('LEFT(name, 1) as first_initial, LEFT(surname, 1) as last_initial')->where('id', $user->id)->get();

        $orderCount = Order::distinct('order_user_id')->count();
        $customerCount = OrderUser::distinct('user_id')->count();
        $totalIncome = Order::selectRaw('SUM(total) as total_income')->value('total_income');

        $recentOrders = Order::with('orderUser.user')
        ->orderBy('created_at', 'desc')
        ->with('product')
        ->take(10)
        ->get()
        ->unique('order_user_id');
        // dd($recentOrders);

        $trendingProducts = Order::with('product')
        ->selectRaw('product_id, SUM(quantity) as total_quantity')
        ->groupBy('product_id')
        ->orderBy('total_quantity', 'desc')
        ->limit(5)
        ->get();
        // dd($trendingProducts);
        View::renderTemplate('Dashboard/index.html', ['numofproducts'=>$numOfProducts, 'user'=>$user, 'initials'=>$initials, 'numoforders'=>$orderCount, 'numofcustomers'=>$customerCount, 'income'=>$totalIncome, 'recentorders'=>$recentOrders, 'trendingproducts'=>$trendingProducts]);
    }

    public function create(){
        $categories = Category::all();
        $homecategories = Homecategory::all();
        $session = Session::getInstance();
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $initials = User::selectRaw('LEFT(name, 1) as first_initial, LEFT(surname, 1) as last_initial')->where('id', $user->id)->get();
        View::renderTemplate('Dashboard/add-product.html', ['categories'=>$categories, 'homecategories'=>$homecategories, 'user'=>$user, 'initials'=>$initials]);
    }

    public function store(){
       

        $product = new Product();
        $product->name = $_POST['name'];
        $product->price = $_POST['price'];
        $product->description = $_POST['description'];
        $product->category_id = $_POST['category'];
        $product->homecategory_id = $_POST['homecategory'];
        $file_tmp = $_FILES['photo']['tmp_name'];
        $file_name = $_FILES['photo']['name'];
        move_uploaded_file($file_tmp, "../public/images/".$file_name);
        $product->photo = $file_name;
        $product->save();
        $session = Session::getInstance();
        $session->message("Product added successfully");
        $this->showProducts();
    }

    public function logout ()
    {
        $session = Session::getInstance();
        $session->logout();
        header('Location: products');
    }

    public function showProducts(){
        $products = Product::all();
        $session = Session::getInstance();
        $message = '';
        $session = Session::getInstance();
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $initials = User::selectRaw('LEFT(name, 1) as first_initial, LEFT(surname, 1) as last_initial')->where('id', $user->id)->get();
        if(!empty($session->message)){
            $message = $session->message;
        }
        View::renderTemplate('Dashboard/products.html', ['products'=>$products, 'message'=>$message, 'user'=>$user, 'initials'=>$initials]);
    }

    public function edit(){
        $product = Product::find($_GET['pid']);
        $categories = Category::all();
        $homecategories = Homecategory::all();
        $session = Session::getInstance();
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $initials = User::selectRaw('LEFT(name, 1) as first_initial, LEFT(surname, 1) as last_initial')->where('id', $user->id)->get();
        View::renderTemplate('Dashboard/product-edit.html', ['product'=>$product, 'categories'=>$categories, 'homecategories'=>$homecategories, 'user'=>$user, 'initials'=>$initials]);
    }

    public function update(){
        $product = Product::find($_POST['id']);
        if(isset($_POST['update'])){
            if(!empty($FILES['image']['name'])){
                unlink('../public/images/'.$product->photo);
                $file_tmp = $_FILES['photo']['tmp_name'];
                $file_name = $_FILES['photo']['name'];
                move_uploaded_file($file_tmp, "../public/images/".$file_name);
                $product->photo = $file_name;
            }
            $product->name = $_POST['name'];
            $product->price = $_POST['price'];
            $product->description = $_POST['description'];
            $product->category_id = $_POST['category'];
            $product->homecategory_id = $_POST['homecategory'];
            $product->save();
            $session = Session::getInstance();
            $session->message("Product edited successfully");
            $this->showProducts();
        }else if(isset($_POST['remove'])){
            unlink('../public/images/'.$product->photo);
            $product->delete();
            $session = Session::getInstance();
            $session->message("Product deleted successfully");
            $this->showProducts();
        }
    }

    public function viewCustomers(){
        $usersAndOrders = User::where('role', '<>', 1)
        ->with(['addresses' => function ($query) {
            $query->first();
        }])
        ->join('order_user', 'users.id', '=', 'order_user.user_id')
        ->join('orders', 'order_user.order_id', '=', 'orders.id')
        ->selectRaw('users.*, SUM(orders.total) as total_spent')
        ->groupBy('users.id')
        ->get();
    

dd($usersAndOrders);
// dd($totalSpent);
        View::renderTemplate('Dashboard/customers.html', ['users'=>$users, 'totalSpent'=>$totalSpent]);
    }

}
