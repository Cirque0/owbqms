<?php

namespace App\Http\Controllers\Faculty;

use App\Exports\ClassGradesExport;
use App\Http\Controllers\Controller;
use App\Models\ClassModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class FacultyGradesController extends Controller
{
    public function index(ClassModel $class) {
        $class->load([
            'section:id,name',
            'subject:id,name',
            'exams:id,title',
            'students:id,username' => [
                'profile:id,user_id,first_name,middle_name,last_name',
                'answered_exams' => function ($query) use ($class) {
                    $query->whereIn('class_exam_id', $class->exams->pluck('pivot.id'));
                },
            ],
        ]);

        return Inertia::render('Faculty/Class/Grades', [
            'classModel' => $class,
        ]);
    }

    public function export(ClassModel $class) {
        $title = "{$class->section->course->name} - {$class->section->name} ({$class->subject->name})";
        return Excel::download(new ClassGradesExport($class), $title . '.xlsx');
    }
}
