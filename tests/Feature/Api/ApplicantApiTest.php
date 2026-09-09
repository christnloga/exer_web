<?php

use App\Models\Applicant;
use App\Models\User;

test('api can fetch applicants', function () {
    $user = User::factory()->create();
    Applicant::factory()->count(5)->create();

    $response = $this->actingAs($user)->get(route('api.applicants.index'));

    $response->assertOk();
    $response->assertJsonCount(5); // 5 created here
});

test('api can update applicant status', function () {
    $user = User::factory()->create();
    $applicant = Applicant::factory()->create(['status' => 'pending']);

    $response = $this->actingAs($user)->patch(route('api.applicants.update-status', $applicant), [
        'status' => 'shortlisted',
    ]);

    $response->assertOk();
    $this->assertEquals('shortlisted', $applicant->fresh()->status);
});

test('api validates status update', function () {
    $user = User::factory()->create();
    $applicant = Applicant::factory()->create();

    $response = $this->actingAs($user)->patch(route('api.applicants.update-status', $applicant), [
        'status' => 'invalid-status',
    ]);

    $response->assertStatus(302); // Redirect back due to validation error in session-based patch if not JSON
    // Or assert session has errors if preferred
});
