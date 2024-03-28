import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Link, router } from "@inertiajs/react";

export default function Scores({
    auth,
    searchParams,
    exam,
    examInfo,
    students,
}) {
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
                                    <th className="md:table-cell hidden">
                                        Score
                                    </th>
                                    <th className="md:table-cell hidden"></th>
                                </tr>
                            </thead>
                            <tbody className="font-medium">
                                {students.length ? (
                                    students.map((student) => (
                                        <tr>
                                            <td>
                                                <div>
                                                    <p className="font-bold">
                                                        {
                                                            student.profile
                                                                .full_name
                                                        }
                                                    </p>
                                                    <p className="font-bold text-gray-500">
                                                        {student.username}
                                                    </p>
                                                    <div className="md:hidden flex justify-between items-end mt-2 gap-2 font-bold">
                                                        {student.answered_exams
                                                            .length ? (
                                                            <div className="join">
                                                                <span className="join-item badge font-semibold">
                                                                    {
                                                                        student
                                                                            .answered_exams[0]
                                                                            .score
                                                                    }{" "}
                                                                    /{" "}
                                                                    {
                                                                        exam.questions_count
                                                                    }
                                                                </span>
                                                                <span
                                                                    className={`join-item badge font-bold ${
                                                                        (student
                                                                            .answered_exams[0]
                                                                            .score /
                                                                            exam.questions_count) *
                                                                            100 >
                                                                        examInfo.passing_score
                                                                            ? "badge-success"
                                                                            : "badge-error text-red-100"
                                                                    }`}
                                                                >
                                                                    {(
                                                                        (student
                                                                            .answered_exams[0]
                                                                            .score /
                                                                            exam.questions_count) *
                                                                        100
                                                                    ).toFixed(
                                                                        2
                                                                    )}{" "}
                                                                    %
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <p>
                                                                No submissions
                                                            </p>
                                                        )}
                                                        <Link
                                                            className="md:hidden btn btn-xs btn-primary"
                                                            disabled={
                                                                !student
                                                                    .answered_exams
                                                                    .length
                                                            }
                                                        >
                                                            <i className="bi bi-eye-fill"></i>
                                                            Answers
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="md:table-cell hidden">
                                                <div>
                                                    {student.answered_exams
                                                        .length ? (
                                                        <div className="join">
                                                            <span className="join-item badge font-semibold">
                                                                {
                                                                    student
                                                                        .answered_exams[0]
                                                                        .score
                                                                }{" "}
                                                                /{" "}
                                                                {
                                                                    exam.questions_count
                                                                }
                                                            </span>
                                                            <span
                                                                className={`join-item badge font-bold ${
                                                                    (student
                                                                        .answered_exams[0]
                                                                        .score /
                                                                        exam.questions_count) *
                                                                        100 >
                                                                    examInfo.passing_score
                                                                        ? "badge-success"
                                                                        : "badge-error text-red-100"
                                                                }`}
                                                            >
                                                                {(
                                                                    (student
                                                                        .answered_exams[0]
                                                                        .score /
                                                                        exam.questions_count) *
                                                                    100
                                                                ).toFixed(
                                                                    2
                                                                )}{" "}
                                                                %
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <p>No submissions</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="md:table-cell hidden">
                                                <div className="flex justify-end">
                                                    <Link
                                                        href={
                                                            student.answered_exams.length
                                                                ? route("faculty.exams.scores.show", {
                                                                    exam: exam.id,
                                                                    student_exam: student.answered_exams[0].id,
                                                                })
                                                                : "#"
                                                        }
                                                        className="btn btn-sm btn-primary"
                                                        disabled={
                                                            !student.answered_exams
                                                                .length
                                                        }
                                                    >
                                                        <i className="bi bi-eye-fill"></i>
                                                        Answers
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3}>
                                            <p className="text-center font-semibold">
                                                No students found.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* {JSON.stringify(student_exams)} */}
            </ExamLayout>
        </FacultyLayout>
    );
}
