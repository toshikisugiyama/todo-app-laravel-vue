<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * Get the user that own the comment.
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
