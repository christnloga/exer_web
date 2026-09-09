<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workshop extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'description',
        'cover_image_url',
        'start_date',
        'end_date',
        'number_of_sessions',
        'max_applicants',
        'application_deadline',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'application_deadline' => 'datetime',
        'number_of_sessions' => 'integer',
        'max_applicants' => 'integer',
    ];

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * All applications submitted for this workshop.
     */
    public function applicants(): HasMany
    {
        return $this->hasMany(WorkshopApplicant::class);
    }

    /**
     * Scope a query to only include published workshops.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Whether the workshop is currently accepting applications.
     */
    public function isRegistrationOpen(): bool
    {
        if ($this->status !== 'published') {
            return false;
        }

        if ($this->application_deadline && $this->application_deadline->isPast()) {
            return false;
        }

        if ($this->isFull()) {
            return false;
        }

        return true;
    }

    /**
     * Whether the workshop has reached its maximum number of applicants.
     */
    public function isFull(): bool
    {
        if (! $this->max_applicants) {
            return false;
        }

        return $this->applicants()->count() >= $this->max_applicants;
    }

    /**
     * The number of remaining places (null if unlimited).
     */
    public function remainingPlaces(): ?int
    {
        if (! $this->max_applicants) {
            return null;
        }

        return max(0, $this->max_applicants - $this->applicants()->count());
    }
}
