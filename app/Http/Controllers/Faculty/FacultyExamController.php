<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faculty\ExamRequest;
use App\Models\Exam;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FacultyExamController extends Controller
{
    public function index() {
        return Inertia::render('Faculty/ExamsList', [
            'subjects' => Subject::all()->pluck('name'),
        ]);
    }

    public function store(ExamRequest $request) {
        $subject = Subject::firstWhere('name', $request->subject);

        Exam::create([
            'title' => $request->title,
            'type' => $request->type,
            'subject_id' => $subject->id,
            'instructor_id' => Auth::id(),
        ]);

        // TODO: should redirect to exam page
        return back();
    }
}
