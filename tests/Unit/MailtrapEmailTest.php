<?php

use App\Events\WorkshopApplicationSubmitted;
use App\Listeners\SendWorkshopApplicationConfirmationEmail;
use App\Models\Workshop;
use App\Models\WorkshopApplicant;
use Illuminate\Support\Facades\Artisan;
use Mailtrap\Api\EmailsSendApiInterface;
use Nyholm\Psr7\Response;
use Symfony\Component\Mime\Email;

use function Pest\Laravel\mock;

uses(Tests\TestCase::class);

it('sends a test email to the configured Mailtrap recipient', function () {
    config([
        'mail.from.address' => 'no-reply@example.com',
        'mail.from.name' => 'Example App',
        'services.mailtrap.test_recipient' => 'recipient@example.com',
    ]);

    $client = mock(EmailsSendApiInterface::class);
    $client->shouldReceive('send')
        ->once()
        ->withArgs(fn (Email $email): bool => $email->getFrom()[0]->getAddress() === 'no-reply@example.com'
            && $email->getTo()[0]->getAddress() === 'recipient@example.com'
            && $email->getSubject() === 'You are awesome!'
            && $email->getTextBody() === 'Congrats for sending test email with Mailtrap!')
        ->andReturn(new Response(200, ['Content-Type' => 'application/json'], '{"success":true}'));

    $this->app->instance(EmailsSendApiInterface::class, $client);

    Artisan::call('send-mail');

    expect(Artisan::output())->toContain('"success": true');
});

it('reports when the Mailtrap test recipient is not configured', function () {
    config(['services.mailtrap.test_recipient' => null]);

    expect(Artisan::call('send-mail'))->toBe(1)
        ->and(Artisan::output())->toContain('MAILTRAP_TEST_RECIPIENT');
});

it('requires a Mailtrap API token before creating the client', function () {
    config(['services.mailtrap.api_key' => null]);

    expect(fn () => app(EmailsSendApiInterface::class))
        ->toThrow(\RuntimeException::class, 'Mailtrap API token is not configured');
});

it('creates the Mailtrap client from the configured API token', function () {
    config(['services.mailtrap.api_key' => 'test-token']);

    expect(app(EmailsSendApiInterface::class))
        ->toBeInstanceOf(EmailsSendApiInterface::class);
});

it('sends a confirmation email to a workshop applicant', function () {
    config([
        'mail.from.address' => 'no-reply@example.com',
        'mail.from.name' => 'Example App',
        'app.name' => 'Example App',
    ]);

    $client = mock(EmailsSendApiInterface::class);
    $client->shouldReceive('send')
        ->once()
        ->withArgs(fn (Email $email): bool => $email->getTo()[0]->getAddress() === 'applicant@example.com'
            && $email->getSubject() === 'We received your application to Digital Health Workshop'
            && str_contains((string) $email->getTextBody(), 'Thank you for applying to Digital Health Workshop')
            && str_contains((string) $email->getHtmlBody(), '<title>Application received: Digital Health Workshop</title>')
            && preg_match('/<h1[^>]*>\s*Digital Health Workshop\s*<\/h1>/', (string) $email->getHtmlBody()) === 1
            && ! str_contains((string) $email->getHtmlBody(), 'Mailtrap Confirmation Template Test')
            && str_contains((string) $email->getHtmlBody(), 'src="https://exer-htc.com/favicon.png"')
            && str_contains((string) $email->getHtmlBody(), '#00a99d')
            && str_contains((string) $email->getHtmlBody(), 'does not confirm admission'))
        ->andReturn(new Response(200, ['Content-Type' => 'application/json'], '{"success":true}'));

    $this->app->instance(EmailsSendApiInterface::class, $client);

    $applicant = new WorkshopApplicant([
        'full_name' => 'Test Applicant',
        'email' => 'applicant@example.com',
    ]);
    $applicant->setRelation('workshop', new Workshop(['title' => 'Digital Health Workshop']));

    app(SendWorkshopApplicationConfirmationEmail::class)
        ->handle(new WorkshopApplicationSubmitted($applicant));
});
