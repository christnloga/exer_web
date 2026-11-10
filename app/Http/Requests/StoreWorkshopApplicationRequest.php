<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StoreWorkshopApplicationRequest extends FormRequest
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
     * Intercepts the payload to normalize values before rules apply.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'linkedin_url' => $this->formatUrl($this->linkedin_url),
            'country' => $this->formatCountryCode($this->country),
            'phone' => $this->formatPhoneNumber($this->phone),
            'motivation' => Str::squish((string) $this->motivation),
            'goals' => Str::squish((string) $this->goals),
            'previous_project_description' => Str::squish((string) $this->previous_project_description),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        $workshopId = $this->route('workshop')?->id;

        return [
            // Workshop this application belongs to
            'workshop_id' => ['sometimes', 'required', 'exists:workshops,id'],

            // Section 1 — About you
            'full_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('workshop_applicants', 'email')
                    ->where('workshop_id', $workshopId),
            ],
            'phone' => ['required', 'string', 'regex:/^\+[1-9]\d{6,14}$/'],
            'country' => ['required', 'string', 'size:2', 'regex:/^[A-Z]{2}$/'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'gender' => [
                'required',
                'string',
                'in:male,female,non_binary,prefer_not_to_say',
            ],
            'language' => [
                'required',
                'string',
                'in:english,french,bilingual,other',
            ],

            // Section 2 — Your background
            'background' => [
                'required',
                'string',
                'in:healthcare_professional,student,recent_graduate,technology_it_professional,ux_ui_professional,product_project_professional,entrepreneur_founder,researcher,public_health_professional,ngo_development_professional,other',
            ],
            'field_of_study' => ['required', 'string', 'max:255'],
            'digital_health_experience' => [
                'required',
                'string',
                'in:completely_new,basic_knowledge,studied_or_worked,currently_work,significant_experience',
            ],

            // Section 3 — Your interest
            'motivation' => ['required', 'string', 'min:20', 'max:5000'],
            'interests' => [
                'required',
                'array',
                'min:1',
                'max:3',
            ],
            'interests.*' => [
                'string',
                'in:digital_health,ux_user_research,product_management,ai_in_healthcare,healthcare_innovation,healthtech_entrepreneurship,healthcare_accessibility,patient_experience,digital_health_research,other',
            ],
            'previous_project_experience' => ['required', 'boolean'],
            'previous_project_description' => [
                'nullable',
                'string',
                'max:5000',
                'required_if:previous_project_experience,true',
            ],

            // Section 4 — Commitment
            'commitment' => [
                'required',
                'string',
                'in:yes_commit,most_sessions,not_sure',
            ],
            'goals' => ['required', 'string', 'min:20', 'max:5000'],

            // Final
            'referral_source' => [
                'required',
                'string',
                'in:linkedin,whatsapp,instagram,facebook,friend_colleague,university_school,professional_network,other',
            ],
            'consent' => ['required', 'accepted'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'email.unique' => 'An application for this workshop with this email has already been submitted. We will be in touch!',
            'phone.regex' => 'Please enter a valid phone number, including your country code.',
            'country.required' => 'Please select your country.',
            'country.size' => 'Please select a valid country.',
            'interests.max' => 'You can select up to 3 areas of interest.',
            'interests.min' => 'Please select at least one area of interest.',
            'consent.accepted' => 'Please confirm that the information you provided is accurate.',
            'previous_project_description.required_if' => 'Please briefly describe your previous project and your role.',
            'motivation.min' => 'Tell us a little more about what motivated you to apply.',
            'goals.min' => 'Share a little more detail about what you hope to achieve.',
        ];
    }

    /**
     * Normalize an ISO 3166-1 alpha-2 country code.
     */
    private function formatCountryCode(?string $country): ?string
    {
        $code = strtoupper(trim((string) $country));

        return $code === '' ? null : $code;
    }

    /**
     * Normalize a phone number into an E.164-like international format.
     */
    private function formatPhoneNumber(?string $phone): string
    {
        $digits = preg_replace('/\D+/', '', (string) $phone);

        return $digits ? '+'.$digits : (string) $phone;
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
