<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCaseStudyRequest;
use App\Models\CaseStudy;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CaseStudyController extends Controller
{
    public function index(): JsonResponse
    {
        try {

            $query = CaseStudy::orderBy('created_at', 'desc');

            if (! request()->boolean('all')) {
                $query->where('is_published', true);
            }

            $caseStudies = $query->get();

            return response()->json($caseStudies);

        } catch (\Exception $e) {

            Log::error('Failed to fetch case studies: '.$e->getMessage());

            return response()->json([
                'message' => 'An error occurred while fetching case studies.',
            ], 500);

        }
    }

    public function show(string $slug): JsonResponse
    {
        try {

            $caseStudy = CaseStudy::where('slug', $slug)->firstOrFail();

            return response()->json($caseStudy);
        } catch (\Exception $e) {

            Log::error('Failed to fetch case study: '.$e->getMessage());

            return response()->json([
                'message' => 'An error occurred while fetching the case study.',
            ], 500);

        }
    }

    public function store(StoreCaseStudyRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            // The validated() method grabs only the data that passed our rules.
            // Because 'content_blocks' is cast to an array in the model,
            // Eloquent will seamlessly insert it into the PostgreSQL JSONB column.
            $caseStudy = CaseStudy::create($request->validated());

            DB::commit();

            return response()->json([
                'message' => 'Case study created successfully.',
                'data' => $caseStudy,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create case study: '.$e->getMessage());

            return response()->json([
                'message' => 'An error occurred while saving the case study.',
            ], 500);
        }
    }

    public function update(StoreCaseStudyRequest $request, CaseStudy $caseStudy): JsonResponse
    {
        try {
            DB::beginTransaction();
            $caseStudy->update($request->validated());
            DB::commit();

            return response()->json([
                'message' => 'Case study updated successfully.',
                'data' => $caseStudy,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to update case study: '.$e->getMessage());

            return response()->json([
                'message' => 'An error occurred while updating the case study.',
            ], 500);
        }
    }

    public function destroy(CaseStudy $caseStudy): JsonResponse
    {
        try {
            DB::beginTransaction();
            $caseStudy->delete();
            DB::commit();

            return response()->json([
                'message' => 'Case study deleted successfully.',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to delete case study: '.$e->getMessage());

            return response()->json([
                'message' => 'An error occurred while deleting the case study.',
            ], 500);
        }
    }

    public function togglePublish(CaseStudy $caseStudy): JsonResponse
    {
        try {
            DB::beginTransaction();
            $caseStudy->update([
                'is_published' => ! $caseStudy->is_published,
            ]);
            DB::commit();

            return response()->json([
                'message' => $caseStudy->is_published ? 'Case study published.' : 'Case study unpublished.',
                'data' => $caseStudy,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to toggle case study status: '.$e->getMessage());

            return response()->json([
                'message' => 'An error occurred while updating status.',
            ], 500);
        }
    }
}
