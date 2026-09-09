<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCaseStudyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('case_studies', 'slug')->ignore($this->route('case_study'))],
            'client_name' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'short_description' => ['required', 'string'],
            'cover_image_url' => ['nullable', 'string', 'max:512'],
            'roles' => ['nullable', 'array'],
            'roles.*' => ['string', 'max:100'],
            'tech_stack' => ['nullable', 'array'],
            'tech_stack.*' => ['string', 'max:100'],
            'content_blocks' => ['required', 'array'],
            'content_blocks.*.id' => ['required', 'string'],
            'content_blocks.*.type' => ['required', 'string', 'in:heading,text,image,code_snippet,gallery'],
            'content_blocks.*.data' => ['required', 'array'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'is_published' => ['boolean'],
        ];
    }
}
