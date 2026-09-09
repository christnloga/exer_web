<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(string $locale): Response
    {
        return Inertia::render('dashboard/messages', [
            'messages' => ContactMessage::latest()->get(),
        ]);
    }

    public function destroy(string $locale, ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->delete();

        return back()->with('success', 'Message deleted.');
    }

    public function toggleRead(string $locale, ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->update([
            'is_read' => ! $contactMessage->is_read,
        ]);

        return back();
    }
}
