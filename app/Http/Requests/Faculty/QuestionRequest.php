<?php

namespace App\Http\Requests\Faculty;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class QuestionRequest extends FormRequest
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
            'type' => [
                'required',
                'string',
                Rule::in(['Identification', 'True or False', 'Fill in the Blanks', 'Multiple Choice'])
            ],
            'description' => ['required', 'string'],
            'choices' => ['exclude_unless:type,Multiple Choice', 'array'],
            'choices.*' => ['string'],
            'answer' => ['required', 'string'],
            'points' => ['required', 'integer', 'gt:0', 'lte:100'],
        ];
    }
}
