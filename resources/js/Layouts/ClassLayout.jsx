import { Link } from "@inertiajs/react";

export default function ClassLayout({ classModel, children }) {
    return (
        <div className="grow flex gap-8">
            <div className="grow">
                <div className="flex">
                    <div className="grow">
                        <h3 className="font-bold text-gray-600 md:text-base text-sm">{classModel.section.name}</h3>
                        <h2 className="font-bold md:text-2xl text-lg">
                            {classModel.subject.name}
                        </h2>
                        {classModel.instructor && (
                            <h3 className="flex gap-2 font-medium md:text-base text-sm">
                                <i className="bi bi-person-video3"></i>
                                {classModel.instructor.profile.full_name}
                            </h3>
                        )}
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-md btn-ghost btn-circle"
                        >
                            <i className="bi bi-three-dots-vertical"></i>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu menu-xs p-2 shadow bg-base-100 rounded-box w-max"
                        >
                            {route().current('faculty.*') ? (
                                <li>
                                    <Link
                                        className="text-error font-medium"
                                        as="button"
                                        href={route("faculty.classes.destroy", {
                                            class: classModel.id,
                                        })}
                                        method="delete"
                                    >
                                        <i className="bi bi-trash"></i>
                                        Delete class
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link
                                        className="text-error font-medium"
                                        as="button"
                                        href={route("student.classes.destroy", {
                                            class: classModel.id,
                                        })}
                                        method="delete"
                                    >
                                        <i className="bi bi-box-arrow-left"></i>
                                        Leave class
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div role="tablist" className="mt-4 tabs tabs-bordered">
                    <Link href={route('faculty.classes.show', {class: classModel.id})} role="tab" className={`tab ${route().current('faculty.classes.show') ? 'tab-active' : ''}`}>
                        Students
                    </Link>
                    <a role="tab" className="tab">
                        Examinations
                    </a>
                    <a role="tab" className="tab">
                        Grades
                    </a>
                </div>
            
                {children}
            </div>

            <div className="md:card hidden w-full max-w-xs bg-gray-100">
                <div className="card-body">
                    <h2 className="card-title">Ongoing Exams</h2>

                </div>
            </div>
        </div>
    );
}
