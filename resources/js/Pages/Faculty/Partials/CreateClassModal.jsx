import Combobox from "@/Components/Combobox";
import { useForm } from "@inertiajs/react";
import { forwardRef } from "react";

const CreateClassModal = forwardRef(({}, ref) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            course: "",
            section: "",
            subject: "",
        });

    const create = (e) => {
        e.preventDefault();
        post(route("faculty.classes.store"), {
            onSuccess: () => ref.current.close(),
        });
    };

    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-visible">
                <h3 className="font-bold text-lg">Create a new class</h3>

                <form id="create_form" className="mt-4" onSubmit={create}>
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
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.course}</span>
                            </div>
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
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.section}</span>
                            </div>
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
                        <div className="label">
                            <span className="label-text-alt text-error">{errors.subject}</span>
                        </div>
                    </label>
                </form>

                <div className="modal-action">
                    <button
                        className="btn btn-sm btn-info"
                        form="create_form"
                        disabled={processing}
                    >
                        Create new class
                    </button>
                    <button
                        className="btn btn-sm"
                        onClick={() => ref.current.close()}
                        disabled={processing}
                    >
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
});

export default CreateClassModal;
