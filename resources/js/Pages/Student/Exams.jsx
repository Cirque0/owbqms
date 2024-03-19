import StudentLayout from "@/Layouts/StudentLayout";
import { Head, Link } from "@inertiajs/react";

export default function Exams({ auth, closedClassExams, ongoingClassExams }) {
    return (
        <>
            <Head title="Exams \ Student" />
            <StudentLayout user={auth.user}>
                <div className="grow flex gap-8">
                    <div className="grow max-w-3xl">
                        <div className="flex justify-between items-baseline">
                            <h2 className="font-bold text-2xl">Your Exams</h2>
                        </div>

                        <div className="mt-4 card bg-gray-100">
                            <div className="card-body">
                                <h2 className="card-title">Ongoing Exams</h2>

                                <ExamsTable
                                    classExams={ongoingClassExams}
                                    emptyMessage="There are no open exams right now."
                                />
                            </div>
                        </div>

                        <div className="mt-4 card bg-gray-100">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Upcoming and Past Exams
                                </h2>

                                <ExamsTable
                                    classExams={closedClassExams}
                                    emptyMessage="There are no upcoming or past exams, yet."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </StudentLayout>
        </>
    );
}

function ExamsTable({ classExams = [], emptyMessage = "" }) {
    return (
        <table className="table">
            <tbody>
                {classExams.length ? (
                    classExams.map((classExam) => (
                        <tr>
                            <td>
                                <div>
                                    <div className="w-full flex md:flex-row flex-col-reverse justify-between gap-2">
                                        <Link
                                            href={route(
                                                "student.classes.exams.show",
                                                {
                                                    class: classExam
                                                        .assigned_class.id,
                                                    exam: classExam.exam.id,
                                                }
                                            )}
                                            className="text-lg font-bold text-maroon"
                                        >
                                            [{classExam.exam.type}]{" "}
                                            {classExam.exam.title}
                                        </Link>
                                        {classExam.is_open ? (
                                            <span className="badge badge-success text-white font-bold">
                                                Open
                                            </span>
                                        ) : (
                                            <span className="badge badge-error text-white font-bold">
                                                Closed
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm font-semibold">
                                        <span className="flex gap-2">
                                            <i className="bi bi-mortarboard"></i>{" "}
                                            {
                                                classExam.assigned_class.section
                                                    .name
                                            }{" "}
                                            -{" "}
                                            {
                                                classExam.assigned_class.subject
                                                    .name
                                            }
                                        </span>
                                        <span className="flex gap-2">
                                            <i className="bi bi-person-video3"></i>{" "}
                                            {
                                                classExam.assigned_class
                                                    .instructor.profile
                                                    .full_name
                                            }
                                        </span>
                                    </div>
                                    <div className="text-sm">
                                        {classExam.closed_at ? (
                                            <p>
                                                Exam{" "}
                                                {classExam.is_open
                                                    ? "will close"
                                                    : "closed"}{" "}
                                                at{" "}
                                                <span className="font-bold">
                                                    {new Date(
                                                        classExam.closed_at
                                                    ).toLocaleString("en-PH")}
                                                </span>
                                            </p>
                                        ) : (
                                            <p>Exam is not open, yet.</p>
                                        )}
                                        <p>
                                            Score{" "}
                                            <span className="font-bold">
                                                {classExam.passing_score}%
                                            </span>{" "}
                                            out of{" "}
                                            <span className="font-bold">
                                                {classExam.exam.questions_count}{" "}
                                                {classExam.exam
                                                    .questions_count > 1
                                                    ? "questions"
                                                    : "question"}
                                            </span>{" "}
                                            within{" "}
                                            <span className="font-bold">
                                                {classExam.exam_period} minutes
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
                            <div className="flex justify-center text-center">
                                {emptyMessage}
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
