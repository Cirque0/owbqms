import ClassLayout from "@/Layouts/ClassLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head, Link } from "@inertiajs/react";
import { useRef, useState } from "react";
import UnassignClassModal from "../Exam/Partials/UnassignClassModal";
import UpdateAssignedModal from "../Exam/Partials/UpdateAssignedModal";

export default function ClassExams({ auth, classModel }) {
    const [selectedExam, setSelectedExam] = useState(null);
    const assignModalRef = useRef(null);
    const unassignModalRef = useRef(null);
    const updateModalRef = useRef(null);

    const openUnassignModal = (exam) => {
        setSelectedExam(exam);
        unassignModalRef.current.showModal();
    };

    const openUpdateModal = (exam) => {
        setSelectedExam(exam);
        updateModalRef.current.showModal();
    };

    return (
        <>
            <FacultyLayout user={auth.user}>
                <ClassLayout classModel={classModel}>
                    <div className="mt-8 card bg-gray-100">
                        <div className="card-body">
                            <h2 className="card-title">
                                Assigned Examinations
                            </h2>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Exam</th>
                                        <th>Specifications</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classModel.exams.length > 0 ? (
                                        classModel.exams.map((exam) => (
                                            <tr key={exam.id}>
                                                <td>
                                                    <Link
                                                        href={route(
                                                            "faculty.exams.show",
                                                            {
                                                                exam: exam.id,
                                                            }
                                                        )}
                                                    >
                                                        <p className="font-bold text-maroon">
                                                            {exam.title}
                                                        </p>
                                                        <p className="text-xs font-bold">
                                                            {exam.type}
                                                        </p>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <div className="text-xs max-w-40">
                                                        <div className="flex justify-between">
                                                            <span className="font-bold">
                                                                Passing Score
                                                            </span>
                                                            <span>
                                                                {
                                                                    exam.pivot
                                                                        .passing_score
                                                                }
                                                                %
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="font-bold">
                                                                Exam Period
                                                            </span>
                                                            <span>
                                                                {
                                                                    exam.pivot
                                                                        .exam_period
                                                                }{" "}
                                                                mins
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        {exam.pivot
                                                            .opened_at ? (
                                                            <>
                                                                <span className="text-xs font-bold">
                                                                    Open until
                                                                </span>
                                                                <p className="">
                                                                    {
                                                                        exam
                                                                            .pivot
                                                                            .closed_at
                                                                    }
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <span className="badge badge-error text-white">
                                                                Closed
                                                            </span>
                                                        )}
                                                        {/* <span className="badge badge-error text-white">Closed</span> */}
                                                    </div>
                                                </td>
                                                <td className="flex justify-end">
                                                    <div className="join">
                                                        <button className="join-item btn btn-sm btn-primary">
                                                            Open exam
                                                        </button>
                                                        <div className="join-item dropdown dropdown-end bg-maroon">
                                                            <div
                                                                tabIndex={0}
                                                                role="button"
                                                                className="btn btn-sm btn-primary"
                                                            >
                                                                <i className="bi bi-chevron-down"></i>
                                                            </div>
                                                            <ul
                                                                tabIndex={0}
                                                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max"
                                                            >
                                                                <li>
                                                                    <button
                                                                        onClick={() =>
                                                                            openUpdateModal(
                                                                                exam
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="bi bi-gear"></i>
                                                                        Settings
                                                                    </button>
                                                                </li>
                                                                <li className="text-error">
                                                                    <button
                                                                        onClick={() =>
                                                                            openUnassignModal(
                                                                                exam
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="bi bi-x-lg"></i>
                                                                        Unassign
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4}>
                                                <div className="flex justify-center text-center">
                                                    There are no exams assigned
                                                    to this class, yet.
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ClassLayout>

                <UnassignClassModal
                    ref={unassignModalRef}
                    exam={selectedExam}
                    classModel={classModel}
                />

                <UpdateAssignedModal
                    ref={updateModalRef}
                    exam={selectedExam}
                    classModel={classModel}
                    pivot={selectedExam?.pivot}
                />
            </FacultyLayout>
        </>
    );
}
