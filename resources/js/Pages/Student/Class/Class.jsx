import StudentLayout from "@/Layouts/StudentLayout";

export default function Class({ auth, classModel }) {
    return (
        <StudentLayout user={auth.user}>
            {JSON.stringify(classModel)}
        </StudentLayout>
    )
}