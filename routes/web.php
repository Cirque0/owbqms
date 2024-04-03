<?php

use App\Http\Controllers\Faculty\ClassMembersController;
use App\Http\Controllers\Faculty\FacultyAnswersController;
use App\Http\Controllers\Faculty\FacultyClassesController;
use App\Http\Controllers\Faculty\FacultyClassExamController;
use App\Http\Controllers\Faculty\FacultyExamController;
use App\Http\Controllers\Faculty\FacultyExamScores;
use App\Http\Controllers\Faculty\FacultyGradesController;
use App\Http\Controllers\Faculty\FacultyHomeController;
use App\Http\Controllers\Faculty\FacultyQuestionsController;
use App\Http\Controllers\Faculty\FacultySettingsController;
use App\Http\Controllers\UserInformationController;
use App\Http\Controllers\Student\StudentClassesController;
use App\Http\Controllers\Student\StudentClassExamController;
use App\Http\Controllers\Student\StudentExamsController;
use App\Http\Controllers\Student\StudentHomeController;
use App\Http\Controllers\Student\StudentSettingsController;
use App\Http\Controllers\UserProfileController;
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
    Route::patch('/user', [UserInformationController::class, 'update'])->name('user.update');
    Route::delete('/user', [UserInformationController::class, 'destroy'])->name('user.destroy');
    Route::patch('/profile', [UserProfileController::class, 'update'])->name('profile.update');

    Route::group(['prefix' => 'faculty', 'as' => 'faculty.', 'middleware' => ['faculty']], function() {
        // Route::get('/classes', [FacultyClassesController::class, 'index'])->name('faculty.classes');
        Route::get('/', [FacultyHomeController::class, 'index'])->name('home');
        Route::get('settings', [FacultySettingsController::class, 'edit'])->name('settings.edit');
        Route::post('classes/{class}/requests/{student}/accept', [ClassMembersController::class, 'accept'])->name('classes.requests.accept');
        Route::delete('classes/{class}/requests/{student}/deny', [ClassMembersController::class, 'deny'])->name('classes.requests.deny');
        Route::delete('classes/{class}/students/{student}/remove', [ClassMembersController::class, 'remove'])->name('classes.students.remove');
        Route::resource('classes', FacultyClassesController::class)->only(['show', 'store', 'update', 'destroy']);
        Route::resource('classes.exams', FacultyClassExamController::class)->only(['index']);
        Route::resource('classes.grades', FacultyGradesController::class)->only(['index']);

        Route::get('exams/{exam}/scores', FacultyExamScores::class)->name('exams.scores.index');
        Route::resource('exams', FacultyExamController::class)->only(['index', 'show', 'store']);
        Route::resource('exams.questions', FacultyQuestionsController::class)->only(['index', 'store', 'update', 'destroy'])->shallow();
        Route::resource('exams.scores', FacultyAnswersController::class)->only(['show'])->parameters([
            'scores' => 'student_exam',
        ]);

        Route::patch('exams/{exam}/classes/{class}/open', [FacultyClassExamController::class, 'open'])->name('exams.classes.open');
        Route::patch('exams/{exam}/classes/{class}/close', [FacultyClassExamController::class, 'close'])->name('exams.classes.close');
        Route::resource('exams.classes', FacultyClassExamController::class)->only(['store', 'update', 'destroy']);
    });

    Route::group(['prefix' => 'student', 'as' => 'student.', 'middleware' => ['student']], function () {
        Route::get('/', [StudentHomeController::class, 'index'])->name('home');
        Route::get('settings', [StudentSettingsController::class, 'edit'])->name('settings.edit');
        Route::get('classes/{class}/students', [StudentClassesController::class, 'students'])->name('classes.students');
        Route::resource('classes', StudentClassesController::class)->only(['show', 'store', 'destroy']);
        Route::post('classes/{class}/exams/{exam}/submit', [StudentClassExamController::class, 'submit'])->name('classes.exams.submit');
        Route::resource('classes.exams', StudentClassExamController::class)->only(['show']);
        Route::delete('requests/{class}/cancel', [StudentClassesController::class, 'cancel'])->name('requests.cancel');

        Route::resource('exams', StudentExamsController::class)->only(['index']);
    });
});

require __DIR__.'/auth.php';
