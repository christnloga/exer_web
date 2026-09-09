<?php

use App\Models\ContactMessage;
use App\Models\User;

test('admin can view messages dashboard', function () {
    $admin = User::factory()->create();
    ContactMessage::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('dashboard.messages', ['locale' => 'en']));

    $response->assertStatus(200);
});

test('admin can delete a message', function () {
    $admin = User::factory()->create();
    $message = ContactMessage::factory()->create();

    $response = $this->actingAs($admin)->delete(route('dashboard.messages.destroy', ['locale' => 'en', 'contactMessage' => $message]));

    $response->assertRedirect();
    $this->assertDatabaseMissing('contact_messages', ['id' => $message->id]);
});

test('admin can toggle read status of a message', function () {
    $admin = User::factory()->create();
    $message = ContactMessage::factory()->create(['is_read' => false]);

    $response = $this->actingAs($admin)->patch(route('dashboard.messages.toggle-read', ['locale' => 'en', 'contactMessage' => $message]));

    $response->assertRedirect();
    $this->assertDatabaseHas('contact_messages', [
        'id' => $message->id,
        'is_read' => true,
    ]);
});
