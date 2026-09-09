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
        Schema::create('applicants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('city');
            $table->string('university');
            $table->integer('graduation_year');
            $table->string('portfolio_url')->nullable();
            $table->string('github_url')->nullable();
            $table->enum('discipline', ['ux_ui', 'frontend', 'backend', 'fullstack']);
            $table->enum('status', ['pending', 'shortlisted', 'accepted', 'rejected'])->default('pending');
            $table->text('stack');
            $table->text('mindset_answer_1');
            $table->text('mindset_answer_2');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicants');
    }
};
