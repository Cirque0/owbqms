import ExamLayout from "@/Layouts/ExamLayout";
import FacultyLayout from "@/Layouts/FacultyLayout";
import { Head } from "@inertiajs/react";

export default function AssignedClasses({ auth, exam }) {
    return (
        <>
            <Head title={`${exam.title} (${exam.subject.name}) / Faculty`} />
            <FacultyLayout user={auth.user}>
                <ExamLayout exam={exam}>
                    <div className="mt-4 card w-full bg-gray-100">
                        <div className="card-body">
                            <h2 className="card-title">Assigned Classes</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Class</th>
                                        <th>Specifications</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div>
                                                <p className="font-bold">BSIT 4-1N</p>
                                                <p className="font-medium">Web Development</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-xs max-w-40">
                                                <div className="flex justify-between">
                                                    <span className="font-bold">Passing Score</span>
                                                    <span>75%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-bold">Exam Period</span>
                                                    <span>60 mins</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {/* <span className="badge badge-error text-white">Closed</span> */}
                                                <span className="text-xs font-bold">Open until</span>
                                                <p className="">
                                                    2024-03-11 19:00
                                                </p>
                                                
                                            </div>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-circle btn-ghost">
                                                <i className="bi bi-three-dots-vertical"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ExamLayout>
            </FacultyLayout>
        </>
    )
}