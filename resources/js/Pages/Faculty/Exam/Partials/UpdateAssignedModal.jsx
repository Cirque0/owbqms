import { router, useForm } from "@inertiajs/react";
import { forwardRef, useEffect, useState } from "react";

const UpdateAssignedModal = forwardRef(({ exam, classModel, pivot }, ref) => {
    const { data, setData, patch, reset, errors, processing } = useForm({
        passing_score: "",
        exam_period: "",
        is_answers_shown: false,
    });

    useEffect(() => {
        setData({
            passing_score: pivot?.passing_score || "",
            exam_period: pivot?.exam_period || "",
            is_answers_shown: pivot?.is_answers_shown || false,
        });
    }, [pivot]);

    const submit = (e) => {
        e.preventDefault();

        patch(
            route("faculty.exams.classes.update", {
                exam: exam.id,
                class: classModel.id,
            }),
            {
                onSuccess: () => {
                    ref.current.close();
                    reset();
                },
            }
        );
    };

    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-auto">
                <h3 className="font-bold text-lg">Assign exam to class</h3>

                <form id="update_assigned" className="mt-4" onSubmit={submit}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Class</span>
                        </div>
                        <input
                            type="text"
                            className="input input-sm input-bordered font-bold"
                            value={classModel?.section.name || ""}
                            readOnly
                        />
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
                                type="number"
                                className="input input-sm input-bordered"
                                value={data.exam_period}
                                onChange={(e) =>
                                    setData("exam_period", e.target.value)
                                }
                                required
                                placeholder="Enter exam period in minutes"
                                min={1}
                            />
                            <div className="label">
                                <span className="label-text-alt text-error">
                                    {errors.exam_period}
                                </span>
                            </div>
                        </label>
                    </div>

                    <label className="label">
                        <span className="label-text">
                            Show answers after submitting
                        </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-sm toggle-primary"
                            checked={data.is_answers_shown}
                            onChange={(e) =>
                                setData("is_answers_shown", e.target.checked)
                            }
                        />
                    </label>
                </form>

                <div className="modal-action">
                    <button
                        className="btn btn-sm btn-info text-white"
                        form="update_assigned"
                        disabled={processing}
                    >
                        {processing && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
                        Update
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

export default UpdateAssignedModal;
