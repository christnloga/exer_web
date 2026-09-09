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
        Schema::table('workshop_applicants', function (Blueprint $table) {
            $table->string('gender')->nullable()->after('linkedin_url');
            $table->string('language')->nullable()->after('gender');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workshop_applicants', function (Blueprint $table) {
            $table->dropColumn(['gender', 'language']);
        });
    }
};
