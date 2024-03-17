export default function ExamForm({ auth, classModel, exam, pivot }) {
    return (
        <main className="relative min-h-screen">
            <nav className="sticky top-0 p-2 bg-primary text-primary-content">
                <button onClick={() => history.back()}>
                    <i className="bi bi-arrow-left-short text-5xl"></i>
                </button>
            </nav>

            <div className="flex flex-col items-center p-4">
                <div className="card w-full max-w-4xl bg-gray-100">
                    <div className="card-body">
                        <h2 className="card-title md:text-2xl text-xl font-bold">
                            [{exam.type}] {exam.title}
                        </h2>
                        <div className="font-semibold md:text-lg text-base">
                            <h4>
                                [{classModel.section.name}] {exam.subject.name}
                            </h4>
                        </div>
                        <p className="font-medium text-justify">
                            You need to score <b>{pivot.passing_score}%</b> out
                            of <b>{exam.questions_count} questions</b> within <b>{pivot.exam_period} minutes</b> to pass.
                        </p>
                    </div>
                </div>
            
                <div className="mt-4 card w-full max-w-4xl bg-gray-100">
                    <div className="card-body">
                        {pivot.closed_at ? (
                            pivot.is_open ? (
                                'questions'
                            ) : (
                                <div>
                                    <p className="font-medium text-xl">The examination period has ended.</p>
                                    <p>Approach your instructor for a possible reopening.</p>
                                </div>
                            )
                        ) : (
                            <div>
                                <p className="font-medium text-xl">This exam is not open, yet.</p>
                                <p>Please, wait for for your instructor to open submissions.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
