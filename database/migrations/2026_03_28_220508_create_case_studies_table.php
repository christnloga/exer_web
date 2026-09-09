<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('case_studies', function (Blueprint $table) {
            // Primary Key
            $table->uuid('id')->primary();

            // Core Relational Data
            $table->string('title', 255);
            $table->string('slug', 255)->unique();
            $table->string('client_name', 255)->nullable();
            $table->text('short_description');
            $table->string('cover_image_url', 512)->nullable();

            // For Laravel, using JSONB is the cleanest way to handle PostgreSQL arrays
            // without writing raw SQL. This maps perfectly to the Eloquent 'array' casts.
            $table->jsonb('roles')->nullable();
            $table->jsonb('tech_stack')->nullable();

            // The unstructured React block payload
            $table->jsonb('content_blocks')->default('[]');

            // Timeline & Status
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('is_published')->default(false);

            // Standard timestamps (created_at, updated_at)
            $table->timestamps();
        });

        // Add the PostgreSQL-specific GIN index to the JSONB column for fast querying (PgSQL only)
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('CREATE INDEX idx_case_studies_content ON case_studies USING GIN (content_blocks)');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_studies');
    }
};
