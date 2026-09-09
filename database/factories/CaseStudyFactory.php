<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CaseStudy>
 */
class CaseStudyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(3);

        return [
            'id' => (string) \Illuminate\Support\Str::uuid(),
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'client_name' => $this->faker->company(),
            'short_description' => $this->faker->paragraph(),
            'cover_image_url' => 'https://picsum.photos/seed/'.rand(1, 1000).'/800/600',
            'roles' => $this->faker->words(3),
            'tech_stack' => $this->faker->words(5),
            'content_blocks' => [],
            'start_date' => now()->subMonths(3),
            'end_date' => now(),
            'is_published' => true,
        ];
    }
}
