<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\ClassExam;
use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyExamScores extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Exam $exam)
    {
        $exam->load([
            'subject:id,name',
            'classes:id,section_id' => [
                'section:id,name'
            ],
        ]);

        $exam->classes->each->makeHidden('pivot');

        if ($request->query('class')) {
            $classExam = ClassExam::firstWhere([
                'exam_id' => $exam->id,
                'class_id' => $request->query('class'),
            ]);
        }
        else {
            $classExam = ClassExam::firstWhere([
                'exam_id' => $exam->id,
                'class_id' => $exam->classes[0]->id,
            ]);
        }

        return Inertia::render('Faculty/Exam/Scores', [
            'exam' => $exam,
            'examInfo' => $classExam,
            'students' => $classExam->assigned_class->students()->select('users.id', 'username')->with([
                'profile:id,user_id,first_name,middle_name,last_name',
                'answered_exams' => function ($query) use ($classExam) {
                    $query->where('class_exam_id', $classExam->id);
                },
            ])->get(),
        ]);
    }
}
