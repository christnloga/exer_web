<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\CaseStudy;
use Inertia\Inertia;
use Inertia\Response;

class CaseStudyController extends Controller
{
    public function index(string $locale): Response
    {
        return Inertia::render('dashboard/case-studies', [
            'caseStudies' => CaseStudy::latest()->get(),
        ]);
    }

    public function create(string $locale): Response
    {
        return Inertia::render('dashboard/case-studies/editor');
    }

    public function edit(string $locale, CaseStudy $caseStudy): Response
    {
        return Inertia::render('dashboard/case-studies/editor', [
            'caseStudy' => $caseStudy,
        ]);
    }
}
