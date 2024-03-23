<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\ClassExam;
use App\Models\ClassModel;
use App\Models\Exam;
use App\Models\Question;
use App\Models\QuestionAnswer;
use App\Models\StudentExam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentClassExamController extends Controller
{
    public function show(ClassModel $class, Exam $exam) {
        $pivot = ClassExam::with([
                'student_exams'
            ])->firstWhere([
            'class_id' => $class->id,
            'exam_id' => $exam->id,
        ]);

        if(!$pivot) {
            return abort(404);
        }

        if($pivot->is_answers_shown) {
            $pivot->load([
                'student_exams.answers:id,student_exam_id,question_id,answer,is_correct' => [
                    'question:id,type,description,answer,choices',
                ],
            ]);
        }

        $class->load([
            'section:id,course_id,name' => [
                'course:id,name',
            ],
            'subject:id,name',
        ]);

        $exam->load([
            'subject:id,name',
            'questions' => function ($query) {
                $query->select('id', 'exam_id', 'type', 'description', 'choices');
            },
        ]);

        return Inertia::render('Student/Exam/ExamForm', [
            'classModel' => $class,
            'exam' => $exam,
            'pivot' => $pivot,
        ]);
    }
    
    public function submit(Request $request, ClassModel $class, Exam $exam) {
        $request->validate([
            'answers' => ['required', 'array'],
            'answers.*' => ['array'],
            'answers.*.question_id' => ['required', 'integer', 'exists:questions,id'],
            'answers.*.answer' => ['required', 'string'],
        ]);

        $classExam = ClassExam::firstWhere([
            'class_id' => $class->id,
            'exam_id' => $exam->id,
        ]);

        if(!$classExam) {
            return abort(404);
        }

        if(!$classExam->is_open) {
            return back()->withErrors([
                'answers' => 'The submission period for this exam has ended.',
            ]);
        }

        $studentExam = StudentExam::create([
            'student_id' => $request->user()->id,
            'class_exam_id' => $classExam->id,
        ]);

        foreach($request->answers as $answer) {
            $studentExam->answers()->create([
                'question_id' => $answer['question_id'],
                'answer' => $answer['answer'],
                'is_correct' => strtolower(Question::find($answer['question_id'])->answer) == strtolower($answer['answer']),
            ]);
        }

        $studentExam->score = $studentExam->answers()->where('is_correct', true)->count();
        $studentExam->save();

        return back();
    }
}
