<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyExamController extends Controller
{
    public function index() {
        return Inertia::render('Faculty/ExamsList');
    }
}
