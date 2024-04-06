import { Head, Link } from "@inertiajs/react";
import ClassLayout from "@/Pages/Faculty/Class/ClassLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { useRef, useState } from "react";
import AcceptRequestModal from "./Partials/AcceptRequestModal";
import DenyRequestModal from "./Partials/DenyRequestModal";

export default function Class({ auth, classModel }) {
    const acceptRequestRef = useRef(null);
    const denyRequestRef = useRef(null);

    const [requestAccept, setRequestAccept] = useState(null);
    const [requestDeny, setRequestDeny] = useState(null);

    const openAcceptModal = (request) => {
        setRequestAccept(request);
        acceptRequestRef.current.showModal();
    };

    const openDenyModal = (request) => {
        setRequestDeny(request);
        denyRequestRef.current.showModal();
    };

    return (
        <>
            <Head
                title={`[${classModel.section.name}] ${classModel.subject.name}`}
            />
            <FacultyLayout user={auth.user}>
                <ClassLayout classModel={classModel}>
                    <div className="mt-8 card bg-gray-100">
                        <div className="card-body">
                            <h2 className="card-title">Pending requests</h2>
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th className="md:table-cell hidden">
                                            Birthdate
                                        </th>
                                        <th className="md:table-cell hidden">
                                            Contact Info
                                        </th>
                                        <th className="md:table-cell hidden"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classModel.requests.length ? (
                                        classModel.requests.map((request) => (
                                            <tr>
                                                <td>
                                                    <div>
                                                        <div className="font-bold">
                                                            {
                                                                request.profile
                                                                    .full_name
                                                            }
                                                        </div>
                                                        <div className="text-sm opacity-50">
                                                            {request.username}
                                                        </div>
                                                    </div>
                                                    <div className="md:hidden mt-2">
                                                        <div className="text-xs font-bold">
                                                            Birthdate
                                                        </div>
                                                        <div>
                                                            {new Date(
                                                                request.birthdate
                                                            ).toLocaleDateString(
                                                                "en-us",
                                                                {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="md:hidden mt-2">
                                                        <div className="text-xs font-bold">
                                                            Contact Info
                                                        </div>
                                                        <div>
                                                            <p>
                                                                {request.email}
                                                            </p>
                                                            <p>
                                                                {request.profile
                                                                    .contact_num ||
                                                                    ""}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ul className="md:hidden w-full menu menu-horizontal gap-2">
                                                        <li className="grow">
                                                            <button
                                                                className="btn btn-sm btn-success"
                                                                onClick={() =>
                                                                    openAcceptModal(
                                                                        request
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi bi-check-lg"></i>
                                                            </button>
                                                        </li>
                                                        <li className="grow">
                                                            <button
                                                                className="btn btn-sm btn-error"
                                                                onClick={() =>
                                                                    openDenyModal(
                                                                        request
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="md:table-cell hidden">
                                                    {new Date(
                                                        request.birthdate
                                                    ).toLocaleDateString(
                                                        "en-us",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </td>
                                                <td className="md:table-cell hidden">
                                                    <div>
                                                        <p>{request.email}</p>
                                                        <p>
                                                            {request.profile
                                                                .contact_num ||
                                                                ""}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="md:table-cell hidden">
                                                    <ul className="menu menu-horizontal gap-2">
                                                        <li>
                                                            <button
                                                                className="btn btn-sm btn-success"
                                                                onClick={() =>
                                                                    openAcceptModal(
                                                                        request
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi bi-check-lg"></i>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="btn btn-sm btn-error"
                                                                onClick={() =>
                                                                    openDenyModal(
                                                                        request
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4}>
                                                <div className="grow flex justify-center items-center">
                                                    <div className="flex items-center gap-2 sm:text-base text-gray-500">
                                                        <i className="bi bi-people text-xl"></i>
                                                        <h2 className="font-bold">
                                                            There are no pending
                                                            requests.
                                                        </h2>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8 card bg-gray-100">
                        <div className="card-body">
                            <h2 className="card-title">Enrolled Students</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th className="md:table-cell hidden">
                                            Birthdate
                                        </th>
                                        <th className="md:table-cell hidden">
                                            Contact Info
                                        </th>
                                        <th className="md:table-cell hidden"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classModel.students.length ? (
                                        classModel.students.map((student) => (
                                            <tr>
                                                <td>
                                                    <div>
                                                        <div className="font-bold">
                                                            {
                                                                student.profile
                                                                    .full_name
                                                            }
                                                        </div>
                                                        <div className="text-sm opacity-50">
                                                            {student.username}
                                                        </div>
                                                        <div className="md:hidden mt-2">
                                                            <div className="text-xs font-bold">
                                                                Birthdate
                                                            </div>
                                                            <div>
                                                                {new Date(
                                                                    student.birthdate
                                                                ).toLocaleDateString(
                                                                    "en-us",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "short",
                                                                        day: "numeric",
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="md:hidden mt-2">
                                                            <div className="text-xs font-bold">
                                                                Contact Info
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    {
                                                                        student.email
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {student
                                                                        .profile
                                                                        .contact_num ||
                                                                        ""}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="md:table-cell hidden">
                                                    {new Date(
                                                        student.birthdate
                                                    ).toLocaleDateString(
                                                        "en-us",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </td>
                                                <td className="md:table-cell hidden">
                                                    <div>
                                                        <p>{student.email}</p>
                                                        <p>
                                                            {student.profile
                                                                .contact_num ||
                                                                ""}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="flex">
                                                    <div className="dropdown dropdown-end dropdown-top">
                                                        <div
                                                            tabIndex={0}
                                                            role="button"
                                                            className="btn btn-circle btn-ghost"
                                                        >
                                                            <i className="bi-three-dots-vertical"></i>
                                                        </div>
                                                        <ul
                                                            tabIndex={0}
                                                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit"
                                                        >
                                                            <li>
                                                                <Link
                                                                    href={route(
                                                                        "faculty.classes.students.remove",
                                                                        {
                                                                            class: classModel.id,
                                                                            student:
                                                                                student.id,
                                                                        }
                                                                    )}
                                                                    as="button"
                                                                    method="delete"
                                                                    className="text-error"
                                                                >
                                                                    <i className="bi bi-person-x"></i>
                                                                    Remove
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4}>
                                                <div className="grow flex justify-center items-center">
                                                    <div className="flex items-center gap-2 sm:text-base text-gray-500">
                                                        <i className="bi bi-people text-xl"></i>
                                                        <h2 className="font-bold">
                                                            There are no
                                                            students enrolled,
                                                            yet.
                                                        </h2>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ClassLayout>

                <AcceptRequestModal
                    ref={acceptRequestRef}
                    classId={classModel.id}
                    request={requestAccept}
                />

                <DenyRequestModal
                    ref={denyRequestRef}
                    classId={classModel.id}
                    request={requestDeny}
                />
            </FacultyLayout>
        </>
    );
}
