import ClassCard from "@/Components/ClassCard";
import StudentLayout from "@/Layouts/StudentLayout";
import { Head } from "@inertiajs/react";

export default function Home({ auth, classes }) {
    return (
        <>
            <Head title="Home \ Student" />
            <StudentLayout user={auth.user}>
                <div className="grow flex gap-8">
                    <div className="grow">
                        <div className="flex justify-between items-baseline">
                            <h2 className="font-bold text-2xl">Your Classes</h2>
                        </div>

                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                            {classes.length > 0 ? (
                                classes.map((classObj) => (
                                    <ClassCard
                                        key={classObj.id}
                                        classObj={classObj}
                                        href={route("student.classes.show", {
                                            class: classObj.id,
                                        })}
                                        disabled={classObj.pivot.status === 'pending'}
                                        student
                                    />
                                ))
                            ) : (
                                <div className="md:h-40 min-h-20 px-6 py-2 col-span-2 flex flex-col justify-center items-center bg-gray-100 rounded-xl">
                                    <span className="md:text-xl font-semibold text-neutral">
                                        You don't have any classes, yet.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:card hidden w-full max-w-xs bg-gray-100">
                        <div className="card-body">
                            <h2 className="card-title">Ongoing Exams</h2>
                        </div>
                    </div>
                </div>
            </StudentLayout>
        </>
    );
}
