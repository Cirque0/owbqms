import Combobox from "@/Components/Combobox";
import { useForm } from "@inertiajs/react";
import { forwardRef, useEffect } from "react";

const CreateExamModal = forwardRef(({ subjects }, ref) => {
    const { data, setData, post, reset, errors, processing } = useForm({
        title: "",
        type: "",
        subject: "",
    });

    const create = (e) => {
        e.preventDefault();
        post(route("faculty.exams.store"), {
            onSuccess: () => {
                ref.current.close();
                reset();
            },
        });
    };

    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-visible">
                <h3 className="font-bold text-lg">Create a new exam</h3>

                <form id="create_form" className="mt-4" onSubmit={create}>
                    <div className="md:grid grid-cols-2 gap-2">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Title</span>
                            </div>
                            <input
                                type="text"
                                className="w-full input input-sm input-bordered"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Enter a title"
                            />
                            <div className="label">
                                <span className="label-text-alt text-error">
                                    {errors.title}
                                </span>
                            </div>
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Type</span>
                            </div>
                            <Combobox
                                className={'w-full input input-sm input-bordered'}
                                value={data.type}
                                onChange={(value) => setData("type", value)}
                                placeholder="Select exam type"
                                options={[
                                    'Quiz',
                                    'Midterm',
                                    'Finals',
                                ]}
                                disableInput
                                canCreateOptions={false}
                            />
                            <div className="label">
                                <span className="label-text-alt text-error">
                                    {errors.type}
                                </span>
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
                            options={subjects}
                            disableInput
                            canCreateOptions={false}
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.subject}
                            </span>
                        </div>
                    </label>
                </form>

                <div className="modal-action">
                    <button
                        className="btn btn-sm btn-info"
                        form="create_form"
                        disabled={processing}
                    >
                        {processing && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
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

            <form method="dialog" className="modal-backdrop">
                <button className="cursor-default">close</button>
            </form>
        </dialog>
    );
});

export default CreateExamModal;
