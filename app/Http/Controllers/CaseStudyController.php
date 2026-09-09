<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use Inertia\Inertia;
use Inertia\Response;

class CaseStudyController extends Controller
{
    /**
     * Display the specified case study.
     */
    public function show(string $locale, CaseStudy $caseStudy): Response
    {
        return Inertia::render('CaseStudyView', [
            'caseStudy' => $caseStudy,
        ]);
    }
}
