<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'type',
        'subject_id',
        'instructor_id',
    ];

    protected $appends = [
        'questions_count',
    ];

    public function questionsCount(): Attribute
    {
        return new Attribute(
            fn() => $this->questions()->count()
        );
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function classes(): BelongsToMany
    {
        return $this->belongsToMany(ClassModel::class, 'class_exam', 'exam_id', 'class_id')
            ->withPivot(
                'passing_score',
                'exam_period',
                'is_answers_shown',
                'opened_at',
                'closed_at',
            )
            ->using(ClassExam::class);
    }

    public function student_exams(): HasManyThrough
    {
        return $this->hasManyThrough(StudentExam::class, ClassExam::class, 'exam_id', 'class_exam_id');
    }
}
