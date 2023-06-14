<?php

/**
 * Routing
 */
$router = new Core\Router();

// Add the routes
// $router->add('', ['controller' => 'Home', 'action' => 'index']);
$router->add('stripe', ['controller' => 'StripeController', 'action' => 'index']);


$router->add('delivery', ['controller' => 'DeliveryController', 'action' => 'index']);
$router->add('myaccount', ['controller' => 'MyaccountController', 'action' => 'index']);
$router->add('products', ['controller' => 'ProductController', 'action' => 'index']);
$router->add('product/details', ['controller' => 'ProductController', 'action' => 'details']);
$router->add('cart', ['controller' => 'CartController', 'action' => 'index']);
$router->add('login-form', ['controller' => 'AuthController', 'action' => 'loginForm']);
$router->add('login', ['controller' => 'AuthController', 'action' => 'login']);
$router->add('logout', ['controller' => 'AuthController', 'action' => 'logout']);

$router->add('signup-form', ['controller' => 'AuthController', 'action' => 'signupForm']);
$router->add('user-create', ['controller' => 'AuthController', 'action' => 'store']);

$router->add('add-product', ['controller' => 'DeliveryController', 'action' => 'store']);
$router->add('update-product', ['controller' => 'DeliveryController', 'action' => 'update']);
$router->add('delete-cartproduct', ['controller' => 'DeliveryController', 'action' => 'delete']);

$router->add('checkout-create', ['controller' => 'CheckoutController', 'action' => 'create']);
$router->add('order-create', ['controller' => 'CheckoutController', 'action' => 'orderCreate']);

$router->add('user-update', ['controller' => 'MyaccountController', 'action' => 'updateUser']);
$router->add('address-create', ['controller' => 'MyaccountController', 'action' => 'createAddress']);
$router->add('address-create2', ['controller' => 'CheckoutController', 'action' => 'createAddress']);
$router->add('address-delete', ['controller' => 'MyaccountController', 'action' => 'deleteAddress']);
$router->add('address-edit', ['controller' => 'MyaccountController', 'action' => 'editAddress']);
$router->add('address-edit2', ['controller' => 'CheckoutController', 'action' => 'editAddress']);
$router->add('address-update', ['controller' => 'MyaccountController', 'action' => 'updateAddress']);
$router->add('my-orders', ['controller' => 'MyaccountController', 'action' => 'myOrders']);
$router->add('order-info', ['controller' => 'MyaccountController', 'action' => 'viewOrder']);
$router->add('reorder', ['controller' => 'MyaccountController', 'action' => 'reorder']);


$router->add('AdminDashboard', ['controller' => 'AdminController', 'action' => 'index']);
$router->add('logout-admin', ['controller' => 'AdminController', 'action' => 'logout']);
$router->add('products-admin', ['controller' => 'AdminController', 'action' => 'showProducts']);
$router->add('product-edit', ['controller' => 'AdminController', 'action' => 'edit']);
$router->add('product-update', ['controller' => 'AdminController', 'action' => 'update']);
$router->add('product-create', ['controller' => 'AdminController', 'action' => 'create']);
$router->add('product-store', ['controller' => 'AdminController', 'action' => 'store']);
$router->add('customers', ['controller' => 'AdminController', 'action' => 'viewCustomers']);
$router->add('order-details', ['controller' => 'OrderController', 'action' => 'orderDetails']);
$router->add('orders', ['controller' => 'OrderController', 'action' => 'index']);

$router->add('categories', ['controller' => 'CategoryController', 'action' => 'index']);
$router->add('category-add', ['controller' => 'CategoryController', 'action' => 'store']);
$router->add('category-update', ['controller' => 'CategoryController', 'action' => 'update']);
$router->add('category-delete', ['controller' => 'CategoryController', 'action' => 'delete']);



$router->dispatch($_SERVER['QUERY_STRING']);


?>