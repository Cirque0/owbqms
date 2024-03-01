<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\ClassModel;
use App\Models\ClassStudent;
use App\Models\User;
use Illuminate\Http\Request;

class ClassMembersController extends Controller
{
    public function accept(ClassModel $class, User $student) {
        $request = ClassStudent::firstWhere([
            'class_id' => $class->id,
            'student_id' => $student->id,
            'status' => 'pending',
        ]);

        $request->status = 'enrolled';
        $request->save();

        return back();
    }

    public function deny(ClassModel $class, User $student) {
        $request = ClassStudent::firstWhere([
            'class_id' => $class->id,
            'student_id' => $student->id,
            'status' => 'pending',
        ]);

        $request->delete();

        return back();
    }

    public function remove(ClassModel $class, User $student) {
        $request = ClassStudent::firstWhere([
            'class_id' => $class->id,
            'student_id' => $student->id,
            'status' => 'enrolled',
        ]);

        $request->delete();

        return back();
    }
}
