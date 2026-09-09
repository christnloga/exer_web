<?php

test('visitor can submit contact message', function () {
    $response = $this->post(route('contact.store', ['locale' => 'en']), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'message' => 'Hello this is a test message.',
    ]);

    $response->assertSessionHasNoErrors();
    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('contact_messages', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'message' => 'Hello this is a test message.',
        'is_read' => 0,
    ]);
});

test('contact form requires validation', function () {
    $response = $this->post(route('contact.store', ['locale' => 'en']), []);

    $response->assertSessionHasErrors(['name', 'email', 'message']);
});
