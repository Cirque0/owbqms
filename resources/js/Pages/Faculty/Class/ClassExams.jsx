import ClassLayout from "@/Pages/Faculty/Class/ClassLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head, Link } from "@inertiajs/react";
import { useRef, useState } from "react";
import UnassignClassModal from "../Exam/Partials/UnassignClassModal";
import UpdateAssignedModal from "../Exam/Partials/UpdateAssignedModal";
import OpenAssignedModal from "../Exam/Partials/OpenAssignedModal";
import CloseAssignedModal from "../Exam/Partials/CloseAssignedModal";

export default function ClassExams({ auth, classModel }) {
    const [selectedExam, setSelectedExam] = useState(null);
    const assignModalRef = useRef(null);
    const unassignModalRef = useRef(null);
    const updateModalRef = useRef(null);
    const openModalRef = useRef(null);
    const closeModalRef = useRef(null);

    const showUnassignModal = (exam) => {
        setSelectedExam(exam);
        unassignModalRef.current.showModal();
    };

    const showUpdateModal = (exam) => {
        setSelectedExam(exam);
        updateModalRef.current.showModal();
    };

    const showOpenModal = (exam) => {
        setSelectedExam(exam);
        openModalRef.current.showModal();
    };

    const showCloseModal = (exam) => {
        setSelectedExam(exam);
        closeModalRef.current.showModal();
    };

    return (
        <>
            <FacultyLayout user={auth.user} title={`Exams / [${classModel.section.name}] ${classModel.subject.name}`}>
                <ClassLayout classModel={classModel}>
                    <div className="mt-8 card bg-gray-100">
                        <div className="card-body">
                            <h2 className="card-title">
                                Assigned Examinations
                            </h2>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Class</th>
                                        <th className="md:table-cell hidden">
                                            Exam Information
                                        </th>
                                        <th className="md:table-cell hidden"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classModel.exams.length ? (
                                        classModel.exams.map((exam) => (
                                            <tr key={exam.id}>
                                                <td>
                                                    <div className="flex md:flex-col gap-2 md:justify-normal justify-between items-baseline">
                                                        <Link
                                                            href={route(
                                                                "faculty.exams.show",
                                                                {
                                                                    exam: exam.id,
                                                                }
                                                            )}
                                                            className="font-bold text-maroon"
                                                        >
                                                            {exam.title}
                                                        </Link>
                                                        {exam.pivot.is_open ? (
                                                            <div className="badge badge-sm badge-success">
                                                                Open
                                                            </div>
                                                        ) : (
                                                            <div className="badge badge-sm badge-error text-white">
                                                                Closed
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="md:hidden mt-2 text-xs">
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
                                                        {exam.pivot.opened_at &&
                                                            exam.pivot
                                                                .closed_at && (
                                                                <>
                                                                    <div className="flex justify-between">
                                                                        <span className="font-bold">
                                                                            Open
                                                                            from
                                                                        </span>
                                                                        <span>
                                                                            {new Date(
                                                                                exam.pivot.opened_at
                                                                            ).toLocaleString(
                                                                                "en-PH"
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="font-bold">
                                                                            Open
                                                                            until
                                                                        </span>
                                                                        <span>
                                                                            {new Date(
                                                                                exam.pivot.closed_at
                                                                            ).toLocaleString(
                                                                                "en-PH"
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </>
                                                            )}
                                                    </div>
                                                    <div className="md:hidden mt-4 join w-full">
                                                        {exam.pivot.is_open ? (
                                                            <button
                                                                className="join-item btn btn-sm btn-primary grow"
                                                                onClick={() =>
                                                                    showCloseModal(
                                                                        exam
                                                                    )
                                                                }
                                                            >
                                                                Close exam
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="join-item btn btn-sm btn-primary grow"
                                                                onClick={() =>
                                                                    showOpenModal(
                                                                        exam
                                                                    )
                                                                }
                                                            >
                                                                Open exam
                                                            </button>
                                                        )}
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
                                                                            showUpdateModal(
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
                                                                            showUnassignModal(
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
                                                <td className="md:table-cell hidden">
                                                    <div className="text-xs">
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
                                                        {exam.pivot.opened_at &&
                                                            exam.pivot
                                                                .closed_at && (
                                                                <>
                                                                    <div className="flex justify-between">
                                                                        <span className="font-bold">
                                                                            Open
                                                                            from
                                                                        </span>
                                                                        <span>
                                                                            {new Date(
                                                                                exam.pivot.opened_at
                                                                            ).toLocaleString(
                                                                                "en-PH"
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="font-bold">
                                                                            Open
                                                                            until
                                                                        </span>
                                                                        <span>
                                                                            {new Date(
                                                                                exam.pivot.closed_at
                                                                            ).toLocaleString(
                                                                                "en-PH"
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </>
                                                            )}
                                                    </div>
                                                </td>
                                                <td className="md:flex hidden justify-end">
                                                    <div className="join">
                                                        {exam.pivot.is_open ? (
                                                            <button
                                                                className="join-item btn btn-sm btn-primary"
                                                                onClick={() =>
                                                                    showCloseModal(
                                                                        exam
                                                                    )
                                                                }
                                                            >
                                                                Close exam
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="join-item btn btn-sm btn-primary"
                                                                onClick={() =>
                                                                    showOpenModal(
                                                                        exam
                                                                    )
                                                                }
                                                            >
                                                                Open exam
                                                            </button>
                                                        )}
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
                                                                            showUpdateModal(
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
                                                                            showUnassignModal(
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
                                                <div className="grow flex justify-center items-center">
                                                    <div className="flex items-center gap-2 sm:text-base text-gray-500">
                                                        <i className="bi bi-journal-text text-xl"></i>
                                                        <h2 className="font-bold">
                                                            There are no exams assigned.
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

                <OpenAssignedModal
                    ref={openModalRef}
                    exam={selectedExam}
                    classModel={classModel}
                    pivot={selectedExam?.pivot}
                />

                <CloseAssignedModal
                    ref={closeModalRef}
                    exam={selectedExam}
                    classModel={classModel}
                    pivot={selectedExam?.pivot}
                />
            </FacultyLayout>
        </>
    );
}
