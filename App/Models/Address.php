<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Address extends Eloquent
{
  public function user(){
    return $this->belongsTo(User::class);
  }
}
