import Guest from "@/Layouts/GuestLayout";
import { Link, Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <Guest>
                <h2 className="mt-16 text-center text-2xl font-bold text-white">Welcome!</h2>

                <div className="mx-4 mt-12 flex flex-col gap-4 text-white">
                    <p className="text-center text-xl">Login as...</p>
                    <Link
                        href={route("student.login")}
                        className="btn btn-secondary btn-lg"
                    >
                        Student
                    </Link>
                    <div className="divider before:bg-white after:bg-white">
                        OR
                    </div>
                    <Link
                        href={route("faculty.login")}
                        className="btn btn-secondary btn-lg"
                    >
                        Faculty
                    </Link>
                </div>
            </Guest>
        </>
    );
}
