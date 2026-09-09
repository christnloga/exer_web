<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ApplicantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Applicant::factory()->count(15)->create();
    }
}
