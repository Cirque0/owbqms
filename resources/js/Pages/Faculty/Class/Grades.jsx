import FacultyLayout from "@/Layouts/FacultyLayout";
import ClassLayout from "./ClassLayout";
import { useMemo } from "react";

export default function Grades({ auth, classModel }) {
    const examsIndexMap = classModel.exams.reduce(
        (acc, exam, index) => ({
            ...acc,
            [exam.pivot.id]: index,
        }),
        {}
    );
    const students = useMemo(() => {
        return classModel.students.map((student) => {
            let scores = Array(classModel.exams.length).fill(null);

            student.answered_exams.forEach((exam) => {
                scores[examsIndexMap[exam.class_exam_id]] = exam.score;
            });

            return {
                id: student.id,
                username: student.username,
                profile: student.profile,
                scores,
            };
        });
    }, [classModel]);

    return (
        <>
            <FacultyLayout user={auth.user}>
                <ClassLayout classModel={classModel}>
                    <div className="mt-8 card bg-gray-100">
                        <div className="card-body">
                            <div className="flex md:flex-row flex-col justify-between">
                                <h2 className="card-title">Students' Grades</h2>
                                <div className="sm:mt-0 mt-4 flex">
                                    <a
                                        href={route(
                                            "faculty.classes.grades.export",
                                            { class: classModel.id }
                                        )}
                                        className="btn btn-sm btn-primary"
                                    >
                                        <i className="bi bi-download"></i>
                                        Export to .xlsx
                                    </a>
                                </div>
                            </div>
                            <div className="mt-4 flex">
                                {students.length ? (
                                    <div className="overflow-x-auto w-0 grow">
                                        <table className="table table-pin-rows table-pin-cols whitespace-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Student</th>
                                                    {classModel.exams.map(
                                                        (exam) => (
                                                            <td key={exam.id}>
                                                                {exam.title}
                                                            </td>
                                                        )
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {students.map((student) => (
                                                    <tr key={student.id}>
                                                        <th>
                                                            <div>
                                                                <p>
                                                                    {
                                                                        student
                                                                            .profile
                                                                            .full_name
                                                                    }
                                                                </p>
                                                                <p className="text-gray-500">
                                                                    {
                                                                        student.username
                                                                    }
                                                                </p>
                                                            </div>
                                                        </th>
                                                        {student.scores.map(
                                                            (score, index) => (
                                                                <td key={index}>
                                                                    {!score &&
                                                                    score !==
                                                                        0 ? (
                                                                        <span className="badge font-semibold">
                                                                            No
                                                                            submission
                                                                        </span>
                                                                    ) : (
                                                                        <div className="join">
                                                                            <span className="join-item badge font-semibold">
                                                                                {
                                                                                    score
                                                                                }{" "}
                                                                                /{" "}
                                                                                {
                                                                                    classModel
                                                                                        .exams[
                                                                                        index
                                                                                    ]
                                                                                        .questions_count
                                                                                }
                                                                            </span>
                                                                            <span
                                                                                className={`join-item badge font-bold ${
                                                                                    (score /
                                                                                        classModel
                                                                                            .exams[
                                                                                            index
                                                                                        ]
                                                                                            .questions_count) *
                                                                                        100 >
                                                                                    classModel
                                                                                        .exams[
                                                                                        index
                                                                                    ]
                                                                                        .pivot
                                                                                        .passing_score
                                                                                        ? "badge-success"
                                                                                        : "badge-error text-red-100"
                                                                                }`}
                                                                            >
                                                                                {(
                                                                                    (score /
                                                                                        classModel
                                                                                            .exams[
                                                                                            index
                                                                                        ]
                                                                                            .questions_count) *
                                                                                    100
                                                                                ).toFixed(
                                                                                    2
                                                                                )}{" "}
                                                                                %
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            )
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="py-16 grow flex justify-center items-center">
                                        <div className="flex flex-col items-center text-gray-500">
                                            <i className="bi bi-people text-6xl"></i>
                                            <h2 className="mt-4 sm:text-xl text-lg font-bold text-center">
                                                There are no students enrolled,
                                                yet.
                                            </h2>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </ClassLayout>
            </FacultyLayout>
        </>
    );
}
