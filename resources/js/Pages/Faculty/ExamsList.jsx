import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head } from "@inertiajs/react";
import CreateExamModal from "./Partials/CreateExamModal";
import { useRef } from "react";

export default function ExamsList({ auth, subjects }) {
    const createExamRef = useRef(null);

    return (
        <>
            <Head title={'Exams / Faculty'} />
            <FacultyLayout user={auth.user}>
                <div className="grow flex gap-8">
                    <div className="grow max-w-4xl">
                        <div className="flex justify-between items-baseline">
                            <h2 className="font-bold text-2xl">Your Exams</h2>
                            <div className="flex">
                                <button className="btn btn-sm btn-primary" onClick={() => createExamRef.current.showModal()}>
                                    <i className="bi bi-plus-lg"></i>
                                    <span>
                                        New Exam
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <CreateExamModal ref={createExamRef} subjects={subjects} />
            </FacultyLayout>
        </>
    )
}