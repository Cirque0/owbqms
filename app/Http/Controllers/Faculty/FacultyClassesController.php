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
    public function show(ClassModel $class) {
        $this->authorize('view', $class);

        $class->load([
            'section:id,name',
            'subject:id,name',
            'students:id,username,email,birthdate' => ['profile'],
            'requests:id,username,email,birthdate' => ['profile'],
        ]);

        return Inertia::render('Faculty/Class/Class', [
            'classModel' => $class,
        ]);
    }

    public function store(ClassRequest $request) {
        $this->authorize('create', ClassModel::class);

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

    public function update(Request $request, ClassModel $class) {
        $this->authorize('update', $class);

        $request->validate([
            'is_registration_open' => ['required', 'boolean'],
        ]);

        $class->fill($request->input());
        $class->save();

        return back();
    }

    public function destroy(ClassModel $class) {
        $this->authorize('delete', $class);
        $class->delete();

        return to_route('faculty.home');
    }
}
