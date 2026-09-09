<?php

use App\Events\ApplicationSubmitted;
use Illuminate\Support\Facades\Event;

it('renders the apply page', function () {
    $response = $this->get(route('page.njc.apply', ['locale' => 'en']));
    $response->assertStatus(200);
});

it('can submit the application form', function () {
    $this->withoutExceptionHandling();
    Event::fake();

    $payload = [
        'name' => 'John Doe',
        'email' => 'john.doe@example.com',
        'phone' => '1234567890',
        'city' => 'Douala',
        'university' => 'University of Buea',
        'graduation_year' => 2024,
        'discipline' => 'fullstack',
        'stack' => 'Laravel, React, Tailwind',
        'mindset_answer_1' => str_repeat('This is a detailed placeholder answer that is over fifty characters to pass validation. ', 2),
        'mindset_answer_2' => str_repeat('This is another detailed placeholder answer that is over fifty characters to pass validation. ', 2),
        'mindset_answer_3' => str_repeat('This is the third detailed placeholder answer that is over fifty characters to pass validation. ', 2),
    ];

    $response = $this->post(route('apply.store', ['locale' => 'en']), $payload);

    $response->assertRedirect(route('apply.success', ['locale' => 'en']));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('applicants', [
        'email' => 'john.doe@example.com',
        'name' => 'John Doe',
    ]);

    Event::assertDispatched(ApplicationSubmitted::class, function ($event) {
        return $event->applicant->email === 'john.doe@example.com';
    });
});
