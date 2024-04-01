import StudentLayout from "@/Layouts/StudentLayout";
import ClassLayout from "./ClassLayout";

export default function Students({ auth, classModel }) {
    return (
        <StudentLayout user={auth.user}>
            <ClassLayout classModel={classModel}>
                <div className="mt-8 card bg-gray-100">
                    <div className="card-body">
                        <h2 className="card-title">Enrolled Students</h2>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className="md:table-cell hidden">
                                        Birthdate
                                    </th>
                                    <th className="md:table-cell hidden">
                                        Contact Info
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="font-medium">
                                {classModel.students.length ? (
                                    classModel.students.map((student) => (
                                        <tr key={student.id}>
                                            <td>
                                                <div>
                                                    <div className="font-bold">
                                                        {
                                                            student.profile
                                                                .full_name
                                                        }
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        {student.username}
                                                    </div>
                                                    <div className="md:hidden mt-2">
                                                        <div className="text-xs font-bold">
                                                            Birthdate
                                                        </div>
                                                        <div>
                                                            {new Date(
                                                                student.birthdate
                                                            ).toLocaleDateString(
                                                                "en-us",
                                                                {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="md:hidden mt-2">
                                                        <div className="text-xs font-bold">
                                                            Contact Info
                                                        </div>
                                                        <div>
                                                            <p>
                                                                {student.email}
                                                            </p>
                                                            <p>
                                                                {student.profile
                                                                    .contact_num ||
                                                                    ""}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="md:table-cell hidden">
                                                {new Date(
                                                    student.birthdate
                                                ).toLocaleDateString("en-us", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="md:table-cell hidden">
                                                <div>
                                                    <p>{student.email}</p>
                                                    <p>
                                                        {student.profile
                                                            .contact_num || ""}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            There are no students enrolled, yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ClassLayout>
        </StudentLayout>
    );
}
