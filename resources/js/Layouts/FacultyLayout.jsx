import { Link } from "@inertiajs/react";

export default function FacultyLayout({ user, header, children }) {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="sticky top-0 z-40 w-full navbar bg-primary text-white">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="md:flex hidden flex-1 px-4 mx-2">
                        <img
                            src="/images/LBQMS Logo.png"
                            alt="OWBQMS logo"
                            className="md:block hidden h-16"
                        />
                    </div>
                    <div className="px-4 font-bold">
                        <ul className="menu md:menu-horizontal hidden w-full text-base">
                            <li>
                                <div className="menu-title divider py-0 my-0"></div>
                            </li>
                            <li>
                                <Link href={route("faculty.home")}>
                                    <i className="bi bi-mortarboard"></i>
                                    Classes
                                </Link>
                            </li>
                            <li>
                                <Link href={route("faculty.exams.index")}>
                                    <i className="bi bi-journal-text"></i>
                                    Exams
                                </Link>
                            </li>
                            <li>
                                <details>
                                    <summary>
                                        <i className="bi bi-person-circle"></i>
                                        {user.username}
                                    </summary>
                                    <ul className="text-neutral text-base">
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-gear"></i>
                                                Settings
                                            </a>
                                        </li>
                                        <li className="text-error">
                                            <Link
                                                href={route("logout")}
                                                as="button"
                                                method="post"
                                            >
                                                <i className="bi bi-box-arrow-right"></i>
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <main className="min-h-screen md:px-40 px-4 md:py-12 py-6 gap-8">
                    {children}
                </main>
            </div>
            <div className="drawer-side z-50">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu text-lg p-4 w-80 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                    <li>
                        <details>
                            <summary>
                                <i className="bi bi-person-circle"></i>
                                {user.username}
                            </summary>
                            <ul className="text-base">
                                <li>
                                    <a href="#">
                                        <i className="bi bi-gear"></i>
                                        Settings
                                    </a>
                                </li>
                                <li className="text-error">
                                    <Link
                                        href={route("logout")}
                                        as="button"
                                        method="post"
                                    >
                                        <i className="bi bi-box-arrow-right"></i>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <div className="menu-title divider py-0 my-0"></div>
                    </li>
                    <li>
                        <Link href={route("faculty.home")}>
                            <i className="bi bi-mortarboard"></i>
                            Classes
                        </Link>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bi bi-journal-text"></i>
                            Exams
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
