import SettingsModal from "@/Pages/Faculty/Exam/Partials/SettingsModal";
import { Link } from "@inertiajs/react";
import { useRef } from "react";

export default function ExamLayout({ children, exam }) {
    const settingsRef = useRef(null);

    return (
        <>
            <div className="grow flex gap-8">
                <div className="grow max-w-4xl">
                    <div className="flex">
                        <div className="grow">
                            <h3 className="font-bold text-gray-600 md:text-base text-sm">
                                {exam.subject.name}
                            </h3>
                            <h2 className="font-bold md:text-2xl text-lg">
                                {exam.title}
                            </h2>
                        </div>
                        <div>
                            <button
                                className="btn btn-ghost btn-circle text-gray-500 hover:text-black"
                                onClick={() => settingsRef.current.showModal()}
                            >
                                <i className="bi bi-gear-fill"></i>
                            </button>
                        </div>
                    </div>

                    <div
                        role="tab-list"
                        className="mt-4 tabs tabs-bordered sm:tabs-md tabs-xs"
                    >
                        <Link
                            href={route("faculty.exams.show", {
                                exam: exam.id,
                            })}
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
                        <Link
                            href={route("faculty.exams.scores.index", {
                                exam: exam.id,
                            })}
                            role="tab"
                            className={`tab ${
                                route().current("faculty.exams.scores.*")
                                    ? "tab-active"
                                    : ""
                            }`}
                        >
                            Scores
                        </Link>
                    </div>

                    {children}
                </div>
            </div>

            <SettingsModal ref={settingsRef} exam={exam} />
        </>
    );
}
