<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Applicant>
 */
class ApplicantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'city' => fake()->city(),
            'university' => fake()->company().' University', // fake university name
            'graduation_year' => fake()->numberBetween(2020, 2026),
            'portfolio_url' => fake()->optional()->url(),
            'github_url' => fake()->optional()->url(),
            'discipline' => fake()->randomElement(['ux_ui', 'frontend', 'backend', 'fullstack']),
            'status' => fake()->randomElement(['pending', 'shortlisted', 'accepted', 'rejected']),
            'stack' => implode(', ', fake()->words(5)),
            'mindset_answer_1' => fake()->paragraphs(3, true),
            'mindset_answer_2' => fake()->paragraphs(3, true),
            'mindset_answer_3' => fake()->paragraphs(3, true),
        ];
    }
}
