<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\ClassExam;
use App\Models\ClassModel;
use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentClassExamController extends Controller
{
    public function show(ClassModel $class, Exam $exam) {
        $pivot = ClassExam::firstWhere([
            'class_id' => $class->id,
            'exam_id' => $exam->id,
        ]);

        if(!$pivot) {
            return abort(404);
        }

        $class->load([
            'section:id,course_id,name' => [
                'course:id,name',
            ],
            'subject:id,name',
        ]);

        $exam->load([
            'subject:id,name',
            'questions',
        ]);

        return Inertia::render('Student/Exam/ExamForm', [
            'classModel' => $class,
            'exam' => $exam,
            'pivot' => $pivot,
        ]);
    }
}
