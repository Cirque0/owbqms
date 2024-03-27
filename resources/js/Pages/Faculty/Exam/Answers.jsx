import QuestionAnswer from "@/Components/QuestionAnswer";
import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";

export default function Answers({ auth, exam, studentExam }) {
    return (
        <>
            <FacultyLayout user={auth.user}>
                <ExamLayout exam={exam}>
                    <div className="mt-4 card bg-gray-100">
                        <div className="card-body">
                            <h2 className="card-title">Student's Answers</h2>
                            <div>
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text font-medium">Student Name</span>
                                    </div>
                                    <p className="px-2 font-bold">{studentExam.student.profile.full_name}</p>
                                </label>
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
    )
}