<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Open to the public, so anyone can apply.
        return true;
    }

    /**
     * Prepare the data for validation.
     * This intercepts the payload to clean things up before the rules apply.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            // Ensure URLs have a scheme so the 'url' validation rule doesn't fail unnecessarily
            'portfolio_url' => $this->formatUrl($this->portfolio_url),
            'github_url' => $this->formatUrl($this->github_url),
            'mindset_answer_1' => Str::squish($this->mindset_answer_1),
            'mindset_answer_2' => Str::squish($this->mindset_answer_2),
            'mindset_answer_3' => Str::squish($this->mindset_answer_3),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // The Foundation
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:applicants,email'],
            'phone' => ['required', 'string', 'max:20'],
            'city' => ['required', 'string', 'max:100'],
            'university' => ['required', 'string', 'max:255'],
            // Enforce the "Fresh Graduate" constraint
            'graduation_year' => ['required', 'integer', 'min:2020', 'max:2026'],

            // The Craft
            'discipline' => ['required', 'string', 'in:ux_ui,frontend,backend,fullstack'],
            'portfolio_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'stack' => ['required', 'string', 'max:1000'],

            // The Mindset
            // Assuming an average of 5-6 chars per word, 300 words is roughly 1500-1800 chars.
            // Setting max to 2000 gives them a little breathing room while enforcing conciseness.
            'mindset_answer_1' => ['required', 'string', 'min:50', 'max:2000'],
            'mindset_answer_2' => ['required', 'string', 'min:50', 'max:2000'],
            'mindset_answer_3' => ['required', 'string', 'min:50', 'max:2000'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     * This ensures the Inertia frontend displays human-readable, empathetic errors.
     */
    public function messages(): array
    {
        return [
            'email.unique' => 'An application with this email has already been submitted. We will be in touch!',
            'graduation_year.min' => 'This program is highly tailored for recent graduates (2020-2026).',
            'graduation_year.max' => 'Please enter a valid graduation year up to 2026.',
            'discipline.in' => 'Please select one of the core disciplines provided.',
            'mindset_answer_1.max' => 'Keep your architectural solution concise. Try to stay under 300 words.',
            'mindset_answer_1.min' => 'Dive a little deeper into your solution. We want to see how you think.',
        ];
    }

    /**
     * Helper to format URLs.
     */
    private function formatUrl(?string $url): ?string
    {
        if (empty($url)) {
            return null;
        }

        if (! preg_match('~^(?:f|ht)tps?://~i', $url)) {
            return 'https://'.$url;
        }

        return $url;
    }
}
