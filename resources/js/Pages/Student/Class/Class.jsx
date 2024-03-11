import ClassLayout from "@/Layouts/ClassLayout";
import StudentLayout from "@/Layouts/StudentLayout";

export default function Class({ auth, classModel }) {
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
                                    <th>Birthdate</th>
                                    <th>Contact No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classModel.students.length ? (
                                    classModel.students.map((student) => (
                                        <tr>
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
                                                </div>
                                            </td>
                                            <td>
                                                {new Date(
                                                    student.birthdate
                                                ).toLocaleDateString("en-us", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td>
                                                {student.profile.contact_num ||
                                                    "No contact number."}
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
