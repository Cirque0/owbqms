<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\ClassModel;
use App\Models\Course;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FacultyHomeController extends Controller
{
    public function index() {
        $classes = ClassModel::with([
            'section:id,name',
            'subject:id,name',
        ])
        ->withCount(['requests', 'students'])
        ->where('instructor_id', Auth::id())->get();

        $courses = Course::with(['sections'])->get()->pluck('sections.*.name', 'name');

        $subjects = Subject::all()->pluck('name');

        return Inertia::render('Faculty/Home', [
            'classes' => $classes,
            'courses' => $courses,
            'subjects' => $subjects,
        ]);
    }
}
