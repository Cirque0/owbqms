import { router, useForm } from "@inertiajs/react";
import { forwardRef, useState } from "react";

const AssignClassModal = forwardRef(({ exam, classes }, ref) => {
    const { data, setData, errors, processing } = useForm({
        class_id: "",
        passing_score: 75,
        exam_period: 60,
    });

    const submit = (e) => {
        // e.preventDefault();
    };

    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-auto">
                <h3 className="font-bold text-lg">Assign exam to class</h3>

                <form id="assign_class" className="mt-4" onSubmit={submit}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Class</span>
                        </div>
                        <select
                            className="select select-sm select-bordered"
                            value={data.class_id}
                            onChange={(e) =>
                                setData("class_id", e.target.value)
                            }
                            required
                        >
                            <option value="" disabled>Select a class</option>
                            {classes.length &&
                                classes.map((classModel) => (
                                    <option key={classModel.id} value={classModel.id}>
                                        {classModel.section.name}
                                    </option>
                                ))}
                        </select>
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.class_id}
                            </span>
                        </div>
                    </label>

                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">
                                    Passing Score (%)
                                </span>
                            </div>
                            <input
                                type="number"
                                className="input input-sm input-bordered"
                                value={data.passing_score}
                                onChange={(e) =>
                                    setData("passing_score", e.target.value)
                                }
                                required
                                placeholder="Enter passing score"
                                min={1}
                                max={100}
                            />
                            <div className="label">
                                <span className="label-text-alt text-error">
                                    {errors.passing_score}
                                </span>
                            </div>
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">
                                    Exam Period (minutes)
                                </span>
                            </div>
                            <input
                                type="text"
                                className="input input-sm input-bordered"
                                value={data.exam_period}
                                onChange={(e) =>
                                    setData("exam_period", e.target.value)
                                }
                                required
                                placeholder="Enter exam period in minutes"
                            />
                            <div className="label">
                                <span className="label-text-alt text-error">
                                    {errors.passing_score}
                                </span>
                            </div>
                        </label>
                    </div>
                </form>

                <div className="modal-action">
                    <button
                        className="btn btn-sm btn-error text-white"
                        form="assign_class"
                        disabled={processing}
                    >
                        {processing && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
                        Assign exam
                    </button>
                    <button
                        className="btn btn-sm"
                        onClick={() => ref.current.close()}
                        disabled={processing}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button className="cursor-default">close</button>
            </form>
        </dialog>
    );
});

export default AssignClassModal;
