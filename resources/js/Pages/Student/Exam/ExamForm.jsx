import { Link, useForm } from "@inertiajs/react";

export default function ExamForm({ auth, classModel, exam, pivot }) {
    const { data, setData, post, errors, processing } = useForm({
        answers: exam.questions.reduce(
            (acc, curr) => ({
                ...acc,
                [curr.id]: {
                    question_id: curr.id,
                    answer: "",
                },
            }),
            {}
        ),
    });

    const changeAnswer = (e, key) =>
        setData((value) => ({
            answers: {
                ...value.answers,
                [key]: {
                    question_id: key,
                    answer: e.target.value,
                },
            },
        }));

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(
            route("student.classes.exams.submit", {
                class: classModel.id,
                exam: exam.id,
            })
        );
    };

    return (
        <main className="relative min-h-screen">
            <nav className="sticky z-50 top-0 p-2 bg-primary text-primary-content">
                <Link href={route("student.exams.index")}>
                    <i className="bi bi-arrow-left-short text-5xl"></i>
                </Link>
            </nav>

            <div className="flex flex-col max-w-3xl items-center p-4 mx-auto">
                <div className="card w-full bg-gray-100">
                    <div className="card-body">
                        <h2 className="card-title md:text-2xl text-xl font-bold">
                            [{exam.type}] {exam.title}
                        </h2>
                        <div className="font-semibold md:text-lg text-base">
                            <h4>
                                [{classModel.section.name}] {exam.subject.name}
                            </h4>
                        </div>
                        <p className="font-medium sm:text-base text-sm">
                            A score of <b>{pivot.passing_score}%</b> out of{" "}
                            <b>{exam.questions_count} questions</b> is needed to
                            pass.
                        </p>
                        {pivot.is_open && (
                            <p className="font-medium sm:text-base text-sm">
                                The examination will close at{" "}
                                <span className="font-bold">
                                    {new Date(pivot.closed_at).toLocaleString(
                                        "en-PH"
                                    )}
                                </span>
                                .
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-4 card w-full bg-gray-100">
                    <div className="card-body">
                        {pivot.student_exams.length > 0 ? (
                            <div className="flex flex-col gap-2 font-medium">
                                <p className="card-title sm:text-2xl text-lg">
                                    You completed the exam!
                                </p>
                                <p className="sm:text-xl text-base">
                                    {pivot.student_exams[0].is_passed ? (
                                        <i className="bi bi-check-circle-fill sm:text-2xl text-lg text-success"></i>
                                    ) : (
                                        <i className="bi bi-x-circle-fill sm:text-2xl text-lg text-error"></i>
                                    )}{" "}
                                    You{" "}
                                    {pivot.student_exams[0].is_passed
                                        ? "passed"
                                        : "failed"}{" "}
                                    with a score of{" "}
                                    {pivot.student_exams[0].score} out of{" "}
                                    {exam.questions_count} (
                                    {(
                                        (pivot.student_exams[0].score /
                                            exam.questions_count) *
                                        100
                                    ).toFixed(2)}
                                    %).
                                </p>
                                {pivot.is_answers_shown ? (
                                    <>
                                        <h2 className="mt-4 card-title">
                                            Your Answers
                                        </h2>
                                        <div className="flex flex-col gap-12 mt-4">
                                            {pivot.student_exams[0].answers.map(
                                                (questionAnswer) => (
                                                    <QuestionAnswer
                                                        key={questionAnswer.id}
                                                        questionAnswer={
                                                            questionAnswer
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <p>
                                        Your instructor will release the answers at a later time.
                                    </p>
                                )}
                            </div>
                        ) : pivot.closed_at ? (
                            pivot.is_open ? (
                                <>
                                    <h2 className="card-title">Questions</h2>
                                    <form
                                        onSubmit={submit}
                                        className="flex flex-col gap-12 mt-4"
                                    >
                                        {exam.questions.map((question) => (
                                            <Question
                                                key={question.id}
                                                question={question}
                                                value={
                                                    data.answers[question.id]
                                                        .answer
                                                }
                                                changeAnswer={changeAnswer}
                                            />
                                        ))}
                                        
                                        <button
                                            className="btn btn-sm btn-primary"
                                            disabled={processing}
                                        >
                                            {processing && (
                                                <span className="loading loading-spinner loading-sm"></span>
                                            )}
                                            Submit
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <p className="font-medium text-xl">
                                        The examination period has ended.
                                    </p>
                                    <p>
                                        Approach your instructor for a possible
                                        reopening.
                                    </p>
                                </>
                            )
                        ) : (
                            <>
                                <p className="font-medium text-xl">
                                    This exam is not open, yet.
                                </p>
                                <p>
                                    Please, wait for for your instructor to open
                                    submissions.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

function Question({ question, value, changeAnswer }) {
    return (
        <div>
            <p className="font-semibold">{question.description}</p>
            {(() => {
                switch (question.type) {
                    case "Identification":
                    case "Fill in the Blanks":
                        return (
                            <input
                                type="text"
                                className="mt-4 w-full input input-bordered"
                                placeholder="Answer"
                                value={value}
                                onChange={(e) => changeAnswer(e, question.id)}
                                required
                            />
                        );
                    case "True or False":
                        return (
                            <>
                                <label className="mt-4 flex items-center gap-4 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={"q" + question.id}
                                        className="radio checked:bg-maroon"
                                        value={"True"}
                                        checked={value === "True"}
                                        onChange={(e) =>
                                            changeAnswer(e, question.id)
                                        }
                                        required
                                    />
                                    <span>True</span>
                                </label>
                                <label className="mt-4 flex items-center gap-4 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={"q" + question.id}
                                        className="radio checked:bg-maroon"
                                        value={"False"}
                                        checked={value === "False"}
                                        onChange={(e) =>
                                            changeAnswer(e, question.id)
                                        }
                                        required
                                    />
                                    <span>False</span>
                                </label>
                            </>
                        );
                    case "Multiple Choice":
                        return (
                            <>
                                {question.choices.map((choice, index) => (
                                    <label
                                        key={index}
                                        className="mt-4 flex items-center gap-4 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name={"q" + question.id}
                                            className="radio checked:bg-maroon"
                                            value={choice}
                                            checked={value === choice}
                                            onChange={(e) =>
                                                changeAnswer(e, question.id)
                                            }
                                            required
                                        />
                                        <span>{choice} </span>
                                    </label>
                                ))}
                            </>
                        );
                }
            })()}
            {/* <input type="text" className="mt-2 input input-sm input-bordered" /> */}
        </div>
    );
}

function QuestionAnswer({ questionAnswer }) {
    return (
        <div>
            <p className="font-semibold">
                {questionAnswer.question.description}
            </p>
            {(() => {
                switch (questionAnswer.question.type) {
                    case "Identification":
                    case "Fill in the Blanks":
                    case "True or False":
                        return (
                            <div
                                className={
                                    "mt-4 p-4 w-full rounded-xl " +
                                    (questionAnswer.is_correct
                                        ? "bg-green-200 text-success-content"
                                        : "bg-red-200 text-error-content")
                                }
                            >
                                <div className="text-xs font-bold">
                                    Your answer
                                </div>
                                <div>
                                    {questionAnswer.is_correct ? (
                                        <i className="bi bi-check-circle-fill mr-2 text-xl text-success"></i>
                                    ) : (
                                        <i className="bi bi-x-circle-fill mr-2 text-xl text-error"></i>
                                    )}
                                    <span>{questionAnswer.answer}</span>
                                </div>

                                {!questionAnswer.is_correct && (
                                    <>
                                        <div className="mt-4 text-xs font-bold">
                                            Correct answer
                                        </div>
                                        <div>
                                            <i className="bi bi-check-circle-fill mr-2 text-xl text-error"></i>
                                            <span>
                                                {questionAnswer.question.answer}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    case "Multiple Choice":
                        return (
                            <div className="w-full mt-4 flex flex-col">
                                {questionAnswer.question.choices.map(
                                    (choice) => (
                                        <div
                                            className={
                                                "w-full p-4 rounded-xl flex items-center " +
                                                (choice ===
                                                questionAnswer.question.answer
                                                    ? "bg-green-200 text-success-content"
                                                    : questionAnswer.answer ===
                                                      choice
                                                    ? "bg-red-200 text-error-content"
                                                    : "")
                                            }
                                        >
                                            {choice ===
                                            questionAnswer.question.answer ? (
                                                <i className="bi bi-check-circle-fill mr-2 text-xl text-success"></i>
                                            ) : (
                                                <i className="bi bi-x-circle-fill mr-2 text-xl text-error"></i>
                                            )}
                                            <span>{choice}</span>
                                        </div>
                                    )
                                )}
                            </div>
                        );
                }
            })()}
        </div>
    );
}
