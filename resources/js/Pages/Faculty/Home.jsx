import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head, Link } from "@inertiajs/react";
import { useRef } from "react";
import CreateClassModal from "./Partials/CreateClassModal";
import ClassCard from "@/Components/ClassCard";

export default function Home({ auth, classes, courses, subjects }) {
    const addClassRef = useRef(null);

    return (
        <>
            <Head title="Classes \ Faculty" />
            <FacultyLayout user={auth.user} header={"Classes"}>
                <div className="grow flex gap-8">
                    <div className="grow max-w-4xl">
                        <div className="flex justify-between items-baseline">
                            <h2 className="font-bold text-2xl">Your Classes</h2>
                            <div className="flex">
                                <button className="btn btn-sm btn-primary" onClick={() => addClassRef.current.showModal()}>
                                    <i className="bi bi-plus-lg"></i>
                                    <span>
                                        New Class
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                            {classes.length > 0 ? classes.map((classObj) => (
                                <ClassCard key={classObj.id} href={route("faculty.classes.show", {class: classObj.id})} classObj={classObj} />
                            )) : (
                                <div className="md:h-40 min-h-20 px-6 py-2 col-span-2 flex flex-col justify-center items-center bg-gray-100 rounded-xl">
                                    <span className="md:text-xl font-semibold text-neutral">You don't have any classes, yet.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <CreateClassModal ref={addClassRef} courses={courses} subjects={subjects} />
            </FacultyLayout>
        </>
    );
}
