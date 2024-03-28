import FacultyLayout from "@/Layouts/FacultyLayout";
import ClassLayout from "./ClassLayout";

export default function Grades({ auth, classModel }) {
    return (
        <>
            <FacultyLayout user={auth.user}>
                <ClassLayout classModel={classModel}>
                    <div className="mt-8 card bg-gray-100">
                        <div className="card-body">
                            <h2 className="card-title">Students' Grades</h2>
                            <div className="flex">
                                <div className="overflow-x-auto w-0 grow">
                                    <table className="table table-pin-rows table-pin-cols">
                                        <thead>
                                            <tr>
                                                <th>Student</th>
                                                {classModel.exams.map((exam) => (
                                                    <td>{exam.title}</td>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classModel.students.map((student) => (
                                                <tr>
                                                    <th>
                                                        <div>
                                                            <p>{student.profile.full_name}</p>
                                                            <p className="text-gray-500">{student.username}</p>
                                                        </div>
                                                    </th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </ClassLayout>
            </FacultyLayout>
        </>
    );
}
