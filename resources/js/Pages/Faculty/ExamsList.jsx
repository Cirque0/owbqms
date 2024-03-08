import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head } from "@inertiajs/react";
import CreateExamModal from "./Partials/CreateExamModal";
import { useRef } from "react";

export default function ExamsList({ auth, exams, subjects }) {
    const createExamRef = useRef(null);

    return (
        <>
            <Head title={"Exams / Faculty"} />
            <FacultyLayout user={auth.user}>
                <div className="grow flex gap-8">
                    <div className="grow max-w-4xl">
                        <div className="flex justify-between items-baseline">
                            <h2 className="font-bold text-2xl">Your Exams</h2>
                            <div className="flex">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        createExamRef.current.showModal()
                                    }
                                >
                                    <i className="bi bi-plus-lg"></i>
                                    <span>New Exam</span>
                                </button>
                            </div>
                        </div>

                        <div className="card bg-gray-100 mt-4">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Subject</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exams.length ? (
                                            exams.map((exam) => (
                                                <tr>
                                                    <td className="text-maroon font-bold">{exam.title}</td>
                                                    <td>{exam.subject.name}</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <div
                                                                tabIndex={0}
                                                                role="button"
                                                                className="btn btn-sm btn-circle btn-ghost"
                                                            >
                                                                <i className="bi bi-three-dots-vertical"></i>
                                                            </div>
                                                            <ul
                                                                tabIndex={0}
                                                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                                            >
                                                                <li>
                                                                    <a>Item 1</a>
                                                                </li>
                                                                <li>
                                                                    <a>Item 2</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3}>
                                                    <p className="text-center">
                                                        You haven't made any exams, yet.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <CreateExamModal ref={createExamRef} subjects={subjects} />
            </FacultyLayout>
        </>
    );
}
