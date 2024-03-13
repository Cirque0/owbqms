import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head } from "@inertiajs/react";
import { useRef, useState } from "react";
import AssignClassModal from "./Partials/AssignClassModal";
import UnassignClassModal from "./Partials/UnassignClassModal";

export default function AssignedClasses({ auth, exam, classes }) {
    const [selectedClass, setSelectedClass] = useState(null);
    const assignModalRef = useRef(null);
    const unassignModalRef = useRef(null);

    const openUnassignModal = (classModel) => {
        setSelectedClass(classModel);
        unassignModalRef.current.showModal();
    }

    return (
        <>
            <Head title={`${exam.title} (${exam.subject.name}) / Faculty`} />
            <FacultyLayout user={auth.user}>
                <ExamLayout exam={exam}>
                    <div className="mt-4 card w-full bg-gray-100">
                        <div className="card-body">
                            <div className="flex justify-between items-baseline">
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
                                        <th>Specifications</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div>
                                                <p className="font-bold">
                                                    BSIT 4-1N
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-xs max-w-40">
                                                <div className="flex justify-between">
                                                    <span className="font-bold">
                                                        Passing Score
                                                    </span>
                                                    <span>75%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-bold">
                                                        Exam Period
                                                    </span>
                                                    <span>60 mins</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {/* <span className="badge badge-error text-white">Closed</span> */}
                                                <span className="text-xs font-bold">
                                                    Open until
                                                </span>
                                                <p className="">
                                                    2024-03-11 19:00
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-circle btn-ghost">
                                                <i className="bi bi-three-dots-vertical"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    {exam.classes.length &&
                                        exam.classes.map((classModel) => (
                                            <tr>
                                                <td>
                                                    <div>
                                                        <p className="font-bold">
                                                            {
                                                                classModel
                                                                    .section
                                                                    .name
                                                            }
                                                        </p>
                                                        {/* <p className="font-medium">
                                                            Web Development
                                                        </p> */}
                                                    </div>
                                                </td>
                                                <td>
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
                                                <td>
                                                    <div>
                                                        {classModel.pivot
                                                            .opened_at ? (
                                                            <>
                                                                <span className="text-xs font-bold">
                                                                    Open until
                                                                </span>
                                                                <p className="">
                                                                    {
                                                                        classModel
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
                                                                    <a>
                                                                        <i className="bi bi-gear"></i>
                                                                        Settings
                                                                    </a>
                                                                </li>
                                                                <li className="text-error">
                                                                    <button onClick={() => openUnassignModal(classModel)}>
                                                                        <i className="bi bi-x-lg"></i>
                                                                        Unassign
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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
            </FacultyLayout>
        </>
    );
}
