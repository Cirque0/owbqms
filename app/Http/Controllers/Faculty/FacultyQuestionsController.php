<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faculty\QuestionRequest;
use App\Models\Exam;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyQuestionsController extends Controller
{
    public function index(Exam $exam) {
        $exam->load(['subject:id,name']);
        
        return Inertia::render('Faculty/Exam/Questions', [
            'exam' => $exam,
        ]);
    }
    
    public function store(QuestionRequest $request, Exam $exam) {
        $question = new Question;

        $question->exam_id = $exam->id;

        $question->fill($request->except('choices'));

        if($request->type === 'Multiple Choice') {
            $question->choices = $request->choices;
        }

        $question->save();

        return back();
    }
}
