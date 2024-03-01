import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head, Link } from "@inertiajs/react";
import { useRef } from "react";
import CreateClassModal from "./Partials/CreateClassModal";

function Class({ classObj }) {
    return (
        <Link
            href={route('faculty.classes.show', {class: classObj.id})}
            className="md:h-40 min-h-20 px-6 py-2 flex flex-col bg-gray-100 rounded-xl drop-shadow-lg"
        >
            <div className="grow flex flex-col text-lg font-bold">
                <p className="text-maroon">{classObj.subject.name}</p>
                <p>{classObj.section.name}</p>
            </div>
            <div className="flex gap-4">
                <span className="inline-flex items-baseline gap-2">
                    <i className="bi bi-people text-lg"></i>
                    24
                </span>
                <span className="inline-flex items-baseline gap-2">
                    <i className="bi bi-person-plus text-lg"></i>8
                </span>
            </div>
        </Link>
    );
}

export default function Home({ auth, classes }) {
    const addClassRef = useRef(null);

    return (
        <>
            <Head title="Classes \ Faculty" />
            <FacultyLayout user={auth.user} header={"Classes"}>
                <div className="grow flex gap-8">
                    <div className="grow">
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
                                <Class key={classObj.id} classObj={classObj} />
                            )) : (
                                <div className="md:h-40 min-h-20 px-6 py-2 col-span-2 flex flex-col justify-center items-center bg-gray-100 rounded-xl">
                                    <span className="md:text-xl font-semibold text-neutral">You don't have any classes, yet.</span>
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

                <CreateClassModal ref={addClassRef} />
            </FacultyLayout>
        </>
    );
}
