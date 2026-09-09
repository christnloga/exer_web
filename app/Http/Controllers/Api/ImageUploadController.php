<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadImageRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function store(UploadImageRequest $request): JsonResponse
    {
        try {
            $file = $request->file('image');
            $folder = $request->input('folder', 'general');

            // Generate unique filename
            $fileName = Str::uuid().'.'.$file->getClientOriginalExtension();

            $disk = app()->environment('production') ? 's3' : 'public';
            $path = $file->storeAs($folder, $fileName, $disk);

            if (! $path) {
                return response()->json(['message' => 'Failed to upload image.'], 500);
            }

            return response()->json([
                'message' => 'Image uploaded successfully.',
                'data' => [
                    'url' => Storage::disk($disk)->url($path),
                    'path' => $path,
                    'filename' => $fileName,
                    'public_url' => Storage::disk($disk)->url($path),
                ],
            ], 201);
        } catch (\Exception $e) {
            Log::error('Image upload failed: '.$e->getMessage());

            return response()->json(['message' => 'An error occurred during upload.'], 500);
        }
    }
}
