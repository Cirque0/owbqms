<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\ClassModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentClassesController extends Controller
{
    public function show(ClassModel $class) {
        $this->authorize('view', $class);
        
        $class->load([
            'section:id,name',
            'subject:id,name',
            'instructor:id,username' => ['profile'],
            'exams:id,subject_id,title,type' => [
                'subject:id,name',
                'student_exams' => function ($query) {
                    $query->select('student_exam.id', 'student_id', 'class_exam_id', 'score')
                        ->where('student_id', Auth::id());
                },
            ]
        ]);

        return Inertia::render('Student/Class/Class', [
            'classModel' => $class,
        ]);
    }
    
    public function store(Request $request) {
        $request->validate([
            'class_code' => ['required', 'uuid'],
        ]);

        $class =  ClassModel::find($request->class_code);

        if(!$class) {
            return back()->withErrors([
                'class_code' => 'No classes were found using this class code.'
            ]);
        }

        if(!$class->is_registration_open) {
            return back()->withErrors([
                'class_code' => 'This class is currently not accepting requests to join.'
            ]);
        }

        if($class->students()->find(Auth::id())) {
            return back()->withErrors([
                'class_code' => 'You are already enrolled to this class.'
            ]);
        }
        
        if($class->requests()->find(Auth::id())) {
            return back()->withErrors([
                'class_code' => 'You still have a pending request for this class.'
            ]);
        }

        $class->students()->attach($request->user()->id, ['status' => 'pending']);

        return back();
    }

    public function destroy(ClassModel $class) {
        $class->students()->detach(Auth::id());

        return to_route('student.home');
    }

    public function cancel(ClassModel $class) {
        $class->requests()->detach(Auth::id());

        return to_route('student.home');
    }

    public function students(ClassModel $class) {
        $this->authorize('view', $class);

        $class->load([
            'section:id,name',
            'subject:id,name',
            'instructor:id,username' => ['profile'],
            'students:id,username,email,birthdate' => ['profile'],
        ]);

        return Inertia::render('Student/Class/Students', [
            'classModel' => $class,
        ]);
    }
}
