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
}
