<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\StudentExam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyAnswersController extends Controller
{
    public function show(Exam $exam, StudentExam $student_exam) {
        $exam->load([
            'subject:id,name',
        ]);

        $student_exam->load([
            'student:id,username' => [
                'profile:id,user_id,first_name,middle_name,last_name',
            ],
            'answers' => [
                'question:id,type,description,answer,choices',
            ],
        ]);

        return Inertia::render('Faculty/Exam/Answers', [
            'exam' => $exam,
            'studentExam' => $student_exam,
        ]);
    }
}
