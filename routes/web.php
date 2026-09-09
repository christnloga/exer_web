<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Dashboard\ContactMessageController;
use App\Http\Controllers\Dashboard\WorkshopApplicationController;
use App\Http\Controllers\WorkshopController;
use App\Http\Middleware\SetLocale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function (Request $request) {
    $locale = $request->getPreferredLanguage(['en', 'fr']) ?? 'fr';

    return redirect("/{$locale}");
});

Route::group([
    'prefix' => '{locale}',
    'where' => ['locale' => 'en|fr'],
    'middleware' => [SetLocale::class],
], function () {
    Route::inertia('/', 'Home')->name('home');

    Route::inertia('/about', 'About')->name('page.about');
    Route::inertia('/initiatives/now-just-create', 'njc/Landing')->name('page.njc.landing');
    Route::get('/initiatives/now-just-create/apply', [ApplicantController::class, 'create'])->name('page.njc.apply');
    Route::post('/initiatives/now-just-create/apply', [ApplicantController::class, 'store'])->name('apply.store');
    Route::get('/initiatives/now-just-create/apply/success', [ApplicantController::class, 'success'])->name('apply.success');
    Route::get('/case-studies/{caseStudy}', [\App\Http\Controllers\CaseStudyController::class, 'show'])->name('case-study.show');
    Route::get('/workshops/{workshop:slug}', [WorkshopController::class, 'show'])->name('workshop.show');
    Route::get('/workshops/{workshop:slug}/apply', [WorkshopController::class, 'create'])->name('workshop.apply');
    Route::post('/workshops/{workshop:slug}/apply', [WorkshopController::class, 'store'])->name('workshop.apply.store');
    Route::get('/workshops/{workshop:slug}/apply/success', [WorkshopController::class, 'success'])->name('workshop.apply.success');
    Route::inertia('/contact', 'Contact')->name('page.contact');
    Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

    Route::middleware(['auth'])->prefix('account')->group(function () {
        Route::middleware(['verified'])->group(function () {
            Route::inertia('dashboard', 'dashboard/overview')->name('dashboard');
            Route::inertia('pipeline', 'dashboard/pipeline')->name('dashboard.pipeline');
            Route::inertia('teams', 'dashboard/teams')->name('dashboard.teams');
            Route::inertia('projects', 'dashboard/projects')->name('dashboard.projects');
            Route::get('case-studies', [\App\Http\Controllers\Dashboard\CaseStudyController::class, 'index'])->name('dashboard.case-studies');
            Route::get('case-studies/create', [\App\Http\Controllers\Dashboard\CaseStudyController::class, 'create'])->name('dashboard.case-studies.create');
            Route::get('case-studies/{caseStudy}/edit', [\App\Http\Controllers\Dashboard\CaseStudyController::class, 'edit'])->name('dashboard.case-studies.edit');
            Route::get('messages', [ContactMessageController::class, 'index'])->name('dashboard.messages');
            Route::delete('messages/{contactMessage}', [ContactMessageController::class, 'destroy'])->name('dashboard.messages.destroy');
            Route::patch('messages/{contactMessage}/toggle-read', [ContactMessageController::class, 'toggleRead'])->name('dashboard.messages.toggle-read');
            Route::get('workshops', [WorkshopApplicationController::class, 'index'])->name('dashboard.workshops');
        });

        require __DIR__.'/settings.php';
    });
});
