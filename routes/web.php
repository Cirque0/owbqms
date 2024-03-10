<?php

use App\Http\Controllers\Faculty\ClassMembersController;
use App\Http\Controllers\Faculty\FacultyClassesController;
use App\Http\Controllers\Faculty\FacultyExamController;
use App\Http\Controllers\Faculty\FacultyHomeController;
use App\Http\Controllers\Faculty\FacultyQuestionsController;
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
        Route::resource('classes', FacultyClassesController::class)->only(['show', 'store', 'destroy']);
        Route::post('classes/{class}/requests/{student}/accept', [ClassMembersController::class, 'accept'])->name('classes.requests.accept');
        Route::delete('classes/{class}/requests/{student}/deny', [ClassMembersController::class, 'deny'])->name('classes.requests.deny');
        Route::delete('classes/{class}/students/{student}/remove', [ClassMembersController::class, 'remove'])->name('classes.students.remove');

        Route::resource('exams', FacultyExamController::class)->only(['index', 'show', 'store']);

        Route::resource('exams.questions', FacultyQuestionsController::class)->only(['index', 'store', 'update'])->shallow();
    });

    Route::group(['prefix' => 'student', 'as' => 'student.', 'middleware' => ['student']], function () {
        Route::get('/', [StudentHomeController::class, 'index'])->name('home');
        // Route::get('/classes', [StudentClassesController::class, 'index'])->name('classes');
        // Route::get('/classes/{class}', [StudentClassesController::class, 'show'])->name('classes.show');
        // Route::post('/classes/join', [StudentClassesController::class, 'store'])->name('classes.join');
        Route::resource('classes', StudentClassesController::class)->only(['show', 'store', 'destroy']);
        Route::delete('requests/{class}/cancel', [StudentClassesController::class, 'cancel'])->name('requests.cancel');
    });
});

require __DIR__.'/auth.php';
