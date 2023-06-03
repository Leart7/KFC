<?php

namespace App\Controllers;

use \Core\View;
use \Core\Controller;
use App\Models\Category;
use App\Models\User;
use App\Models\Product;
use App\Helper\Session;




/**
 * Home controller
 */
class CategoryController extends Controller
{

    /**
     * Show the index page
     *
     * @return void
     */
    public function index()
    {
        $categories = Category::withCount('products')->get();
        $session = Session::getInstance();
        $user = $_SESSION['userId'];
        $user = User::find($user);
        $initials = User::selectRaw('LEFT(name, 1) as first_initial, LEFT(surname, 1) as last_initial')->where('id', $user->id)->get();
        View::renderTemplate('Dashboard/categories.html', ['categories'=>$categories, 'user'=>$user, 'initials'=>$initials]);
    }

    public function store(){
        $category = new Category();
        $category->name = $_POST['categoryname'];
        $category->save();
        $this->index();
    }

    public function update(){
        $category = Category::find($_POST['categoryid']);
        $category->name = $_POST['categoryname'];
        $category->save();
        $this->index();
    }

    public function delete(){
        $category = Category::find($_POST['categoryid']);
        $category->delete();
        $this->index();
    }
}
