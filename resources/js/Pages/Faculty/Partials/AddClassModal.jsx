import Combobox from "@/Components/Combobox";
import { useForm } from "@inertiajs/react";
import { forwardRef } from "react";

const AddClassModal = forwardRef(({}, ref) => {
    const { data, setData } = useForm({
        course: "",
        section: "",
        subject: "",
    });

    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-visible">
                <h3 className="font-bold text-lg">Create a new class</h3>

                <form className="mt-4">
                    <div className="md:grid grid-cols-2 gap-2">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Course</span>
                            </div>
                            <Combobox
                                className={
                                    "w-full input input-sm input-bordered"
                                }
                                value={data.course}
                                onChange={(value) => setData("course", value)}
                                placeholder="Select a course"
                                options={[
                                    "Durward Reynolds",
                                    "Kenton Towne",
                                    "Therese Wunsch",
                                    "Benedict Kessler",
                                    "Katelyn Rohan",
                                ]}
                            />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Section</span>
                            </div>
                            <Combobox
                                className={
                                    "w-full input input-sm input-bordered"
                                }
                                value={data.section}
                                onChange={(value) => setData("section", value)}
                                placeholder="Select a section"
                                options={[
                                    "Durward Reynolds",
                                    "Kenton Towne",
                                    "Therese Wunsch",
                                    "Benedict Kessler",
                                    "Katelyn Rohan",
                                ]}
                            />
                        </label>
                    </div>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Subject</span>
                        </div>
                        <Combobox
                            className={"w-full input input-sm input-bordered"}
                            value={data.subject}
                            onChange={(value) => setData("subject", value)}
                            placeholder="Select a subject"
                            options={[
                                "Durward Reynolds",
                                "Kenton Towne",
                                "Therese Wunsch",
                                "Benedict Kessler",
                                "Katelyn Rohan",
                            ]}
                        />
                    </label>
                </form>

                <div className="modal-action">
                    <button
                        className="btn btn-sm"
                        onClick={() => ref.current.close()}
                    >
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
});

export default AddClassModal;
