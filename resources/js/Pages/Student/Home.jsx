import StudentLayout from "@/Layouts/StudentLayout";
import { Head } from "@inertiajs/react";

export default function Home({ auth }) {
    return (
        <>
            <Head title="Home \ Student" />
            <StudentLayout user={auth.user}>
                sup
            </StudentLayout>
        </>
    )
}