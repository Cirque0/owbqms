<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Faculty\FacultyAuthenticationController;
use App\Http\Controllers\Faculty\FacultyRegistrationController;
use App\Http\Controllers\Student\StudentAuthenticationController;
use App\Http\Controllers\Student\StudentRegistrationController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    // TODO: Remove boilerplate register and login routes later
    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::prefix('faculty')->group(function () {

        Route::controller(FacultyAuthenticationController::class)->group(function () {
            Route::get('login', 'show')->name('faculty.login');
            Route::post('login', 'store')->name('faculty.login.store');
        });
    
        Route::controller(FacultyRegistrationController::class)->group(function () {
            Route::get('register', 'show')->name('faculty.register');
            Route::post('register', 'store')->name('faculty.register.store');
        });
    });

    Route::prefix('student')->group(function () {
        Route::controller(StudentAuthenticationController::class)->group(function () {
            Route::get('login', 'show')->name('student.login');
            Route::post('login', 'store')->name('student.login.store');
        });

        Route::controller(StudentRegistrationController::class)->group(function () {
            Route::get('register', 'show')->name('student.register');
            Route::post('register', 'store')->name('student.register.store');
        });
    });

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
                ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});
