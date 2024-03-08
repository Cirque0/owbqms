<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\Exam;
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
}
