import { Link } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function ClassLayout({ classModel, children }) {
    const codeModalRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(classModel.id);
        setCopied(true);
    };

    return (
        <>
            <div className="grow flex gap-8">
                <div className="grow max-w-4xl">
                    <div className="flex">
                        <div className="grow">
                            <h3 className="font-bold text-gray-600 md:text-base text-sm">
                                {classModel.section.name}
                            </h3>
                            <h2 className="font-bold md:text-2xl text-lg">
                                {classModel.subject.name}
                            </h2>
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
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max"
                            >
                                <li>
                                    <button
                                        onClick={() =>
                                            codeModalRef.current.showModal()
                                        }
                                    >
                                        <i className="bi bi-share"></i>
                                        Share code
                                    </button>
                                </li>
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
                            </ul>
                        </div>
                    </div>

                    <div role="tablist" className="mt-4 tabs tabs-bordered">
                        <Link
                            href={route("faculty.classes.show", {
                                class: classModel.id,
                            })}
                            role="tab"
                            className={`tab ${
                                route().current("faculty.classes.show")
                                    ? "tab-active"
                                    : ""
                            }`}
                        >
                            Students
                        </Link>
                        <Link
                            href={route("faculty.classes.exams.index", {
                                class: classModel.id,
                            })}
                            role="tab"
                            className={`tab ${
                                route().current("faculty.classes.exams.index")
                                    ? "tab-active"
                                    : ""
                            }`}
                        >
                            Examinations
                        </Link>
                        <Link
                            href={route("faculty.classes.grades.index", {
                                class: classModel.id,
                            })}
                            role="tab"
                            className={`tab ${
                                route().current("faculty.classes.grades.*")
                                    ? "tab-active"
                                    : ""
                            }`}
                        >
                            Grades
                        </Link>
                    </div>

                    {children}
                </div>
            </div>

            <dialog
                ref={codeModalRef}
                className="modal modal-bottom md:modal-middle"
            >
                <div className="modal-box md:overflow-visible">
                    <h3 className="font-bold text-lg">Class code</h3>

                    <div className="mt-4 flex w-full input input-sm input-bordered">
                        <p type="text" className="grow select-all">
                            {classModel.id}
                        </p>
                        <button className="btn btn-sm btn-ghost" onClick={copy}>
                            <i className="bi bi-copy"></i>
                        </button>
                    </div>

                    {copied && (
                        <p className="mt-4 flex gap-1 text-sm">
                            <i className="bi bi-check-circle-fill text-success"></i>
                            Class code has been copied to clipboard!
                        </p>
                    )}

                    <div className="modal-action">
                        <button
                            className="btn btn-sm"
                            onClick={() => codeModalRef.current.close()}
                        >
                            Close
                        </button>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button className="cursor-default">close</button>
                </form>
            </dialog>
        </>
    );
}
