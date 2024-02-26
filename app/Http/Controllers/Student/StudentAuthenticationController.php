<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentAuthenticationController extends Controller
{
    public function show() {
        return Inertia::render('Student/Auth/Login');
    }
}
