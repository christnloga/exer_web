<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\VerifyEmailResponse as VerifyEmailResponseContract;
use Symfony\Component\HttpFoundation\Response;

class VerifyEmailResponse implements VerifyEmailResponseContract
{
    public function toResponse($request): Response
    {
        $home = route('dashboard', ['locale' => app()->getLocale()]);

        return $request->wantsJson()
            ? new JsonResponse('', 204)
            : redirect()->intended($home.'?verified=1');
    }
}
