import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head } from "@inertiajs/react";

export default function ExamsList({ auth }) {
    return (
        <>
            <Head title={'Exams / Faculty'} />
            <FacultyLayout user={auth.user}>
                <div className="grow flex gap-8">
                    <div className="grow">
                        <div className="flex justify-between items-baseline">
                            <h2 className="font-bold text-2xl">Your Exams</h2>
                            <div className="flex">
                                <button className="btn btn-sm btn-primary">
                                    <i className="bi bi-plus-lg"></i>
                                    <span>
                                        New Exam
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </FacultyLayout>
        </>
    )
}