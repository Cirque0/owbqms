<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentHomeController extends Controller
{
    public function index() {
        return Inertia::render('Student/Home');
    }
}
