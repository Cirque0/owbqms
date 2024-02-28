import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head, Link } from "@inertiajs/react";

function Class({ classObj }) {
    return (
        <Link href="#" className="h-40 px-6 py-2 flex flex-col bg-gray-100 rounded-xl drop-shadow-lg">
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
                    <i className="bi bi-person-plus text-lg"></i>
                    8
                </span>
            </div>
        </Link>
    )
}

const testClasses = [
    {
        subject: {
            name: 'Web Development',
        },
        section: {
            name: 'BSIT 4-1N'
        }
    },
    {
        subject: {
            name: 'Information Assurance and Security 1',
        },
        section: {
            name: 'BSIT 4-1N'
        }
    },
]

export default function Classes({ auth }) {
    return (
        <>
            <Head title="Classes \ Faculty" />
            <FacultyLayout user={auth.user} header={"Classes"}>
                <div className="grow flex gap-8">
                    <div className="grow">
                        <h2 className="font-bold text-2xl">Your Classes</h2>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <button className="h-40 bg-gray-100 rounded-xl shadow-lg">
                                <span className="flex justify-center items-center gap-2 text-lg text-maroon font-bold">
                                    <i className="bi bi-plus-square text-2xl"></i>
                                    Add a new class
                                </span>
                            </button>

                            {testClasses.map((classObj) => (
                                <Class classObj={classObj} />
                            ))}
                        </div>
                    </div>

                    <div className="w-60 flex flex-col">
                        <h2 className="font-bold text-2xl">Ongoing Exams</h2>

                    </div>
                </div>
            </FacultyLayout>
        </>
    )
}