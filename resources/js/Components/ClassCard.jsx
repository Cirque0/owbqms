import { Link } from "@inertiajs/react";

export default function ClassCard({
    classObj,
    href = "#",
    student = false,
    disabled = false,
}) {
    return (
        <div className="px-4 py-2 flex justify-between bg-gray-100 roundex-xl drop-shadow-lg">
            <Link
                as="button"
                href={href}
                className="flex flex-col grow"
                disabled={disabled}
            >
                <div className="grow flex flex-col text-lg font-bold items-start">
                    <p className="text-maroon">{classObj.subject.name}</p>
                    <p>{classObj.section.name}</p>
                    {student && (
                        <p className="flex gap-2 font-medium text-sm">
                            <i className="bi bi-person-video3"></i>
                            {classObj.instructor.profile.full_name}
                        </p>
                    )}
                </div>
                <div className="flex gap-4 mt-2 font-medium">
                    {!student && (
                        <>
                            <span className="inline-flex items-baseline gap-2">
                                <i className="bi bi-people-fill text-lg"></i>
                                {classObj.students_count}
                            </span>
                            <span className="inline-flex items-baseline gap-2">
                                <i className="bi bi-person-plus-fill text-lg"></i>
                                {classObj.requests_count}
                            </span>
                        </>
                    )}
                    {student && classObj.pivot.status === "pending" && (
                        <span className="badge badge-secondary">Pending</span>
                    )}
                </div>
            </Link>
            {student && classObj.pivot.status === "pending" && (
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-xs btn-ghost btn-circle"
                    >
                        <i className="bi bi-three-dots-vertical"></i>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu menu-xs p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link
                                className="text-error font-medium"
                                as="button"
                                href={route("student.requests.cancel", {
                                    class: classObj.id,
                                })}
                                method="delete"
                            >
                                <i className="bi bi-x-lg"></i>
                                Cancel Request
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
