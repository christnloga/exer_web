<?php

namespace App\Listeners;

use App\Events\WorkshopApplicationSubmitted;
use App\Services\MailtrapEmailSender;
use RuntimeException;

class SendWorkshopApplicationConfirmationEmail
{
    public function __construct(private MailtrapEmailSender $emailSender) {}

    /**
     * Handle the event.
     */
    public function handle(WorkshopApplicationSubmitted $event): void
    {
        $applicant = $event->applicant;
        $workshop = $applicant->workshop;

        if ($workshop === null) {
            throw new RuntimeException('Cannot send an application confirmation without its workshop.');
        }

        $html = view('emails.workshops.application-confirmation', [
            'applicant' => $applicant,
            'workshop' => $workshop,
            'logoUrl' => config('services.mailtrap.logo_url'),
        ])->render();

        $this->emailSender->send(
            recipient: $applicant->email,
            subject: 'We received your application to '.$workshop->title,
            text: sprintf(
                "Hello %s,\n\nThank you for applying to %s. We have received your application and will review it.\n\nBest,\n%s",
                $applicant->full_name,
                $workshop->title,
                config('app.name'),
            ),
            category: 'Workshop application',
            html: $html,
        );
    }
}
