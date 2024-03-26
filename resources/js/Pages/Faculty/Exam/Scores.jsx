import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { router } from "@inertiajs/react";

export default function Scores({ auth, searchParams, exam, student_exams }) {
    const changeSection = (e) => {
        router.get(
            route("faculty.exams.scores", {
                exam: exam.id,
                class: e.target.value,
            })
        );
    };

    return (
        <FacultyLayout user={auth.user}>
            <ExamLayout exam={exam}>
                <div className="mt-4 card bg-gray-100">
                    <div className="card-body">
                        <div className="flex justify-between items-baseline">
                            <h2 className="card-title">Scores</h2>
                            <select
                                className="select select-sm select-bordered grow sm:max-w-40 max-w-32"
                                onChange={changeSection}
                            >
                                {exam.classes.map((classModel) => (
                                    <option
                                        key={classModel.id}
                                        value={classModel.id}
                                        selected={
                                            searchParams.class === classModel.id
                                        }
                                    >
                                        {classModel.section.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody className="font-medium">
                                {student_exams.length ? (
                                    student_exams.map((student_exam) => (
                                        <tr>
                                            <td>
                                                <div>
                                                    <p className="font-bold">{student_exam.student.profile.full_name}</p>
                                                    <p className="font-bold text-gray-400">{student_exam.student.username}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <p className="font-bold">{((student_exam.score / exam.questions_count) * 100).toFixed(2)} %</p>
                                                    <p>{student_exam.score} / {exam.questions_count}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* {JSON.stringify(student_exams)} */}
            </ExamLayout>
        </FacultyLayout>
    );
}
