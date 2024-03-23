<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class StudentExam extends Pivot
{
    public $incrementing = true;
    
    protected $fillable = [
        'student_id',
        'class_exam_id',
        'score',
    ];

    protected $appends = [
        'is_passed',
    ];

    public function isPassed(): Attribute
    {
        return new Attribute(
            fn () => (($this->score / $this->class_exam->exam->questions_count) * 100) > $this->class_exam->passing_score
        );
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function class_exam(): BelongsTo
    {
        return $this->belongsTo(ClassExam::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(QuestionAnswer::class, 'student_exam_id');
    }
}
