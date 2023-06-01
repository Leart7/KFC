<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

class OrderUser extends Eloquent
{
  protected $table = 'order_user';

  public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    
}
