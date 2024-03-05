<?php

namespace App\Http\Middleware;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        if($user && $user->roles()->where('roles.name', 'student')->exists()) {
            $user->load([
                'enrolled_classes' => function ( $query) {
                    $query->with([
                        'section:id,name',
                        'subject:id,name',
                        'instructor:id' => [
                            'profile',
                        ],
                    ])->wherePivot('status', 'enrolled');
                }
            ]);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
        ];
    }
}
