<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('workshop_applicants', function (Blueprint $table) {
            $table->uuid('id')->primary();

            // Workshop this application belongs to
            $table->foreignUuid('workshop_id')->constrained()->cascadeOnDelete();

            // Section 1 — About you
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('linkedin_url')->nullable();

            // Section 2 — Your background
            $table->string('background'); // What best describes you
            $table->string('field_of_study'); // Current field, profession or area of study
            $table->string('digital_health_experience'); // Current experience with digital health

            // Section 3 — Your interest
            $table->text('motivation'); // Why do you want to participate
            $table->json('interests')->nullable(); // Areas of interest (checkboxes, up to 3)
            $table->boolean('previous_project_experience')->default(false); // Worked on a project before
            $table->text('previous_project_description')->nullable(); // Optional description + role

            // Section 4 — Commitment
            $table->string('commitment'); // Can you commit to all sessions
            $table->text('goals'); // What would you like to do differently

            // Final
            $table->string('referral_source'); // How did you hear about the workshop
            $table->boolean('consent')->default(false); // Required consent checkbox

            // Application workflow status
            $table->enum('status', ['pending', 'shortlisted', 'accepted', 'rejected'])->default('pending');

            $table->timestamps();

            // Useful indexes
            $table->index('email');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workshop_applicants');
    }
};
