<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Order extends Eloquent
{
  public function product()
  {
      return $this->belongsTo(Product::class);
  }

  public function orderUser()
    {
        return $this->belongsTo(OrderUser::class);
    }
}
