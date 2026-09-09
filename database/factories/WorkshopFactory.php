<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Workshop>
 */
class WorkshopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'slug' => fn (array $attributes) => Str::slug($attributes['title']).'-'.fake()->unique()->numberBetween(1000, 9999),
            'short_description' => fake()->sentence(),
            'description' => fake()->paragraphs(3, true),
            'cover_image_url' => fake()->optional()->imageUrl(),
            'start_date' => fake()->dateTimeBetween('+1 month', '+2 months')->format('Y-m-d'),
            'end_date' => fake()->dateTimeBetween('+2 months', '+3 months')->format('Y-m-d'),
            'number_of_sessions' => 4,
            'max_applicants' => fake()->optional()->numberBetween(20, 50),
            'application_deadline' => fake()->dateTimeBetween('+1 week', '+1 month'),
            'status' => fake()->randomElement(['draft', 'published']),
        ];
    }

    /**
     * Indicate that the workshop is accepting applications.
     */
    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'application_deadline' => now()->addWeeks(2),
        ]);
    }
}
