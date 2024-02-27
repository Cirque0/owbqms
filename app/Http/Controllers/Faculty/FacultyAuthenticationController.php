<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FacultyAuthenticationController extends Controller
{
    public function show() {
        return Inertia::render('Auth/Faculty/Login');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => ['required'],
            'password' => ['required'],
            'rememberMe' => ['required', 'boolean'],
        ]);
 
        if (Auth::attemptWhen(
            [
                'username' => $request->username,
                'password' => $request->password,
            ],
            function (User $user) {
                return $user->roles()->where('roles.id', 2)->exists();
            },
            $remember = $request->rememberMe
        )) {
            $request->session()->regenerate();
 
            return redirect()->intended(route('faculty.classes'));
        }
 
        return back()->withErrors([
            'username' => 'The provided credentials do not match our records.',
        ])->onlyInput('username');
    }
}
