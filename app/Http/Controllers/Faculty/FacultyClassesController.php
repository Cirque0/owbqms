<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faculty\ClassRequest;
use App\Models\ClassModel;
use App\Models\Course;
use App\Models\Section;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyClassesController extends Controller
{
    public function store(ClassRequest $request) {
        $course = Course::firstOrCreate([
            'name' => $request->course,
        ]);

        $section = Section::firstOrCreate([
            'course_id' => $course->id,
            'name' => $request->section,
        ]);

        $subject = Subject::firstOrCreate([
            'name' => $request->subject,
        ]);

        if(
            ClassModel::where('section_id', $section->id)
                ->where('subject_id', $subject->id)
                ->where('instructor_id', $request->user()->id)
                ->exists()
        ) {
            return back()->withErrors([
                'subject' => 'You already created this class.'
            ]);
        }
        else {
            ClassModel::create([
                'section_id' => $section->id,
                'subject_id' => $subject->id,
                'instructor_id' => $request->user()->id,
            ]);

            return back();
        }
    }
}
