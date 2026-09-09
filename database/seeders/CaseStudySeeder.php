<?php

namespace Database\Seeders;

use App\Models\CaseStudy;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CaseStudySeeder extends Seeder
{
    public function run(): void
    {
        // 1. Locate your JSON file
        $jsonPath = database_path('data/cameroon-bar-association.json');

        if (! File::exists($jsonPath)) {
            $this->command->error("Data file not found at {$jsonPath}");

            return;
        }

        // 2. Read and decode the JSON
        $json = File::get($jsonPath);
        $data = json_decode($json, true);

        // 3. Insert or update the database
        // Using updateOrCreate prevents duplicates if you run the seeder multiple times
        CaseStudy::updateOrCreate(
            ['slug' => $data['slug']], // Search by slug
            $data                      // Update/Insert with the full payload
        );

        $this->command->info("Case study '{$data['title']}' seeded successfully!");
    }
}
