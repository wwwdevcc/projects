<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       // Convert existing mediumText data to JSON
       DB::table('projects')->get()->each(function ($project) {
        // Default structure if conversion fails
        $stackArray = [
            'frontend' => [],
            'backend' => [],
            'database' => [],
            'tooling' => []
        ];

        // Try to parse existing stack value
        try {
            $parsedStack = json_decode($project->stack, true);
            if (is_array($parsedStack)) {
                $stackArray = $parsedStack;
            }
        } catch (\Exception $e) {
            // Use default if parsing fails
        }

        // Update with JSON-encoded array
        DB::table('projects')
            ->where('id', $project->id)
            ->update([
                'stack' => json_encode($stackArray)
            ]);
    });

    // Modify column type
    Schema::table('projects', function (Blueprint $table) {
        $table->json('stack')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->mediumText('stack')->change();
        });
    }
};
