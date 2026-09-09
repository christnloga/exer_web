<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkshopApplicant extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'workshop_id',
        // Section 1 — About you
        'full_name',
        'email',
        'phone',
        'linkedin_url',
        'gender',
        'language',
        // Section 2 — Your background
        'background',
        'field_of_study',
        'digital_health_experience',
        // Section 3 — Your interest
        'motivation',
        'interests',
        'previous_project_experience',
        'previous_project_description',
        // Section 4 — Commitment
        'commitment',
        'goals',
        // Final
        'referral_source',
        'consent',
        // Workflow
        'status', // e.g., 'pending', 'shortlisted', 'accepted', 'rejected'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'interests' => 'array',
        'previous_project_experience' => 'boolean',
        'consent' => 'boolean',
    ];

    /**
     * Boot the model to set default values.
     */
    protected static function booted(): void
    {
        static::creating(function (WorkshopApplicant $applicant) {
            if (empty($applicant->status)) {
                $applicant->status = 'pending';
            }
        });
    }

    /**
     * The workshop this application belongs to.
     */
    public function workshop(): BelongsTo
    {
        return $this->belongsTo(Workshop::class);
    }
}
