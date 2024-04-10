import QuestionAnswer from "@/Components/QuestionAnswer";
import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";

export default function Answers({ auth, exam, studentExam }) {
    return (
        <>
            <FacultyLayout user={auth.user} title={`${studentExam.student.profile.full_name}\'s ${exam.title} (${exam.subject.name})`}>
                <ExamLayout exam={exam}>
                    <div className="mt-4 card bg-gray-100">
                        <div className="card-body">
                            <div>
                                <h2 className="mt-2 card-title">
                                    {
                                        studentExam.class_exam.assigned_class
                                            .section.name
                                    }
                                </h2>
                                <div className="mt-4 flex gap-2">
                                    <i className="bi bi-person-circle text-3xl"></i>
                                    <div className="flex flex-col leading-none text-lg">
                                        <h2 className="font-bold">
                                            {
                                                studentExam.student.profile
                                                    .full_name
                                            }
                                        </h2>
                                        <h2 className="font-bold text-gray-600">
                                            {studentExam.student.username}
                                        </h2>
                                    </div>
                                </div>
                                <p className="mt-4 sm:text-base text-sm font-medium">
                                    Submitted at{" "}
                                    <span className="font-bold">
                                        {new Date(
                                            studentExam.created_at
                                        ).toLocaleString("en-PH")}
                                    </span>
                                </p>
                            </div>
                            <div className="mt-4 flex justify-between items-baseline">
                                <h4 className="card-title">Questions</h4>
                                <div className="join">
                                    <span className="join-item badge font-semibold">
                                        {studentExam.score} /{" "}
                                        {exam.questions_count}
                                    </span>
                                    <span
                                        className={`join-item badge font-bold ${
                                            (studentExam.score /
                                                exam.questions_count) *
                                                100 >
                                            studentExam.class_exam.passing_score
                                                ? "badge-success"
                                                : "badge-error text-red-100"
                                        }`}
                                    >
                                        {(
                                            (studentExam.score /
                                                exam.questions_count) *
                                            100
                                        ).toFixed(2)}{" "}
                                        %
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col mt-4 gap-8">
                                {studentExam.answers.map((answer) => (
                                    <QuestionAnswer questionAnswer={answer} />
                                ))}
                            </div>
                        </div>
                    </div>
                </ExamLayout>
            </FacultyLayout>
        </>
    );
}
