import { Link } from "@inertiajs/react";

export default function ClassCard({ classObj, href = '#', student = false }) {
    return (
        <Link
            href={href}
            className="px-6 py-2 flex flex-col bg-gray-100 rounded-xl drop-shadow-lg"
        >
            <div className="grow flex flex-col text-lg font-bold">
                <p className="text-maroon">{classObj.subject.name}</p>
                <p>{classObj.section.name}</p>
                <p className="font-medium text-base">{classObj.instructor.profile.full_name}</p>
            </div>
            <div className="flex gap-4">
                <span className="inline-flex items-baseline gap-2">
                    <i className="bi bi-people text-lg"></i>
                    24
                </span>
                <span className="inline-flex items-baseline gap-2">
                    <i className="bi bi-person-plus text-lg"></i>8
                </span>
                {(student && classObj.pivot.status === 'pending') && (
                    <span className="badge badge-secondary">
                        Pending
                    </span>
                )}
            </div>
        </Link>
    );
}