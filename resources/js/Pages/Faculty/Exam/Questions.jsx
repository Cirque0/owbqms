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

                    <QuestionsTable title={'Identification'} questions={identification} />

                    <QuestionsTable title={'True or False'} questions={trueOrFalse} />

                    <QuestionsTable title={'Fill in the Blanks'} questions={fillInTheBlanks} />

                    <QuestionsTable title={'Multiple Choice'} questions={multipleChoice} />

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

function QuestionsTable({ title, questions }) {
    return (
        <details open className="mt-4 collapse collapse-arrow bg-gray-100">
            <summary className="collapse-title md:text-xl text-base font-bold bg-primary text-primary-content">
                {title}
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
                            {questions.length ? (
                                questions.map((question) => (
                                    <tr>
                                        <td>
                                            <div>
                                                <div className="flex justify-between items-baseline gap-2">
                                                    <p className="font-bold">
                                                        Q:{" "}
                                                        {question.description}
                                                    </p>
                                                    <div className="dropdown dropdown-end">
                                                        <div
                                                            tabIndex={0}
                                                            role="button"
                                                            className="btn btn-sm btn-ghost btn-circle"
                                                        >
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                        </div>
                                                        <ul
                                                            tabIndex={0}
                                                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max"
                                                        >
                                                            <li>
                                                                <button>
                                                                    <i className="bi bi-pencil-square"></i>
                                                                    Edit
                                                                </button>
                                                            </li>
                                                            <li className="text-error">
                                                                <button>
                                                                    <i className="bi bi-trash"></i>
                                                                    Delete
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {question.type ===
                                                "Multiple Choice" ? (
                                                    <div className="mt-2">
                                                        <h4 className="font-bold text-xs">
                                                            Choices:
                                                        </h4>
                                                        <div className="w-full mt-2 join join-vertical bg-gray-200 font-medium">
                                                            {question.choices.map(
                                                                (choice) => (
                                                                    <div
                                                                        className={`join-item flex items-center p-2 gap-2 ${
                                                                            choice ===
                                                                            question.answer
                                                                                ? "bg-green-200"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        {choice ===
                                                                        question.answer ? (
                                                                            <i className="bi bi-check-circle-fill text-xl text-success"></i>
                                                                        ) : (
                                                                            <i className="bi bi-x-lg text-xl text-error"></i>
                                                                        )}
                                                                        {choice}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="mt-2">
                                                        <h4 className="font-bold text-xs">
                                                            Answer:
                                                        </h4>
                                                        <p className="mt-2 bg-green-200 p-2 rounded-lg font-medium">
                                                            {question.answer}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>
                                        <div>
                                            <p>
                                                There are no questions for this
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
    );
}
