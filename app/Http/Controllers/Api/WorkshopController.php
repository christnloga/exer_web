<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Workshop;
use Illuminate\Http\JsonResponse;

class WorkshopController extends Controller
{
    /**
     * Display a listing of the workshops.
     */
    public function index(): JsonResponse
    {
        return response()->json(
            Workshop::withCount('applicants')
                ->orderBy('created_at', 'desc')
                ->get()
        );
    }
}
