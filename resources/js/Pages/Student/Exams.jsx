import StudentLayout from "@/Layouts/StudentLayout";
import { Head } from "@inertiajs/react";

export default function Exams({ auth }) {
    return (
        <>
            <Head title="Exams \ Student" />
            <StudentLayout user={auth.user}>
                <div className="grow flex gap-8">
                    <div className="grow max-w-3xl">
                        <div className="flex justify-between items-baseline">
                            <h2 className="font-bold text-2xl">Your Exams</h2>
                        </div>

                        <div className="mt-4 card bg-gray-100">
                            <div className="card-body">
                                <h2 className="card-title">Ongoing Exams</h2>
                            </div>
                        </div>

                        <div className="mt-4 card bg-gray-100">
                            <div className="card-body">
                                <h2 className="card-title">Finished Exams</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </StudentLayout>
        </>
    )
}