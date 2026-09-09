<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'city',
        'university',
        'graduation_year',
        'discipline',
        'portfolio_url',
        'github_url',
        'stack',
        'mindset_answer_1',
        'mindset_answer_2',
        'mindset_answer_3',
        'status', // e.g., 'pending', 'shortlisted', 'accepted', 'rejected'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'graduation_year' => 'integer',
    ];

    /**
     * Boot the model to set default values.
     */
    protected static function booted(): void
    {
        static::creating(function (Applicant $applicant) {
            if (empty($applicant->status)) {
                $applicant->status = 'pending';
            }
        });
    }

    /**
     * Get the student record associated with the applicant (if accepted).
     */
    public function student()
    {
        return $this->hasOne(Student::class);
    }
}
