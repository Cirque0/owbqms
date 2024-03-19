<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassExamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->roles()->where('roles.name', 'faculty')->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'class_id' => ['required', 'uuid', 'exists:classes,id'],
            // 'exam_id' => ['required', 'integer', 'exists:exams,id'],
            'passing_score' => ['required', 'integer', 'gt:0', 'lte:100'],
            'exam_period' => ['required', 'integer', 'gt:0'],
        ];
    }
}
