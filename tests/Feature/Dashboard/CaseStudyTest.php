<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

test('dashboard case studies page is accessible to authenticated users', function () {
    $user = User::factory()->create();

    $response = actingAs($user)
        ->get(route('dashboard.case-studies', ['locale' => 'en']));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard/case-studies')
        ->has('caseStudies')
    );
});

test('unauthenticated users cannot access dashboard case studies page', function () {
    $response = $this->get(route('dashboard.case-studies', ['locale' => 'en']));

    $response->assertRedirect();
});
