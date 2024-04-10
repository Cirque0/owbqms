import FacultyLayout from "@/Layouts/FacultyLayout";
import { useRef } from "react";
import CreateClassModal from "./Partials/CreateClassModal";
import ClassCard from "@/Components/ClassCard";

export default function Home({ auth, classes, courses, subjects }) {
    const addClassRef = useRef(null);

    return (
        <FacultyLayout user={auth.user} title={"Classes"}>
            <div className="grow flex gap-8">
                <div className="grow max-w-4xl">
                    <div className="flex justify-between items-baseline">
                        <h2 className="font-bold text-2xl">Your Classes</h2>
                        <div className="flex">
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => addClassRef.current.showModal()}
                            >
                                <i className="bi bi-plus-lg"></i>
                                <span>New Class</span>
                            </button>
                        </div>
                    </div>

                    {classes.length ? (
                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                            {classes.map((classObj) => (
                                <ClassCard
                                    key={classObj.id}
                                    href={route("faculty.classes.show", {
                                        class: classObj.id,
                                    })}
                                    classObj={classObj}
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

            <CreateClassModal
                ref={addClassRef}
                courses={courses}
                subjects={subjects}
            />
        </FacultyLayout>
    );
}
