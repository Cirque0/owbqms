<?php

namespace App\Exports;

use App\Models\ClassModel;
use App\Models\UserProfile;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ClassGradesExport implements FromCollection, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    protected $model;

    public function __construct(ClassModel $class)
    {
        $this->model = $class;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->model->students()->orderBy(
            UserProfile::select('last_name')
                ->whereColumn('user_id', 'users.id')
                ->limit(1)
        )->get();
    }

    public function map($row): array
    {
        return array_merge(
            [
                $row->username,
                $row->profile->last_name . ', ' . $row->profile->first_name . ' ' . $row->profile->middle_name,
            ],
            $this->model->exams->map(function ($exam, $key) use ($row) {
                if($answered_exam = $row->answered_exams->firstWhere('class_exam_id', $exam->pivot->id)) {
                    $totalPoints = $answered_exam->class_exam->exam->questions()->sum('points');
                    $totalScorePercent = ($answered_exam->score / ($totalPoints)) * 100;
                    return $answered_exam->score . ' (' . number_format((float)$totalScorePercent, 2, '.', '') . '%)';
                }
                else {
                    return 'No submission';
                }
            })->toArray(),
        );
    }

    public function headings(): array
    {
        return array_merge(
            ['Student No.', 'Student Name'],
            $this->model->exams->map(function ($exam, $key) {
                return $exam->title . ' (' . $exam->questions()->sum('points') . ' pts. - min. ' . $exam->pivot->passing_score . '%)';
            })->toArray(),
        );
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
