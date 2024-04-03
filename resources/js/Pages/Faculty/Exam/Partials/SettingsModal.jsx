import { Link, useForm } from "@inertiajs/react";
import { forwardRef, useRef } from "react";

const SettingsModal = forwardRef(({ exam }, ref) => {
    const deleteRef = useRef(null);

    const {
        data,
        setData,
        patch,
        reset,
        setDefaults,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        title: exam.title,
        type: exam.type,
    });

    const save = (e) => {
        e.preventDefault();

        patch(route("faculty.exams.update", { exam: exam.id }), {
            onSuccess: () => setDefaults(data),
        });
    };

    const close = (e) => {
        e.preventDefault();
        ref.current.close();
        reset();
    };

    return (
        <>
            <dialog ref={ref} className="modal modal-bottom md:modal-middle">
                <div className="modal-box overflow-auto">
                    <h3 className="font-bold text-lg">Exam settings</h3>

                    <form id="update_exam" className="mt-4" onSubmit={save}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Title</span>
                            </div>
                            <input
                                type="text"
                                className="input input-sm input-bordered"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                required
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
                            <select
                                className="select select-sm select-bordered"
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                            >
                                <option value="Quiz">Quiz</option>
                                <option value="Midterm">Midterm</option>
                                <option value="Finals">Finals</option>
                            </select>
                            <div className="label">
                                <span className="label-text-alt text-error">
                                    {errors.title}
                                </span>
                            </div>
                        </label>
                    </form>

                    <div className="modal-action justify-between">
                        <div className="flex">
                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => deleteRef.current.showModal()}
                                disabled={processing}
                            >
                                Delete exam
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button
                                form="update_exam"
                                className="btn btn-sm btn-info"
                                disabled={processing}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-sm"
                                onClick={close}
                                disabled={processing}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    {recentlySuccessful && (
                        <div className="flex gap-2 text-sm font-medium text-success">
                            <i className="bi bi-check-circle-fill"></i>
                            Settings saved successfully.
                        </div>
                    )}
                </div>

                <form
                    method="dialog"
                    className="modal-backdrop"
                    onSubmit={close}
                >
                    <button className="cursor-default">close</button>
                </form>
            </dialog>

            <dialog
                ref={deleteRef}
                className="modal modal-bottom md:modal-middle"
            >
                <div className="modal-box md:overflow-auto">
                    <h3 className="font-bold text-lg">Delete exam</h3>

                    <p className="font-medium text-sm">
                        Are you sure you want to delete this exam? All data will
                        be lost permanently.
                    </p>

                    <div className="modal-action">
                        <Link
                            className="btn btn-sm btn-error"
                            as="button"
                            href={"#"}
                            method="delete"
                        >
                            Delete class
                        </Link>
                        <button
                            className="btn btn-sm"
                            onClick={() => deleteRef.current.close()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button className="cursor-default">close</button>
                </form>
            </dialog>
        </>
    );
});

export default SettingsModal;
