<?php

namespace App\Listeners;

use App\Events\WorkshopApplicationSubmitted;

class SendWorkshopApplicationConfirmationEmail
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
    public function handle(WorkshopApplicationSubmitted $event): void
    {
        // TODO: Send a confirmation email to the applicant once the mailer is wired up.
        // $event->applicant, $event->applicant->workshop
    }
}
