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
        Schema::create('workshops', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('title', 255);
            $table->string('slug', 255)->unique();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->string('cover_image_url', 512)->nullable();

            // Workshop schedule (the form mentions "all four workshop sessions")
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->unsignedInteger('number_of_sessions')->default(1);

            // Registration controls ("places are limited")
            $table->unsignedInteger('max_applicants')->nullable();
            $table->timestamp('application_deadline')->nullable();

            // Publishing state
            $table->enum('status', ['draft', 'published', 'completed', 'cancelled'])->default('draft');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workshops');
    }
};
