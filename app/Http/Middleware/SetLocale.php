<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->segment(1);

        if (! in_array($locale, ['en', 'fr'])) {
            if (app()->runningInConsole()) {
                $locale = 'fr';
            } else {
                return redirect('/fr'.$request->getRequestUri());
            }
        }

        App::setLocale($locale);
        URL::defaults(['locale' => $locale]);
        config(['fortify.home' => route('dashboard', ['locale' => $locale])]);

        return $next($request);
    }
}
