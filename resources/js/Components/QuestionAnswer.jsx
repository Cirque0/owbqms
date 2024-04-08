export default function QuestionAnswer({ questionAnswer, isStudent = false }) {
    return (
        <div>
            <p className="font-semibold">
                {questionAnswer.question.description}
                <span className="ml-2 badge badge-info">{+(questionAnswer.question.points * questionAnswer.score_percentage).toFixed(2)} / {questionAnswer.question.points} pts.</span>
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
                                    (questionAnswer.score_percentage > 0
                                        ? "bg-green-200 text-success-content"
                                        : "bg-red-200 text-error-content")
                                }
                            >
                                <div className="text-xs font-bold">
                                    {isStudent ? "Your" : "Student\'s"} answer
                                </div>
                                <div>
                                    {questionAnswer.score_percentage > 0 ? (
                                        <i className="bi bi-check-circle-fill mr-2 text-xl text-success"></i>
                                    ) : (
                                        <i className="bi bi-x-circle-fill mr-2 text-xl text-error"></i>
                                    )}
                                    <span>{questionAnswer.answer}</span>
                                </div>

                                {questionAnswer.score_percentage <= 0 && (
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
