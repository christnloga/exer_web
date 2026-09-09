<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Applicant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApplicantController extends Controller
{
    /**
     * Display a listing of the applicants.
     */
    public function index(): JsonResponse
    {
        return response()->json(
            Applicant::orderBy('created_at', 'desc')->get()
        );
    }

    /**
     * Update the status of the specified applicant.
     */
    public function updateStatus(Request $request, Applicant $applicant): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,shortlisted,accepted,rejected',
        ]);

        $applicant->update([
            'status' => $validated['status'],
        ]);

        return response()->json($applicant);
    }
}
