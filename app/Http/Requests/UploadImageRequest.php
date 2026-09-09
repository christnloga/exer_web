<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'image' => ['required', 'image', 'mimes:jpeg,png,webp,gif', 'max:5120'],
            'folder' => ['nullable', 'string', 'in:case-study-media,case-studies,avatars,general'],
        ];
    }
}
