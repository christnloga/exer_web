<?php

namespace App\Listeners;

use App\Events\ApplicationSubmitted;

class SendApplicationConfirmationEmail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ApplicationSubmitted $event): void
    {
        //
    }
}
