<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentHomeController extends Controller
{
    public function index(Request $request) {
        $classes = $request->user()->enrolled_classes()->with([
            'section:id,name',
            'subject:id,name',
            'instructor:id' => [
                'profile'
            ],
        ])->get();

        return Inertia::render('Student/Home', [
            'classes' => $classes,
        ]);
    }
}
