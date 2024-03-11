import Combobox from "@/Components/Combobox";
import { useForm } from "@inertiajs/react";
import { forwardRef } from "react";

const JoinClassModal = forwardRef(({}, ref) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            class_code: "",
        });

    const join = (e) => {
        e.preventDefault();
        post(route("student.classes.store"));
    };

    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-visible">
                <h3 className="font-bold text-lg">Join a class</h3>

                <form id="join_form" className="mt-4" onSubmit={join}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Class Code</span>
                        </div>
                        <input
                            type="text"
                            className="w-full input input-sm input-bordered"
                            value={data.class_code}
                            onChange={(e) =>
                                setData("class_code", e.target.value)
                            }
                            placeholder="Enter the class code"
                        />

                        <div className="label flex-col items-start">
                            <span className="label-text-alt text-error">
                                {errors.class_code}
                            </span>
                        </div>
                    </label>
                </form>

                {recentlySuccessful && (
                    <p className="flex gap-1 text-sm">
                        <i className="bi bi-check-circle-fill text-success"></i>
                        A request to join the class has been sent!
                    </p>
                )}

                <div className="modal-action">
                    <button
                        className="btn btn-sm btn-info"
                        form="join_form"
                        disabled={processing}
                    >
                        {processing && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
                        Request to join
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

export default JoinClassModal;
