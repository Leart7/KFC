<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Product extends Eloquent
{
  public function category(){
    return $this->belongsTo(Category::class);
  }

  public function homecategory(){
    return $this->belongsTo(Homecategory::class);
  }

  public function carts()
    {
        return $this->hasMany(Cart::class);
    }

  public function orders()
  {
      return $this->hasMany(Order::class);
  }
}
