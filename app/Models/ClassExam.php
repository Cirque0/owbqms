<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ClassExam extends Pivot
{
    protected $table = 'class_exam';
    
    protected $fillable = [
        'class_id',
        'exam_id',
        'passing_score',
        'exam_period',
        'is_answers_shown',
        'opened_at',
        'closed_at',
    ];

    protected $appends = [
        'is_open',
    ];

    protected $casts = [
        'opened_at' => 'datetime',
        'closed_at' => 'datetime',
    ];

    public function isOpen(): Attribute
    {
        return new Attribute(function ($value, $attributes) {
            if(!$attributes['opened_at'] || !$attributes['closed_at']) {
                return false;
            }

            $now_time = time();
            $opened_time = strtotime($attributes['opened_at']);
            $closed_time = strtotime($attributes['closed_at']);

            if($now_time < $opened_time || $now_time >= $closed_time) {
                return false;
            }

            return true;
        });
    }

    public function assigned_class(): BelongsTo
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }
    
    public function student_exams(): HasMany
    {
        return $this->hasMany(StudentExam::class);
    }
}
