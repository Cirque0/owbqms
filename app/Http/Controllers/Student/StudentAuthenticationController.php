<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentAuthenticationController extends Controller
{
    public function show() {
        return Inertia::render('Auth/Student/Login');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => ['required'],
            'birthdate' => ['required', 'date'],
            'password' => ['required'],
            'rememberMe' => ['required', 'boolean'],
        ]);
 
        if (Auth::attemptWhen(
            [
                'username' => $request->username,
                'birthdate' => $request->birthdate,
                'password' => $request->password,
            ],
            function (User $user) {
                return $user->roles()->where('roles.id', 3)->exists();
            },
            $remember = $request->rememberMe
        )) {
            $request->session()->regenerate();
 
            return redirect()->intended(route('student.home'));
        }
 
        return back()->withErrors([
            'username' => 'The provided credentials do not match our records.',
        ])->onlyInput('username');
    }
}
