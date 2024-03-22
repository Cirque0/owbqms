<?php

namespace App\Models;

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
