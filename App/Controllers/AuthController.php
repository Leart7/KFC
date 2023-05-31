<?php

namespace App\Controllers;

use \Core\View;
use \Core\Controller;
use App\Helper\Session;
use App\Models\User;

/**
 * Home controller
 */
class AuthController extends Controller
{

    /**
     * Show the index page
     *
     * @return void
     */
    public function loginForm()
    {
        $session = Session::getInstance();
        $message = '';
        if(!empty($session->message)){
            $message = $session->message;
        }
        View::renderTemplate('Auth/login.html',['message'=>$message]);
    }

    public function login()
    {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $user = User::where('email', $email)->where('password', $password)->first();
        $session = Session::getInstance();
        if ($user) {
            $session->login($user);
            $userEmail = $_SESSION['userId'];
            $u = User::find($userEmail);
            if($u->role == 0){
              header('Location: delivery');
            }else if($u->role == 1){
              header('Location: AdminDashboard');
            }
            exit;
        } else {
            $session->message("Your email or password is incorrent");
            $this->loginForm();
        }
    }

    public function logout ()
    {
        $session = Session::getInstance();
        $session->logout();
        header('Location: products');

    }

    public function signupForm()
    {
        $session = Session::getInstance();
        $message = '';
        if(!empty($session->message)){
            $message = $session->message;
        }
        View::renderTemplate('Auth/signup.html',['message'=>$message]);
    }

    public function store(){
        $session = Session::getInstance();
        $user = new User();
        $user->name = $_POST['name'];
        $user->email = $_POST['email'];
        $user->password = $_POST['password'];
        $users = User::all();
        foreach($users as $u){
            $email = $u->email;
            if($_POST['email'] == $email){
                $session->message("User already exists!");
                $this->signupForm();
                exit;
            }
        }
        $user->save();
        $session->login($user);
        header('Location: delivery');
    }


}
