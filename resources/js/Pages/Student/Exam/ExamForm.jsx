export default function ExamForm({ auth, classModel, exam, pivot }) {
    return (
        <main className="relative min-h-screen">
            <nav className="sticky top-0 bg-primary text-primary-content">
                <button onClick={() => history.back()}>
                    <i className="bi bi-arrow-left-short text-5xl"></i>
                </button>
            </nav>

            <div className="flex flex-col items-center p-4">
                <div className="card w-full max-w-4xl bg-base-200">
                    <div className="card-body">
                        <h2 className="card-title md:text-2xl text-xl font-bold">
                            [{exam.type}] {exam.title}
                        </h2>
                        <div className="font-semibold md:text-lg text-base">
                            <h4>
                                [{classModel.section.name}] {exam.subject.name}
                            </h4>
                        </div>
                        <p className="text-justify">
                            You need to score <b>{pivot.passing_score}%</b> out
                            of <b>{exam.questions_count} questions</b> within <b>{pivot.exam_period} minutes</b> to pass.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
