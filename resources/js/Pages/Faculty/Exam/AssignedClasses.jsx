import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head, Link } from "@inertiajs/react";
import { useRef, useState } from "react";
import AssignClassModal from "./Partials/AssignClassModal";
import UnassignClassModal from "./Partials/UnassignClassModal";
import UpdateAssignedModal from "./Partials/UpdateAssignedModal";
import OpenAssignedModal from "./Partials/OpenAssignedModal";
import CloseAssignedModal from "./Partials/CloseAssignedModal";

export default function AssignedClasses({ auth, exam, classes }) {
    const [selectedClass, setSelectedClass] = useState(null);
    const assignModalRef = useRef(null);
    const unassignModalRef = useRef(null);
    const updateModalRef = useRef(null);
    const openModalRef = useRef(null);
    const closeModalRef = useRef(null);

    const showUnassignModal = (classModel) => {
        setSelectedClass(classModel);
        unassignModalRef.current.showModal();
    };

    const showUpdateModal = (classModel) => {
        setSelectedClass(classModel);
        updateModalRef.current.showModal();
    };

    const showOpenModal = (classModel) => {
        setSelectedClass(classModel);
        openModalRef.current.showModal();
    };

    const showCloseModal = (classModel) => {
        setSelectedClass(classModel);
        closeModalRef.current.showModal();
    };

    return (
        <>
            <Head title={`${exam.title} (${exam.subject.name}) / Faculty`} />
            <FacultyLayout user={auth.user}>
                <ExamLayout exam={exam}>
                    <div className="mt-4 card w-full bg-gray-100">
                        <div className="card-body">
                            <div className="flex sm:flex-row flex-col sm:justify-between items-baseline">
                                <h2 className="card-title">Assigned Classes</h2>
                                <div className="mt-4 flex">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() =>
                                            assignModalRef.current.showModal()
                                        }
                                    >
                                        <i className="bi bi-plus-lg"></i>
                                        Assign Exam
                                    </button>
                                </div>
                            </div>
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
                                    {exam.classes.length ? (
                                        exam.classes.map((classModel) => (
                                            <tr key={classModel.id}>
                                                <td>
                                                    <div className="flex md:flex-col gap-2 md:justify-normal justify-between items-baseline">
                                                        <Link
                                                            href={route(
                                                                "faculty.classes.show",
                                                                {
                                                                    class: classModel.id,
                                                                }
                                                            )}
                                                            className="font-bold text-maroon"
                                                        >
                                                            {
                                                                classModel
                                                                    .section
                                                                    .name
                                                            }
                                                        </Link>
                                                        {classModel.pivot
                                                            .is_open ? (
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
                                                                    classModel
                                                                        .pivot
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
                                                                    classModel
                                                                        .pivot
                                                                        .exam_period
                                                                }{" "}
                                                                mins
                                                            </span>
                                                        </div>
                                                        {classModel.pivot
                                                            .opened_at &&
                                                            classModel.pivot
                                                                .closed_at && (
                                                                <>
                                                                    <div className="flex justify-between">
                                                                        <span className="font-bold">
                                                                            Open
                                                                            from
                                                                        </span>
                                                                        <span>
                                                                            {new Date(
                                                                                classModel.pivot.opened_at
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
                                                                                classModel.pivot.closed_at
                                                                            ).toLocaleString(
                                                                                "en-PH"
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </>
                                                            )}
                                                    </div>
                                                    <div className="md:hidden mt-4 join w-full">
                                                        {classModel.pivot
                                                            .is_open ? (
                                                            <button
                                                                className="join-item btn btn-sm btn-primary grow"
                                                                onClick={() =>
                                                                    showCloseModal(
                                                                        classModel
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
                                                                        classModel
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
                                                                                classModel
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
                                                                                classModel
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
                                                                    classModel
                                                                        .pivot
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
                                                                    classModel
                                                                        .pivot
                                                                        .exam_period
                                                                }{" "}
                                                                mins
                                                            </span>
                                                        </div>
                                                        {classModel.pivot
                                                            .opened_at &&
                                                            classModel.pivot
                                                                .closed_at && (
                                                                <>
                                                                    <div className="flex justify-between">
                                                                        <span className="font-bold">
                                                                            Open
                                                                            from
                                                                        </span>
                                                                        <span>
                                                                            {new Date(
                                                                                classModel.pivot.opened_at
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
                                                                                classModel.pivot.closed_at
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
                                                        {classModel.pivot
                                                            .is_open ? (
                                                            <button
                                                                className="join-item btn btn-sm btn-primary"
                                                                onClick={() =>
                                                                    showCloseModal(
                                                                        classModel
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
                                                                        classModel
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
                                                                                classModel
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
                                                                                classModel
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
                                                            There are no classes
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
                </ExamLayout>

                <AssignClassModal
                    ref={assignModalRef}
                    exam={exam}
                    classes={classes}
                />

                <UnassignClassModal
                    ref={unassignModalRef}
                    exam={exam}
                    classModel={selectedClass}
                />

                <UpdateAssignedModal
                    ref={updateModalRef}
                    exam={exam}
                    classModel={selectedClass}
                    pivot={selectedClass?.pivot}
                />

                <OpenAssignedModal
                    ref={openModalRef}
                    exam={exam}
                    classModel={selectedClass}
                    pivot={selectedClass?.pivot}
                />

                <CloseAssignedModal
                    ref={closeModalRef}
                    exam={exam}
                    classModel={selectedClass}
                    pivot={selectedClass?.pivot}
                />
            </FacultyLayout>
        </>
    );
}
