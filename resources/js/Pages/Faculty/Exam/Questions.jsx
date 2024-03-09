import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head } from "@inertiajs/react";
import { useRef } from "react";
import CreateQuestionModal from "./Partials/CreateQuestionModal";

export default function Questions({ auth, exam }) {
    const createModalRef = useRef(null);

    return (
        <>
            <Head title={`${exam.title} (${exam.subject.name}) / Faculty`} />
            <FacultyLayout user={auth.user}>
                <ExamLayout exam={exam}>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => createModalRef.current.showModal()}
                        >
                            <i className="bi bi-plus-lg"></i>
                            New Question
                        </button>
                    </div>

                    <details
                        open
                        className="mt-4 collapse collapse-arrow bg-gray-100"
                    >
                        <summary className="collapse-title md:text-xl text-base font-bold bg-primary text-primary-content">
                            Identification
                        </summary>
                        <div className="collapse-content">
                            <div className="mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Questions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div>
                                                    <p className="font-bold">
                                                        Q: What's the question?
                                                    </p>
                                                    <p>A: Answer</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </details>

                    <details
                        open
                        className="mt-8 collapse collapse-arrow bg-gray-100"
                    >
                        <summary className="collapse-title md:text-xl text-base font-bold bg-primary text-primary-content">
                            True or False
                        </summary>
                        <div className="collapse-content">
                            <div className="mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Questions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div>
                                                    <p className="font-bold">
                                                        Q: What's the question?
                                                    </p>
                                                    <p>A: Answer</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </details>

                    <details
                        open
                        className="mt-8 collapse collapse-arrow bg-gray-100"
                    >
                        <summary className="collapse-title md:text-xl text-base font-bold bg-primary text-primary-content">
                            Fill in the Blanks
                        </summary>
                        <div className="collapse-content">
                            <div className="mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Questions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div>
                                                    <p className="font-bold">
                                                        Q: What's the question?
                                                    </p>
                                                    <p>A: Answer</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </details>

                    <details
                        open
                        className="mt-8 collapse collapse-arrow bg-gray-100"
                    >
                        <summary className="collapse-title md:text-xl text-base font-bold bg-primary text-primary-content">
                            Multiple Choice
                        </summary>
                        <div className="collapse-content">
                            <div className="mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Questions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div>
                                                    <p className="font-bold">
                                                        Q: What's the question?
                                                    </p>
                                                    <p>A: Answer</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </details>

                    {/* <details
                        open
                        className="mt-8 collapse collapse-arrow bg-gray-100"
                    >
                        <summary className="collapse-title md:text-xl text-base font-bold bg-primary text-primary-content">
                            Essay
                        </summary>
                        <div className="collapse-content">
                            <p>content</p>
                        </div>
                    </details>

                    <details
                        open
                        className="mt-8 collapse collapse-arrow bg-gray-100"
                    >
                        <summary className="collapse-title md:text-xl text-base font-bold bg-primary text-primary-content">
                            Coding
                        </summary>
                        <div className="collapse-content">
                            <p>content</p>
                        </div>
                    </details> */}
                </ExamLayout>

                <CreateQuestionModal examId={exam.id} ref={createModalRef} />
            </FacultyLayout>
        </>
    );
}
