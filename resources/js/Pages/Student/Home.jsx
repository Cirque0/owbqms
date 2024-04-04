import ClassCard from "@/Components/ClassCard";
import StudentLayout from "@/Layouts/StudentLayout";
import { Head } from "@inertiajs/react";

export default function Home({ auth, classes }) {
    return (
        <>
            <Head title="Home \ Student" />
            <StudentLayout user={auth.user}>
                <div className="grow flex gap-8">
                    <div className="grow max-w-4xl">
                        <div className="flex justify-between items-baseline">
                            <h2 className="font-bold text-2xl">Your Classes</h2>
                        </div>

                        {classes.length ? (
                            <div className="mt-4 grid md:grid-cols-2 gap-4">
                                {classes.map((classObj) => (
                                    <ClassCard
                                        key={classObj.id}
                                        classObj={classObj}
                                        href={route("student.classes.show", {
                                            class: classObj.id,
                                        })}
                                        disabled={
                                            classObj.pivot.status === "pending"
                                        }
                                        student
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-40 flex justify-center items-center">
                                <div className="flex flex-col items-center text-gray-500">
                                    <span className="aspect-square p-8 bg-gray-100 rounded-full">
                                        <i className="bi bi-mortarboard text-6xl"></i>
                                    </span>
                                    <h2 className="mt-4 sm:text-xl text-lg font-bold text-center">
                                        There were no classes found.
                                    </h2>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </StudentLayout>
        </>
    );
}
