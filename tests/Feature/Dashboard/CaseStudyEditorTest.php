<?php

use App\Models\CaseStudy;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('case study editor renders for creation', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard.case-studies.create', ['locale' => 'en']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/case-studies/editor')
            ->missing('caseStudy')
        );
});

test('case study editor renders for editing', function () {
    $user = User::factory()->create();
    $caseStudy = CaseStudy::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard.case-studies.edit', ['locale' => 'en', 'caseStudy' => $caseStudy]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/case-studies/editor')
            ->has('caseStudy', fn (Assert $page) => $page
                ->where('id', $caseStudy->id)
                ->where('title', $caseStudy->title)
                ->where('slug', $caseStudy->slug)
                ->etc()
            )
        );
});
