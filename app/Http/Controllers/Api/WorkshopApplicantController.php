<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WorkshopApplicant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WorkshopApplicantController extends Controller
{
    /**
     * Display a listing of the workshop applicants.
     */
    public function index(): JsonResponse
    {
        return response()->json(
            WorkshopApplicant::with('workshop')
                ->orderBy('created_at', 'desc')
                ->get()
        );
    }

    /**
     * Update the status of the specified applicant.
     */
    public function updateStatus(Request $request, WorkshopApplicant $workshopApplicant): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,shortlisted,accepted,rejected',
        ]);

        $workshopApplicant->update([
            'status' => $validated['status'],
        ]);

        return response()->json($workshopApplicant);
    }

    /**
     * Remove the specified applicant.
     */
    public function destroy(WorkshopApplicant $workshopApplicant): JsonResponse
    {
        $workshopApplicant->delete();

        return response()->json(['message' => 'Applicant removed.'], 204);
    }
}
