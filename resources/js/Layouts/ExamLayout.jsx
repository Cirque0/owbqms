import { Link } from "@inertiajs/react";

export default function ExamLayout({ children, exam }) {
    return (
        <div className="grow flex gap-8">
            <div className="grow max-w-4xl">
                <div className="flex">
                    <div>
                        <h3 className="font-bold text-gray-600 md:text-base text-sm">
                            {exam.subject.name}
                        </h3>
                        <h2 className="font-bold md:text-2xl text-lg">
                            {exam.title}
                        </h2>
                    </div>
                </div>

                <div role="tab-list" className="mt-4 tabs tabs-bordered">
                    <Link
                        href={route("faculty.exams.show", { exam: exam.id })}
                        role="tab"
                        className={`tab ${
                            route().current("faculty.exams.show")
                                ? "tab-active"
                                : ""
                        }`}
                    >
                        Assignees
                    </Link>
                    <Link
                        href={route("faculty.exams.questions.index", {
                            exam: exam.id,
                        })}
                        role="tab"
                        className={`tab ${
                            route().current("faculty.exams.questions.index")
                                ? "tab-active"
                                : ""
                        }`}
                    >
                        Questions
                    </Link>
                    <Link href="#" role="tab" className="tab">
                        Scores
                    </Link>
                    <Link href="#" role="tab" className="tab">
                        Settings
                    </Link>
                </div>

                {children}
            </div>
        </div>
    );
}
