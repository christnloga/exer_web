<?php

namespace App\Services;

use Mailtrap\Api\EmailsSendApiInterface;
use Mailtrap\Mime\MailtrapEmail;
use Psr\Http\Message\ResponseInterface;
use RuntimeException;
use Symfony\Component\Mime\Address;

class MailtrapEmailSender
{
    public function __construct(private EmailsSendApiInterface $client) {}

    public function send(string $recipient, string $subject, string $text, string $category, ?string $html = null): ResponseInterface
    {
        $fromAddress = config('mail.from.address');

        if (! is_string($fromAddress) || trim($fromAddress) === '') {
            throw new RuntimeException('Mail sender address is not configured. Set MAIL_FROM_ADDRESS.');
        }

        $email = (new MailtrapEmail)
            ->from(new Address($fromAddress, (string) config('mail.from.name')))
            ->to(new Address($recipient))
            ->subject($subject)
            ->category($category)
            ->text($text);

        if ($html !== null) {
            $email->html($html);
        }

        return $this->client->send($email);
    }
}
