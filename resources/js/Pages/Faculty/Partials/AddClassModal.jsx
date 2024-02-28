import { useForm } from "@inertiajs/react";
import { forwardRef } from "react";

const AddClassModal = forwardRef(({}, ref) => {
    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create a new class</h3>

                <form className="mt-4">
                    <div className="md:grid grid-cols-2 gap-2">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">
                                    Course
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Select a course"
                                className="input input-sm input-bordered w-full"
                            />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">
                                    Section
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Select a section"
                                className="input input-sm input-bordered w-full"
                            />
                        </label>
                    </div>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">
                                Subject
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Select a subject"
                            className="input input-sm input-bordered w-full"
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
