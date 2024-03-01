import FacultyLayout from "@/Layouts/FacultyLayout";
import { Link } from "@inertiajs/react";

export default function ClassLayout({ user, classModel, children }) {
    return (
        <FacultyLayout user={user}>
            {/* {JSON.stringify(classModel)} */}
            <div className="grow flex gap-8">
                <div className="grow">
                    <div>
                        <h2 className="font-bold md:text-2xl text-lg">
                            {classModel.subject.name}
                        </h2>
                        <h3 className="font-bold text-gray-600">{classModel.section.name}</h3>
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
        </FacultyLayout>
    );
}
