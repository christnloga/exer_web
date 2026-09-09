<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;
use Symfony\Component\HttpFoundation\Response;

class LogoutResponse implements LogoutResponseContract
{
    public function toResponse($request): Response
    {
        $home = route('home', ['locale' => app()->getLocale()]);

        return $request->wantsJson()
            ? new JsonResponse('', 204)
            : redirect($home);
    }
}
