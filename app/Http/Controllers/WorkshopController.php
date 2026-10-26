<?php

namespace App\Http\Controllers;

use App\Events\WorkshopApplicationSubmitted;
use App\Http\Requests\StoreWorkshopApplicationRequest;
use App\Models\Workshop;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class WorkshopController extends Controller
{
    /**
     * Display the list of workshops (upcoming / ongoing and past editions).
     */
    public function index(string $locale): Response
    {
        $ongoing = Workshop::query()
            ->where('status', 'published')
            ->withCount('applicants')
            ->orderBy('start_date')
            ->get();

        $past = Workshop::query()
            ->where('status', 'completed')
            ->withCount('applicants')
            ->orderByDesc('start_date')
            ->get();

        return Inertia::render('workshops/Index', [
            'ongoingWorkshops' => $ongoing->map(fn (Workshop $workshop): array => $this->present($workshop))->values(),
            'pastWorkshops' => $past->map(fn (Workshop $workshop): array => $this->present($workshop))->values(),
        ]);
    }

    /**
     * Serialize a workshop with its public registration state.
     *
     * @return array<string, mixed>
     */
    private function present(Workshop $workshop): array
    {
        return [
            ...$workshop->toArray(),
            'registration_open' => $workshop->isRegistrationOpen(),
            'remaining_places' => $workshop->remainingPlaces(),
        ];
    }

    /**
     * Display the workshop landing page.
     */
    public function show(string $locale, Workshop $workshop): Response
    {
        return Inertia::render('workshops/Show', [
            'workshop' => $workshop,
            'registrationOpen' => $workshop->isRegistrationOpen(),
            'remainingPlaces' => $workshop->remainingPlaces(),
        ]);
    }

    /**
     * Display the workshop application form.
     */
    public function create(string $locale, Workshop $workshop): Response
    {
        return Inertia::render('workshops/Apply', [
            'workshop' => $workshop,
            'registrationOpen' => $workshop->isRegistrationOpen(),
        ]);
    }

    /**
     * Store the newly created application.
     */
    public function store(string $locale, Workshop $workshop, StoreWorkshopApplicationRequest $request): RedirectResponse
    {
        // 1. Create the record using the validated, sanitized data
        $applicant = $workshop->applicants()->create($request->validated());

        // 2. Fire an event to handle background tasks (like emails)
        WorkshopApplicationSubmitted::dispatch($applicant);

        // 3. Redirect to a success page with a flash message
        return redirect()
            ->route('workshop.apply.success', ['locale' => $locale, 'workshop' => $workshop])
            ->with('success', 'Your application has been securely received.');
    }

    /**
     * Display the application success screen.
     */
    public function success(string $locale, Workshop $workshop): Response
    {
        return Inertia::render('workshops/ApplySuccess', [
            'workshop' => $workshop,
        ]);
    }
}
