<?php

use App\Events\WorkshopApplicationSubmitted;
use App\Models\Workshop;
use Illuminate\Support\Facades\Event;

/**
 * @param  array<string, mixed>  $overrides
 * @return array<string, mixed>
 */
function validWorkshopApplicationPayload(array $overrides = []): array
{
    return array_merge([
        'full_name' => 'Jane Doe',
        'email' => 'jane.doe@example.com',
        'country' => 'CM',
        'phone' => '+237690123456',
        'linkedin_url' => 'https://linkedin.com/in/janedoe',
        'gender' => 'female',
        'language' => 'english',
        'background' => 'student',
        'field_of_study' => 'Public health',
        'digital_health_experience' => 'basic_knowledge',
        'motivation' => 'I want to learn how to design better digital health experiences for my community.',
        'interests' => ['ux_user_research', 'ai_in_healthcare'],
        'previous_project_experience' => '0',
        'commitment' => 'yes_commit',
        'goals' => 'I would like to understand users better and improve a digital health product.',
        'referral_source' => 'linkedin',
        'consent' => true,
    ], $overrides);
}

it('renders the application form', function () {
    $workshop = Workshop::factory()->open()->create();

    $this->get(route('workshop.apply', ['locale' => 'en', 'workshop' => $workshop]))
        ->assertStatus(200);
});

it('stores the application with its country and a normalized phone number', function () {
    Event::fake();

    $workshop = Workshop::factory()->open()->create();

    $response = $this->post(
        route('workshop.apply.store', ['locale' => 'en', 'workshop' => $workshop]),
        validWorkshopApplicationPayload([
            'email' => 'john.doe@example.com',
            'country' => 'cm',
            'phone' => ' +237 6 90 12 34 56 ',
        ]),
    );

    $response->assertRedirect(
        route('workshop.apply.success', ['locale' => 'en', 'workshop' => $workshop]),
    );

    $this->assertDatabaseHas('workshop_applicants', [
        'workshop_id' => $workshop->id,
        'email' => 'john.doe@example.com',
        'country' => 'CM',
        'phone' => '+237690123456',
    ]);

    Event::assertDispatched(WorkshopApplicationSubmitted::class);
});

it('requires a country', function () {
    Event::fake();

    $workshop = Workshop::factory()->open()->create();

    $this->post(
        route('workshop.apply.store', ['locale' => 'en', 'workshop' => $workshop]),
        validWorkshopApplicationPayload(['country' => '']),
    )->assertSessionHasErrors('country');

    $this->assertDatabaseCount('workshop_applicants', 0);
});

it('rejects a phone number without a valid international format', function () {
    Event::fake();

    $workshop = Workshop::factory()->open()->create();

    $this->post(
        route('workshop.apply.store', ['locale' => 'en', 'workshop' => $workshop]),
        validWorkshopApplicationPayload(['phone' => '123']),
    )->assertSessionHasErrors('phone');
});

