<?php

use App\Services\MailtrapEmailSender;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Mailtrap\Helper\ResponseHelper;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('send-mail', function (): int {
    $recipient = config('services.mailtrap.test_recipient');

    if (! is_string($recipient) || trim($recipient) === '') {
        $this->error('Set MAILTRAP_TEST_RECIPIENT before sending a test email.');

        return 1;
    }

    $response = app(MailtrapEmailSender::class)->send(
        recipient: $recipient,
        subject: 'You are awesome!',
        text: 'Congrats for sending test email with Mailtrap!',
        category: 'Integration Test',
    );

    $this->line(json_encode(ResponseHelper::toArray($response), JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR));

    return 0;
})->purpose('Send a test email with Mailtrap');
