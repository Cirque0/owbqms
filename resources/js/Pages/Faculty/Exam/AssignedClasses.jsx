import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head, Link } from "@inertiajs/react";
import { useRef, useState } from "react";
import AssignClassModal from "./Partials/AssignClassModal";
import UnassignClassModal from "./Partials/UnassignClassModal";
import UpdateAssignedModal from "./Partials/UpdateAssignedModal";

export default function AssignedClasses({ auth, exam, classes }) {
    const [selectedClass, setSelectedClass] = useState(null);
    const assignModalRef = useRef(null);
    const unassignModalRef = useRef(null);
    const updateModalRef = useRef(null);

    const openUnassignModal = (classModel) => {
        setSelectedClass(classModel);
        unassignModalRef.current.showModal();
    };

    const openUpdateModal = (classModel) => {
        setSelectedClass(classModel);
        updateModalRef.current.showModal();
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
                                <div className="flex">
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
                                        <th className="md:table-cell hidden">Exam Information</th>
                                        <th className="md:table-cell hidden"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exam.classes.length > 0 ? (
                                        exam.classes.map((classModel) => (
                                            <tr key={classModel.id}>
                                                <td>
                                                    <div className="flex gap-2 md:justify-normal justify-between items-baseline">
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
                                                        <div className="badge badge-sm badge-error text-white">Closed</div>
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
                                                    </div>
                                                    <div className="md:hidden mt-4 join w-full">
                                                        <button className="join-item btn btn-sm btn-primary grow">
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
                                                                            openUnassignModal(
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
                                                    <div className="text-xs max-w-40">
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
                                                    </div>
                                                </td>
                                                <td className="md:flex hidden justify-end">
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
                                                                            openUnassignModal(
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
                                                <div className="flex justify-center text-center">
                                                    There are no classes assigned
                                                    to this exam, yet.
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
            </FacultyLayout>
        </>
    );
}
