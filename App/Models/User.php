<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

class User extends Eloquent
{
 public function addresses(){
  return $this->hasMany(Address::class);
 }

 public function carts()
 {
     return $this->hasMany(Cart::class);
 }

 public function orderUsers()
    {
        return $this->hasMany(OrderUser::class);
    }
}
