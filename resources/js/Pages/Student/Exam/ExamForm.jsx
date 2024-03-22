import { useForm } from "@inertiajs/react";

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

    const changeAnswer = (e, key) => setData((value) => (
        {
            answers: {
                ...value.answers,
                [key]: {
                    question_id: key,
                    answer: e.target.value,
                },
            },
        }
    ));

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("student.classes.exams.submit", {
            class: classModel.id,
            exam: exam.id
        }));
    }

    return (
        <main className="relative min-h-screen">
            <nav className="sticky z-50 top-0 p-2 bg-primary text-primary-content">
                <button onClick={() => history.back()}>
                    <i className="bi bi-arrow-left-short text-5xl"></i>
                </button>
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
                        <p className="font-medium sm:text-base text-sm">
                            Be sure to submit your answers before{" "}
                            <span className="font-bold">
                                {new Date(pivot.closed_at).toLocaleString(
                                    "en-PH"
                                )}
                            </span>
                            .
                        </p>
                    </div>
                </div>

                <div className="mt-4 card w-full bg-gray-100">
                    <div className="card-body">
                        {pivot.closed_at ? (
                            pivot.is_open ? (
                                <>
                                    <h2 className="card-title">Questions</h2>
                                    <form onSubmit={submit} className="flex flex-col gap-12 mt-4">
                                        {exam.questions.map((question) => (
                                            <div key={question.id}>
                                                <p className="font-semibold">
                                                    {question.description}
                                                </p>
                                                {(() => {
                                                    switch (question.type) {
                                                        case "Identification":
                                                        case "Fill in the Blanks":
                                                            return (
                                                                <input
                                                                    type="text"
                                                                    className="mt-4 w-full input input-bordered"
                                                                    placeholder="Answer"
                                                                    value={data.answers[question.id].answer}
                                                                    onChange={(e) => changeAnswer(e, question.id)}
                                                                />
                                                            );
                                                        case "True or False":
                                                            return (
                                                                <>
                                                                    <label className="mt-4 flex items-center gap-4 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name={
                                                                                "q" +
                                                                                question.id
                                                                            }
                                                                            className="radio checked:bg-maroon"
                                                                            value={"True"}
                                                                            checked={data.answers[question.id].answer === "True"}
                                                                            onChange={(e) => changeAnswer(e, question.id)}
                                                                        />
                                                                        <span>
                                                                            True
                                                                        </span>
                                                                    </label>
                                                                    <label className="mt-4 flex items-center gap-4 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name={
                                                                                "q" +
                                                                                question.id
                                                                            }
                                                                            className="radio checked:bg-maroon"
                                                                            value={"False"}
                                                                            checked={data.answers[question.id].answer === "False"}
                                                                            onChange={(e) => changeAnswer(e, question.id)}
                                                                        />
                                                                        <span>
                                                                            False
                                                                        </span>
                                                                    </label>
                                                                </>
                                                            );
                                                        case "Multiple Choice":
                                                            return (
                                                                <>
                                                                    {question.choices.map(
                                                                        (
                                                                            choice, index
                                                                        ) => (
                                                                            <label key={index} className="mt-4 flex items-center gap-4 cursor-pointer">
                                                                                <input
                                                                                    type="radio"
                                                                                    name={
                                                                                        "q" +
                                                                                        question.id
                                                                                    }
                                                                                    className="radio checked:bg-maroon"
                                                                                    value={choice}
                                                                                    checked={data.answers[question.id].answer === choice}
                                                                                    onChange={(e) => changeAnswer(e, question.id)}
                                                                                />
                                                                                <span>
                                                                                    {
                                                                                        choice
                                                                                    }{" "}
                                                                                </span>
                                                                            </label>
                                                                        )
                                                                    )}
                                                                </>
                                                            );
                                                    }
                                                })()}
                                                {/* <input type="text" className="mt-2 input input-sm input-bordered" /> */}
                                            </div>
                                        ))}
                                        <button className="btn btn-sm btn-primary" disabled={processing}>
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
