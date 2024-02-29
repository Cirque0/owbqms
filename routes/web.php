<?php

use App\Http\Controllers\Faculty\FacultyClassesController;
use App\Http\Controllers\Faculty\FacultyHomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Student\StudentClassesController;
use App\Http\Controllers\Student\StudentHomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome')->middleware('guest');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::group(['prefix' => 'faculty', 'as' => 'faculty.', 'middleware' => ['faculty']], function() {
        // Route::get('/classes', [FacultyClassesController::class, 'index'])->name('faculty.classes');
        Route::get('/', [FacultyHomeController::class, 'index'])->name('home');
        Route::resource('classes', FacultyClassesController::class)->only(['show', 'store']);
    });

    Route::group(['prefix' => 'student', 'as' => 'student.', 'middleware' => ['student']], function () {
        Route::get('/', [StudentHomeController::class, 'index'])->name('home');
        Route::get('/classes', [StudentClassesController::class, 'index'])->name('classes');
    });
});

require __DIR__.'/auth.php';
