<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders the contact page', function () {
    $this->get('/en/contact')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Contact')
            ->where('locale', 'en')
        );
});

it('shares the success flash message after a message is sent', function () {
    $this->from('/en/contact')->post('/en/contact', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'message' => 'Hello this is a test message.',
    ]);

    $this->get('/en/contact')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('flash.success', 'Your message has been sent successfully!')
        );
});
