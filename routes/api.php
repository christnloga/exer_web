<?php

use App\Http\Controllers\Api\ApplicantController;
use App\Http\Controllers\Api\CaseStudyController;
use App\Http\Controllers\Api\WorkshopApplicantController;
use App\Http\Controllers\Api\WorkshopController;
use Illuminate\Support\Facades\Route;

Route::apiResource('case-studies', CaseStudyController::class)->names('api.case-studies');
Route::patch('/case-studies/{case_study}/publish', [CaseStudyController::class, 'togglePublish'])->name('api.case-studies.publish');
Route::get('/applicants', [ApplicantController::class, 'index'])->name('api.applicants.index');
Route::patch('/applicants/{applicant}/status', [ApplicantController::class, 'updateStatus'])->name('api.applicants.update-status');
Route::get('/workshops', [WorkshopController::class, 'index'])->name('api.workshops.index');
Route::get('/workshop-applicants', [WorkshopApplicantController::class, 'index'])->name('api.workshop-applicants.index');
Route::patch('/workshop-applicants/{workshop_applicant}/status', [WorkshopApplicantController::class, 'updateStatus'])->name('api.workshop-applicants.update-status');
Route::delete('/workshop-applicants/{workshop_applicant}', [WorkshopApplicantController::class, 'destroy'])->name('api.workshop-applicants.destroy');

Route::prefix('admin')->group(function () {
    Route::post('/upload-image', [\App\Http\Controllers\Api\ImageUploadController::class, 'store'])->name('api.admin.upload-image');
});
