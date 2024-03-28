<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClassExamRequest;
use App\Models\ClassExam;
use App\Models\ClassModel;
use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyClassExamController extends Controller
{
    public function index(ClassModel $class) {
        $class->load([
            'section:id,name',
            'subject:id,name',
            'exams:id,subject_id,title,type' => ['subject:id,name']
        ]);

        return Inertia::render('Faculty/Class/ClassExams', [
            'classModel' => $class,
        ]);
    }

    public function store(Request $request, Exam $exam) {
        $request->validate([
            'class_id' => ['required', 'uuid', 'exists:classes,id'],
            'passing_score' => ['required', 'integer', 'gt:0', 'lte:100'],
            'exam_period' => ['required', 'integer', 'gt:0'],
            'is_answers_shown' => ['required', 'boolean'],
        ]);

        if($exam->classes()->where('class_id', $request->class_id)->exists()) {
            return back()->withErrors(['class_id' => 'This exam is already assigned to this class.']);
        }

        $exam->classes()->attach($request->class_id, $request->except('class_id'));

        return back();
    }

    public function update(Request $request, Exam $exam, ClassModel $class) {
        $request->validate([
            'passing_score' => ['required', 'integer', 'gt:0', 'lte:100'],
            'exam_period' => ['required', 'integer', 'gt:0'],
            'is_answers_shown' => ['required', 'boolean'],
        ]);

        $exam->classes()->updateExistingPivot($class->id, $request->all());
    }

    public function destroy(Exam $exam, ClassModel $class) {
        $exam->classes()->detach($class->id);

        return back();
    }

    public function open(Exam $exam, ClassModel $class) {
        if(!$exam->questions()->count()) {
            return back()->withErrors(['class_exam' => "You cannot open an exam without questions."]);
        }

        $classExam = ClassExam::firstWhere([
            'class_id' => $class->id,
            'exam_id' => $exam->id,
        ]);

        $opened_at = now();
        $closed_at = clone $opened_at;
        $closed_at->modify("+{$classExam->exam_period} minutes");

        $exam->classes()->updateExistingPivot($class->id, [
            'opened_at' => $opened_at,
            'closed_at' => $closed_at,
        ]);

        return back();
    }

    public function close(Exam $exam, ClassModel $class) {
        $exam->classes()->updateExistingPivot($class->id, [
            'closed_at' => now(),
        ]);

        return back();
    }
}
