import { Head, Link } from "@inertiajs/react";
import ClassLayout from "@/Layouts/ClassLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";

export default function Class({ auth, classModel }) {
    return (
        <>
            <Head
                title={`[${classModel.section.name}] ${classModel.subject.name}`}
            />
            <FacultyLayout user={auth.user}>
                <ClassLayout user={auth.user} classModel={classModel}>
                    <div className="mt-8 card bg-gray-100">
                        <div className="card-body">
                            <h2 className="card-title">Pending requests</h2>
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Birthdate</th>
                                        <th>Contact No.</th>
                                        <th></th>
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
                                                </td>
                                                <td>
                                                    {new Date(
                                                        request.birthdate
                                                    ).toLocaleDateString("en-us", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </td>
                                                <td>
                                                    {request.profile.contact_num ||
                                                        "No contact number."}
                                                </td>
                                                <td>
                                                    <ul className="menu menu-horizontal gap-2">
                                                        <li>
                                                            <Link
                                                                href={route(
                                                                    "faculty.classes.requests.accept",
                                                                    {
                                                                        class: classModel.id,
                                                                        student:
                                                                            request.id,
                                                                    }
                                                                )}
                                                                as="button"
                                                                method="post"
                                                                className="btn btn-sm btn-success"
                                                            >
                                                                <i className="bi bi-check-lg"></i>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href={route(
                                                                    "faculty.classes.requests.deny",
                                                                    {
                                                                        class: classModel.id,
                                                                        student:
                                                                            request.id,
                                                                    }
                                                                )}
                                                                as="button"
                                                                method="delete"
                                                                className="btn btn-sm btn-error"
                                                            >
                                                                <i className="bi bi-x-lg"></i>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center">
                                                There are no pending requests.
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
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Birthdate</th>
                                        <th>Contact No.</th>
                                        <th></th>
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
                                                    </div>
                                                </td>
                                                <td>
                                                    {new Date(
                                                        student.birthdate
                                                    ).toLocaleDateString("en-us", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </td>
                                                <td>
                                                    {student.profile.contact_num ||
                                                        "No contact number."}
                                                </td>
                                                <td>
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
                                            <td colSpan={4} className="text-center">
                                                There are no students enrolled, yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ClassLayout>
            </FacultyLayout>
        </>
    );
}
