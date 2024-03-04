<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentHomeController extends Controller
{
    public function index() {
        $classes = Auth::user()->enrolled_classes->load([
            'section:id,name',
            'subject:id,name',
            'instructor:id' => [
                'profile'
            ],
        ]);

        return Inertia::render('Student/Home', [
            'classes' => $classes,
        ]);
    }
}
