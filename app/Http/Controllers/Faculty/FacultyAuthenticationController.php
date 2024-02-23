<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyAuthenticationController extends Controller
{
    public function show() {
        return Inertia::render('Faculty/Auth/Login');
    }
}
