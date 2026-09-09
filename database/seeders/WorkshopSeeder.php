<?php

namespace Database\Seeders;

use App\Models\Workshop;
use Illuminate\Database\Seeder;

class WorkshopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Workshop::updateOrCreate(
            ['slug' => 'digital-health-ux-foundations'],
            [
                'title' => 'Digital Health UX Foundations Workshop',
                'short_description' => 'A hands-on workshop exploring user experience, user research, and innovation in digital health.',
                'description' => "This workshop is designed for healthcare professionals, students, technologists, and innovators who want to understand users better, improve digital health products, and explore careers in HealthTech.\n\nOver four interactive sessions, participants will cover UX fundamentals, user research, product thinking, healthcare accessibility, patient experience, and how AI is reshaping digital health.",
                'number_of_sessions' => 4,
                'max_applicants' => 25,
                'application_deadline' => now()->addWeeks(2),
                'start_date' => now()->addMonth(),
                'end_date' => now()->addMonths(2),
                'status' => 'published',
            ]
        );
    }
}
