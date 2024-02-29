import FacultyLayout from "@/Layouts/FacultyLayout";

export default function ClassLayout({ user, classModel, children }) {
    return (
        <FacultyLayout user={user}>
            {/* {JSON.stringify(classModel)} */}
            <div className="grow flex gap-8">
                <div className="grow">
                    <h2 className="font-bold text-2xl">
                        [{classModel.section.name}] {classModel.subject.name}
                    </h2>

                    <div role="tablist" className="tabs tabs-bordered">
                        <a role="tab" className="tab">
                            Students
                        </a>
                        <a role="tab" className="tab tab-active">
                            Join Requests
                        </a>
                        <a role="tab" className="tab">
                            Examinations
                        </a>
                        <a role="tab" className="tab">
                            Grades
                        </a>
                    </div>
                
                    {children}
                </div>

                <div className="w-60 hidden md:flex flex-col">
                    <h2 className="font-bold text-2xl">Ongoing Exams</h2>
                </div>
            </div>
        </FacultyLayout>
    );
}
