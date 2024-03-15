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
                                                        <Link className="text-lg font-bold text-maroon">
                                                            [{exam.type}]{" "}
                                                            {exam.title}
                                                        </Link>
                                                        {exam.pivot.is_open ? (
                                                            <span className="badge badge-success text-white font-bold">
                                                                Open
                                                            </span>
                                                        ) : (
                                                            <span className="badge badge-error text-white font-bold">
                                                                Closed
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm">
                                                        {exam.pivot
                                                            .closed_at ? (
                                                            <p>
                                                                Exam{" "}
                                                                {exam.pivot
                                                                    .is_open
                                                                    ? "will close"
                                                                    : "closed"}{" "}
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
                                                                {exam.questions_count > 1 ? 'questions' : 'question'}
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
                                            <div className="flex justify-center text-center">
                                                There are no exams assigned to
                                                this class, yet.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <div className="mt-8 card bg-gray-100">
                    <div className="card-body">
                        <h2 className="card-title">Enrolled Students</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Birthdate</th>
                                    <th>Contact No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classModel.students.length ? (
                                    classModel.students.map((student) => (
                                        <tr>
                                            <td>
                                                <div>
                                                    <div className="font-bold">
                                                        {
                                                            student.profile
                                                                .full_name
                                                        }
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        {student.username}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {new Date(
                                                    student.birthdate
                                                ).toLocaleDateString("en-us", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td>
                                                {student.profile.contact_num ||
                                                    "No contact number."}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            There are no students enrolled, yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </ClassLayout>
        </StudentLayout>
    );
}
