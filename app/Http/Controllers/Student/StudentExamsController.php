<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentExamsController extends Controller
{
    public function index(Request $request) {
        $query = $request->user()->assigned_exams()
            ->with([
                'exam:id,title,type',
                'assigned_class:id,section_id,subject_id,instructor_id' => [
                    'section:id,name',
                    'subject:id,name',
                    'instructor:id' => ['profile:user_id,first_name,middle_name,last_name'],
                ],
            ]);
        
        $classExams = $query->clone()->where(function ($query) {
            $query->whereNull('opened_at')
                ->orWhereNull('closed_at');
        })->orWhere(function ($query) {
            $query->where('opened_at', '>', date('Y-m-d H:i:s'))
                ->orWhere('closed_at', '<=', date('Y-m-d H:i:s'));
        })->get();

        $ongoingClassExams = $query->whereNotNull('opened_at')
            ->whereNotNull('closed_at')
            ->where('opened_at', '<=', date('Y-m-d H:i:s'))
            ->where('closed_at', '>', date('Y-m-d H:i:s'))
            ->get();

        return Inertia::render('Student/Exams', [
            'closedClassExams' => $classExams,
            'ongoingClassExams' => $ongoingClassExams,
        ]);
    }
}
