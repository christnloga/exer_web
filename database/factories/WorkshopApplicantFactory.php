<?php

namespace Database\Factories;

use App\Models\Workshop;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkshopApplicant>
 */
class WorkshopApplicantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'workshop_id' => Workshop::factory(),
            // Section 1 — About you
            'full_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'linkedin_url' => fake()->optional()->url(),
            'gender' => fake()->randomElement(['male', 'female', 'non_binary', 'prefer_not_to_say']),
            'language' => fake()->randomElement(['english', 'french', 'bilingual', 'other']),
            // Section 2 — Your background
            'background' => fake()->randomElement([
                'healthcare_professional', 'student', 'recent_graduate',
                'technology_it_professional', 'ux_ui_professional',
                'product_project_professional', 'entrepreneur_founder',
                'researcher', 'public_health_professional',
                'ngo_development_professional', 'other',
            ]),
            'field_of_study' => fake()->jobTitle(),
            'digital_health_experience' => fake()->randomElement([
                'completely_new', 'basic_knowledge', 'studied_or_worked',
                'currently_work', 'significant_experience',
            ]),
            // Section 3 — Your interest
            'motivation' => fake()->paragraphs(2, true),
            'interests' => fake()->randomElements([
                'digital_health', 'ux_user_research', 'product_management',
                'ai_in_healthcare', 'healthcare_innovation',
                'healthtech_entrepreneurship', 'healthcare_accessibility',
                'patient_experience', 'digital_health_research', 'other',
            ], fake()->numberBetween(1, 3)),
            'previous_project_experience' => fake()->boolean(),
            'previous_project_description' => fake()->optional()->paragraph(),
            // Section 4 — Commitment
            'commitment' => fake()->randomElement(['yes_commit', 'most_sessions', 'not_sure']),
            'goals' => fake()->paragraphs(2, true),
            // Final
            'referral_source' => fake()->randomElement([
                'linkedin', 'whatsapp', 'instagram', 'facebook',
                'friend_colleague', 'university_school', 'professional_network', 'other',
            ]),
            'consent' => true,
            // Workflow
            'status' => fake()->randomElement(['pending', 'shortlisted', 'accepted', 'rejected']),
        ];
    }
}
