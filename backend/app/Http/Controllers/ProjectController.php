<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\ProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('user')
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $projects,
            'message' => 'Projects retrieved successfully.'
        ], 200);
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
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $this->authorize('create', Project::class);
        
        $userId = auth()->id();
        
        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'No authenticated user found.'
            ], 401);
        }

        try {
            $project = Project::create(array_merge(
                $request->validated(),
                ['user_id' => $userId]
            ));
            
            return response()->json([
                'success' => true,
                'data' => $project->load('user'),
                'message' => 'Project created successfully.'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create project.'
            ], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $this->authorize('update', $project);

        $project->update($request->validated());
        
        return response()->json([
            'success' => true,
            'data' => $project->fresh()->load('user'),
            'message' => 'Project updated successfully.'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully.'
        ], 204);
    }
}
