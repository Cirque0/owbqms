import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head } from "@inertiajs/react";
import { createContext, useContext, useReducer, useRef } from "react";
import CreateQuestionModal from "./Partials/CreateQuestionModal";
import UpdateQuestionModal from "./Partials/UpdateQuestionModal";
import DeleteQuestionModal from "./Partials/DeleteQuestionModal";

const QuestionsContext = createContext(null);

export default function Questions({
    auth,
    exam,
    identification,
    trueOrFalse,
    fillInTheBlanks,
    multipleChoice,
}) {
    const createModalRef = useRef(null);
    const updateModalRef = useRef(null);
    const deleteModalRef = useRef(null);

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "set_update_question":
                    return {
                        ...prevState,
                        updateQuestion: action.updateQuestion,
                    };
                case "set_delete_question":
                    return {
                        ...prevState,
                        deleteQuestion: action.deleteQuestion,
                    };
            }
        },
        {
            updateQuestion: null,
            deleteQuestion: null,
        }
    );

    const showUpdateModal = (question) => {
        dispatch({ type: "set_update_question", updateQuestion: question });
        updateModalRef.current.showModal();
    };

    const showDeleteModal = (question) => {
        dispatch({ type: "set_delete_question", deleteQuestion: question });
        deleteModalRef.current.showModal();
    };

    return (
        <>
            <Head title={`${exam.title} (${exam.subject.name}) / Faculty`} />
            <FacultyLayout user={auth.user}>
                <ExamLayout exam={exam}>
                    <QuestionsContext.Provider
                        value={{
                            state,
                            dispatch,
                            showUpdateModal,
                            showDeleteModal,
                        }}
                    >
                        <div className="mt-4 card bg-gray-100">
                            <div className="card-body sm:p-8 p-4">
                                <div className="flex md:flex-row flex-col justify-between">
                                    <h2 className="card-title">
                                        Exam Questions
                                    </h2>

                                    <div className="mt-4 flex">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() =>
                                                createModalRef.current.showModal()
                                            }
                                        >
                                            <i className="bi bi-plus-lg"></i>
                                            New Question
                                        </button>
                                    </div>
                                </div>

                                <QuestionsTable
                                    title={"Identification"}
                                    questions={identification}
                                />

                                <QuestionsTable
                                    title={"True or False"}
                                    questions={trueOrFalse}
                                />

                                <QuestionsTable
                                    title={"Fill in the Blanks"}
                                    questions={fillInTheBlanks}
                                />

                                <QuestionsTable
                                    title={"Multiple Choice"}
                                    questions={multipleChoice}
                                />
                            </div>
                        </div>

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
                    </QuestionsContext.Provider>
                </ExamLayout>

                <CreateQuestionModal ref={createModalRef} examId={exam.id} />

                {/* <UpdateQuestionModal key={state.updateQuestion?.id} ref={updateModalRef} question={state.updateQuestion} /> */}
                <UpdateQuestionModal
                    ref={updateModalRef}
                    question={state.updateQuestion}
                />

                <DeleteQuestionModal
                    ref={deleteModalRef}
                    question={state.deleteQuestion}
                />
            </FacultyLayout>
        </>
    );
}

function QuestionsTable({ title, questions }) {
    const { showUpdateModal, showDeleteModal } = useContext(QuestionsContext);

    return (
        <details open className="mt-4 collapse collapse-arrow bg-gray-50">
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
                                    <tr key={question.id}>
                                        <td>
                                            <div>
                                                <div className="flex justify-between items-baseline gap-2">
                                                    <p className="font-bold">
                                                        Q:{" "}
                                                        {question.description}{" "}
                                                        <span className="badge badge-info">{question.points} pts.</span>
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
                                                                <button
                                                                    onClick={() =>
                                                                        showUpdateModal(
                                                                            question
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="bi bi-pencil-square"></i>
                                                                    Edit
                                                                </button>
                                                            </li>
                                                            <li className="text-error">
                                                                <button
                                                                    onClick={() =>
                                                                        showDeleteModal(
                                                                            question
                                                                        )
                                                                    }
                                                                >
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
                                                                (
                                                                    choice,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
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
                                        <div className="grow flex justify-center items-center">
                                            <div className="flex items-center gap-2 sm:text-base text-gray-500">
                                                <i className="bi bi-patch-question text-xl"></i>
                                                <h2 className="font-bold">
                                                    There are no questions in this category.
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
        </details>
    );
}
