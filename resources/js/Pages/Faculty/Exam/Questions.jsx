import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head } from "@inertiajs/react";
import { useRef } from "react";
import CreateQuestionModal from "./Partials/CreateQuestionModal";

export default function Questions({
    auth,
    exam,
    identification,
    trueOrFalse,
    fillInTheBlanks,
    multipleChoice,
}) {
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
                                        {identification.length ? (
                                            identification.map((q) => (
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <p className="font-bold">
                                                                Q:{" "}
                                                                {q.description}
                                                            </p>
                                                            <div className="mt-2">
                                                                <h4 className="font-bold text-xs">Answer:</h4>
                                                                <p className="mt-2 bg-green-200 p-2 rounded-lg font-medium">
                                                                    {q.answer}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td>
                                                    <div>
                                                        <p>
                                                            There are no
                                                            questions for this
                                                            category, yet.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
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
                                        {trueOrFalse.length ? (
                                            trueOrFalse.map((q) => (
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <p className="font-bold">
                                                                Q:{" "}
                                                                {q.description}
                                                            </p>
                                                            <div className="mt-2">
                                                                <h4 className="font-bold text-xs">Answer:</h4>
                                                                <p className="mt-2 bg-green-200 p-2 rounded-lg font-medium">
                                                                    {q.answer}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td>
                                                    <div>
                                                        <p>
                                                            There are no
                                                            questions for this
                                                            category, yet.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
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
                                        {fillInTheBlanks.length ? (
                                            fillInTheBlanks.map((q) => (
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <p className="font-bold">
                                                                Q:{" "}
                                                                {q.description}
                                                            </p>
                                                            <div className="mt-2">
                                                                <h4 className="font-bold text-xs">Answer:</h4>
                                                                <p className="mt-2 bg-green-200 p-2 rounded-lg font-medium">
                                                                    {q.answer}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td>
                                                    <div>
                                                        <p>
                                                            There are no
                                                            questions for this
                                                            category, yet.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
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
                                        {multipleChoice.length ? (
                                            multipleChoice.map((q) => (
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <p className="font-bold">
                                                                Q:{" "}
                                                                {q.description}
                                                            </p>
                                                            <div className="mt-2">
                                                                <h4 className="font-bold text-xs">
                                                                    Choices:
                                                                </h4>
                                                                <div className="w-full mt-2 join join-vertical bg-gray-200">
                                                                    {q.choices.map(
                                                                        (
                                                                            choice
                                                                        ) => (
                                                                            <div
                                                                                className={`join-item flex items-center p-2 gap-2 ${
                                                                                    choice ===
                                                                                    q.answer
                                                                                        ? "bg-green-200"
                                                                                        : ""
                                                                                }`}
                                                                            >
                                                                                {choice ===
                                                                                q.answer ? (
                                                                                    <i className="bi bi-check-circle-fill text-xl text-success"></i>
                                                                                ) : (
                                                                                    <i className="bi bi-x-lg text-xl text-error"></i>
                                                                                )}
                                                                                {
                                                                                    choice
                                                                                }
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td>
                                                    <div>
                                                        <p>
                                                            There are no
                                                            questions for this
                                                            category, yet.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
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
