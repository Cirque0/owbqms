<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\ClassModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FacultyHomeController extends Controller
{
    public function index() {
        $classes = ClassModel::with([
            'section:id,name',
            'subject:id,name',
        ])->where('instructor_id', Auth::id())->get();

        return Inertia::render('Faculty/Home', [
            'classes' => $classes,
        ]);
    }
}
