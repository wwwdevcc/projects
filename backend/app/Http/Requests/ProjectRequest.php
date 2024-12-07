<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|unique:projects,title,' . ($this->project ?$this->project->id : '') . '|max:255',
            'description' => 'required|string|max:5000',
            'stack' => 'required|array',
            'stack.frontend' => 'nullable|array',
            'stack.backend' => 'nullable|array',
            'stack.database' => 'nullable|array',
            'stack.tooling' => 'nullable|array',
            'is_active' => 'nullable|boolean',
            'email' => 'nullable|email|max:255',
            'discord' => 'nullable|string|max:255',
            'github' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255'
        ];
    }
}
