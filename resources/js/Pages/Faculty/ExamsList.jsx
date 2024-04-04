import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head, Link } from "@inertiajs/react";
import CreateExamModal from "./Partials/CreateExamModal";
import { useRef } from "react";

export default function ExamsList({ auth, exams, subjects }) {
    const createExamRef = useRef(null);

    return (
        <>
            <Head title={"Exams / Faculty"} />
            <FacultyLayout user={auth.user}>
                <div className="grow flex gap-8">
                    <div className="grow max-w-4xl">
                        <div className="flex justify-between items-baseline">
                            <h2 className="font-bold text-2xl">Your Exams</h2>
                            <div className="flex">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        createExamRef.current.showModal()
                                    }
                                >
                                    <i className="bi bi-plus-lg"></i>
                                    <span>New Exam</span>
                                </button>
                            </div>
                        </div>

                        {!exams.length ? (
                            <table className="mt-4 table">
                                <tbody>
                                    {exams.map((exam) => (
                                        <tr key={exam.id}>
                                            <td>
                                                <div className="flex md:flex-row flex-col gap-2 p-4 bg-gray-100 roundex-xl drop-shadow-lg">
                                                    <div className="grow">
                                                        <Link
                                                            href={route(
                                                                "faculty.exams.show",
                                                                {
                                                                    exam: exam.id,
                                                                }
                                                            )}
                                                            className="text-lg font-bold text-maroon"
                                                        >
                                                            <span className="badge badge-lg badge-primary">
                                                                {exam.type}
                                                            </span>{" "}
                                                            {exam.title}
                                                        </Link>
                                                        <div className="mt-2 sm:text-base text-sm font-semibold">
                                                            <span className="flex gap-2">
                                                                <i className="bi bi-mortarboard"></i>
                                                                {
                                                                    exam.subject
                                                                        .name
                                                                }
                                                            </span>
                                                            <span className="flex gap-2">
                                                                <i className="bi bi-patch-question"></i>
                                                                {
                                                                    exam.questions_count
                                                                }{" "}
                                                                {exam.questions_count ===
                                                                1
                                                                    ? "question"
                                                                    : "questions"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-col gap-2">
                                                        <Link
                                                            href={route(
                                                                "faculty.exams.questions.index",
                                                                {
                                                                    exam: exam.id,
                                                                }
                                                            )}
                                                            className="btn btn-sm btn-primary"
                                                        >
                                                            <i className="bi bi-patch-question-fill"></i>
                                                            Questions
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "faculty.exams.scores.index",
                                                                {
                                                                    exam: exam.id,
                                                                }
                                                            )}
                                                            className="btn btn-sm btn-primary"
                                                        >
                                                            <i className="bi bi-percent"></i>
                                                            Scores
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="py-40 flex justify-center items-center">
                                <div className="flex flex-col items-center text-gray-500">
                                    <span className="aspect-square p-8 bg-gray-100 rounded-full">
                                        <i className="bi bi-journal-text text-6xl"></i>
                                    </span>
                                    <h2 className="mt-4 sm:text-xl text-lg font-bold text-center">
                                        There were no exams found.
                                    </h2>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <CreateExamModal ref={createExamRef} subjects={subjects} />
            </FacultyLayout>
        </>
    );
}
