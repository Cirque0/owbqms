<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function update(Request $request) {
        $request->validate([
            'first_name' => ['required', 'string'],
            'middle_name' => ['nullable', 'string'],
            'last_name' => ['required', 'string'],
            'gender' => ['required', 'string'],
            'contact_num' => ['nullable', 'string'],
        ]);

        $profile = $request->user()->profile;

        $profile->fill($request->input());

        $profile->save();

        return back();
    }
}
