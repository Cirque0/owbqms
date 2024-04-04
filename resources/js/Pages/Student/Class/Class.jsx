import ClassLayout from "@/Pages/Student/Class/ClassLayout";
import StudentLayout from "@/Layouts/StudentLayout";
import { Link } from "@inertiajs/react";

export default function Class({ auth, classModel }) {
    return (
        <StudentLayout user={auth.user}>
            <ClassLayout classModel={classModel}>
                <div className="mt-8 card bg-gray-100">
                    <div className="card-body">
                        <h2 className="card-title">Assigned Exams</h2>
                        <table className="table">
                            <tbody>
                                {classModel.exams.length ? (
                                    classModel.exams.map((exam) => (
                                        <tr>
                                            <td>
                                                <div>
                                                    <div className="w-full flex md:flex-row flex-col-reverse justify-between gap-2">
                                                        <Link
                                                            href={route(
                                                                "student.classes.exams.show",
                                                                {
                                                                    class: classModel.id,
                                                                    exam: exam.id,
                                                                }
                                                            )}
                                                            className="text-lg font-bold text-maroon"
                                                        >
                                                            <span className="badge badge-lg badge-primary">
                                                                {exam.type}
                                                            </span>{" "}
                                                            {exam.title}
                                                        </Link>
                                                        <div className="flex gap-2">
                                                            {exam.pivot
                                                                .is_open ? (
                                                                <span className="badge badge-success text-white font-bold">
                                                                    Open
                                                                </span>
                                                            ) : exam.pivot
                                                                  .opened_at ? (
                                                                <span className="badge badge-error text-white font-bold">
                                                                    Closed
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-warning font-bold">
                                                                    Upcoming
                                                                </span>
                                                            )}
                                                            {exam.student_exams
                                                                .length > 0 && (
                                                                <span className="badge badge-info font-bold">
                                                                    {/* Submitted */}
                                                                    Score:{" "}
                                                                    {
                                                                        exam
                                                                            .student_exams[0]
                                                                            .score
                                                                    }{" "}
                                                                    /{" "}
                                                                    {
                                                                        exam.questions_count
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="sm:text-base text-sm">
                                                        {exam.pivot
                                                            .closed_at ? (
                                                            <p>
                                                                {exam.pivot
                                                                    .is_open
                                                                    ? "Closing"
                                                                    : "Closed"}{" "}
                                                                at{" "}
                                                                <span className="font-bold">
                                                                    {new Date(
                                                                        exam.pivot.closed_at
                                                                    ).toLocaleString(
                                                                        "en-PH"
                                                                    )}
                                                                </span>
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                Exam is not
                                                                open, yet.
                                                            </p>
                                                        )}
                                                        <p>
                                                            Score{" "}
                                                            <span className="font-bold">
                                                                {
                                                                    exam.pivot
                                                                        .passing_score
                                                                }
                                                                %
                                                            </span>{" "}
                                                            out of{" "}
                                                            <span className="font-bold">
                                                                {
                                                                    exam.questions_count
                                                                }{" "}
                                                                {exam.questions_count >
                                                                1
                                                                    ? "questions"
                                                                    : "question"}
                                                            </span>{" "}
                                                            within{" "}
                                                            <span className="font-bold">
                                                                {
                                                                    exam.pivot
                                                                        .exam_period
                                                                }{" "}
                                                                minutes
                                                            </span>{" "}
                                                            to pass.
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="grow flex justify-center items-center">
                                                <div className="flex items-center gap-2 sm:text-base text-gray-500">
                                                    <i className="bi bi-journal-text text-xl"></i>
                                                    <h2 className="font-bold">
                                                        There are no exams
                                                        assigned.
                                                    </h2>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ClassLayout>
        </StudentLayout>
    );
}
