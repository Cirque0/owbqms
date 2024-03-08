import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head } from "@inertiajs/react";

export default function AssignedClasses({ auth, exam }) {
    return (
        <>
            <Head title={`${exam.title} (${exam.subject.name}) / Faculty`} />
            <FacultyLayout user={auth.user}>
                <ExamLayout exam={exam}>
                    {JSON.stringify(exam)}
                </ExamLayout>
            </FacultyLayout>
        </>
    )
}