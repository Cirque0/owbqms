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
    public function hasOpenClassExam(Exam $exam) {
        return $exam->classes()
            ->wherePivotNotNull('opened_at')
            ->wherePivotNotNull('closed_at')
            ->wherePivot('opened_at', '<=', date('Y-m-d H:i:s'))
            ->wherePivot('closed_at', '>', date('Y-m-d H:i:s'))
            ->exists();
    }

    public function index(Exam $exam) {
        $exam->load(['subject:id,name']);

        return Inertia::render('Faculty/Exam/Questions', [
            'exam' => $exam,
            'identification' => $exam->questions()->where('type', 'Identification')->get(),
            'trueOrFalse' => $exam->questions()->where('type', 'True or False')->get(),
            'fillInTheBlanks' => $exam->questions()->where('type', 'Fill in the Blanks')->get(),
            'multipleChoice' => $exam->questions()->where('type', 'Multiple Choice')->get(),
        ]);
    }
    
    public function store(QuestionRequest $request, Exam $exam) {
        if($this->hasOpenClassExam($exam)) {
            return back()->withErrors(['question' => 'Questions cannot be added while a class is taking the exam.']);
        }

        $question = new Question;

        $question->fill($request->except('choices'));

        if($request->type === 'Multiple Choice') {
            $question->choices = $request->choices;
        }

        $exam->questions()->save($question);

        return back();
    }

    public function update(QuestionRequest $request, Question $question) {
        if($this->hasOpenClassExam($question->exam)) {
            return back()->withErrors(['question' => 'Questions cannot be updated while a class is taking the exam.']);
        }

        $question->update($request->except('choices'));

        if($request->type === 'Multiple Choice') {
            $question->choices = $request->choices;
        }
        else {
            $question->choices = null;
        }

        $question->save();

        return back();
    }

    public function destroy(Question $question) {
        if($this->hasOpenClassExam($question->exam)) {
            return back()->withErrors(['question' => 'Questions cannot be deleted while a class is taking the exam.']);
        }

        $question->delete();

        return back();
    }
}
