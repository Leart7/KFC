<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Category extends Eloquent
{
  public function products(){
    return $this->hasMany(Product::class);
  }
}
