<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\ClassModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyGradesController extends Controller
{
    public function index(ClassModel $class) {
        $class->load([
            'section:id,name',
            'subject:id,name',
            'exams:id,title',
            'students:id,username' => ['profile:id,user_id,first_name,middle_name,last_name'],
        ]);

        return Inertia::render('Faculty/Class/Grades', [
            'classModel' => $class,
        ]);
    }
}
