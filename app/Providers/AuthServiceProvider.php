<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\ClassModel;
use App\Models\Exam;
use App\Policies\ClassPolicy;
use App\Policies\ExamPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        ClassModel::class => ClassPolicy::class,
        Exam::class => ExamPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
