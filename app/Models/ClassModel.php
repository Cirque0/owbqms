<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ClassModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'classes';

    protected $fillable = [
        'section_id',
        'subject_id',
        'instructor_id',
        'is_registration_open',
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'class_student', 'class_id', 'student_id')
            ->wherePivot('status', 'enrolled');
    }

    public function requests(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'class_student', 'class_id', 'student_id')
            ->wherePivot('status', 'pending');
    }

    public function exams(): BelongsToMany
    {
        return $this->belongsToMany(Exam::class, 'class_exam', 'class_id', 'exam_id')
            ->withPivot(
                'passing_score',
                'exam_period',
                'opened_at',
                'closed_at',
            )
            ->using(ClassExam::class);
    }
}
