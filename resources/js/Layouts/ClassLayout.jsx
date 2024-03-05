import { Link } from "@inertiajs/react";

export default function ClassLayout({ classModel, children }) {
    return (
        <div className="grow flex gap-8">
            <div className="grow">
                <div>
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
