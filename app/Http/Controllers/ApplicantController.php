<?php

namespace App\Http\Controllers;

use App\Events\ApplicationSubmitted;
use App\Http\Requests\StoreApplicationRequest;
use App\Models\Applicant;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ApplicantController extends Controller
{
    /**
     * Display the application form.
     */
    public function create(): Response
    {
        return Inertia::render('njc/Apply');
    }

    /**
     * Store the newly created application.
     */
    public function store(StoreApplicationRequest $request): RedirectResponse
    {
        // 1. Create the record using the validated, sanitized data
        $applicant = Applicant::create($request->validated());

        // 2. Fire an event to handle background tasks (like emails)
        ApplicationSubmitted::dispatch($applicant);

        // 3. Redirect to a success page with a flash message
        return redirect()->route('apply.success', ['locale' => app()->getLocale()])->with(
            'success',
            'Your application to the NJC 2026 Batch has been securely received.'
        );
    }

    /**
     * Display the success screen.
     */
    public function success(): Response
    {
        return Inertia::render('njc/ApplySuccess');
    }
}
