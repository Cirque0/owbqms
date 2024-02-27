import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head } from "@inertiajs/react";

export default function Classes({ auth }) {
    return (
        <>
            <Head title="Classes \ Faculty" />
            <FacultyLayout user={auth.user} header={"Classes"}>
                <div className="flex flex-col">
                    <h2 className="font-bold text-2xl">Your Classes</h2>
                </div>
            </FacultyLayout>
        </>
    )
}