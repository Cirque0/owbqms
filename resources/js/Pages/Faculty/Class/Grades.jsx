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
                            <h2 className="card-title">Students' Grades</h2>
                            <div className="flex">
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
                                                                {!score && score !== 0 ? (
                                                                    <span className="badge font-semibold">No submission</span>
                                                                ) : (
                                                                    <div className="join">
                                                                        <span className="join-item badge font-semibold">
                                                                            {
                                                                                score
                                                                            }{" "}
                                                                            /{" "}
                                                                            {
                                                                                classModel.exams[index].questions_count
                                                                            }
                                                                        </span>
                                                                        <span
                                                                            className={`join-item badge font-bold ${
                                                                                (score /
                                                                                    classModel.exams[index].questions_count) *
                                                                                    100 >
                                                                                classModel.exams[index].pivot.passing_score
                                                                                    ? "badge-success"
                                                                                    : "badge-error text-red-100"
                                                                            }`}
                                                                        >
                                                                            {(
                                                                                (score /
                                                                                    classModel.exams[index].questions_count) *
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
                            </div>
                        </div>
                    </div>
                </ClassLayout>
            </FacultyLayout>
        </>
    );
}
