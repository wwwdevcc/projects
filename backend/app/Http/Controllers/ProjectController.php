<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('user')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $projects,
            'message' => 'Projects retrieved successfully.'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'stack' => 'required|string'
        ]);

        $project = auth()->user()->projects()->create($validatedData);

        return response()->json([
            'success' => true,
            'data' => $project,
            'message' => 'Project created successfully.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load('user');

        return response()->json([
            'success' => true,
            'data' => $project,
            'message' => 'Project retrieved successfully.'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        // 403 Forbidden. The user does not have permissions to edit this project.
        if (auth()->id() !== $project->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this project.'
            ], 403);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'stack' => 'sometimes|required|string',
        ]);

        $project->update($validatedData);

        return response()->json([
            'success' => true,
            'data' => $project,
            'message' => 'Project updated successfully.'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if (auth()->id() !== $project->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this project.'
            ], 403);
        }

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully.'
        ], 200);
    }
}
