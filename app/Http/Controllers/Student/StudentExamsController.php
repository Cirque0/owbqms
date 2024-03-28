<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentExamsController extends Controller
{
    public function index(Request $request) {
        $examsQuery = $request->user()->assigned_exams()
            ->with([
                'exam:id,title,type',
                'assigned_class:id,section_id,subject_id,instructor_id' => [
                    'section:id,name',
                    'subject:id,name',
                    'instructor:id' => ['profile:user_id,first_name,middle_name,last_name'],
                ],
                'student_exams' => function ($query) {
                    $query->select('id', 'student_id', 'class_exam_id', 'score')
                        ->where('student_id', Auth::id());
                },
            ]);
            // ->withCount([
            //     'student_exams' => function ($query) {
            //         $query->where('student_id', Auth::id());
            //     }
            // ]);
        
        // $closedClassExams = (clone $examsQuery)->where(function ($query) {
        //     $query->whereNull('opened_at')
        //         ->orWhereNull('closed_at');
        // })->orWhere(function ($query) {
        //     $query->where('opened_at', '>', date('Y-m-d H:i:s'))
        //         ->orWhere('closed_at', '<=', date('Y-m-d H:i:s'));
        // })->get();

        $closedClassExams = (clone $examsQuery)->where(function ($query) {
            $query->where(function ($query) {
                $query->whereNull('opened_at')
                    ->orWhereNull('closed_at');
            })->orWhere(function ($query) {
                $query->where('opened_at', '>', date('Y-m-d H:i:s'))
                    ->orWhere('closed_at', '<=', date('Y-m-d H:i:s'));
            });
        })->get();

        $ongoingClassExams = (clone $examsQuery)->whereNotNull('opened_at')
            ->whereNotNull('closed_at')
            ->where('opened_at', '<=', date('Y-m-d H:i:s'))
            ->where('closed_at', '>', date('Y-m-d H:i:s'))
            ->get();

        error_log(json_encode($closedClassExams));

        return Inertia::render('Student/Exams', [
            'closedClassExams' => $closedClassExams,
            'ongoingClassExams' => $ongoingClassExams,
        ]);
    }
}
