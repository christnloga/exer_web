<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Workshop;
use Inertia\Inertia;
use Inertia\Response;

class WorkshopApplicationController extends Controller
{
    /**
     * Display all workshop applications.
     */
    public function index(string $locale): Response
    {
        return Inertia::render('dashboard/workshop-applicants', [
            'workshops' => Workshop::withCount('applicants')
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }
}
