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
        Schema::table('projects', function (Blueprint $table) {
            $table->string('email')->nullable()->after('stack');
            $table->string('discord')->nullable()->after('email');
            $table->string('github')->nullable()->after('discord');
            $table->string('website')->nullable()->after('github');
            $table->boolean('is_active')->default(false)->after('website');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['discord', 'github', 'email', 'website', 'is_active']);
        });
    }
};
