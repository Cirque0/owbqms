import { Link, useForm } from "@inertiajs/react";
import { forwardRef, useRef } from "react";

const SettingsModal = forwardRef(({ classModel }, ref) => {
    const deleteRef = useRef(null);
    const { data, setData, reset, setDefaults, patch, processing, recentlySuccessful } =
        useForm({
            is_registration_open: classModel.is_registration_open,
        });

    const save = (e) => {
        e.preventDefault();
        patch(route("faculty.classes.update", { class: classModel.id }), {
            onSuccess: () => {
                setDefaults('is_registration_open', data.is_registration_open);
            }
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
                <div className="modal-box md:overflow-auto">
                    <h3 className="font-bold text-lg">Class settings</h3>

                    <form id="update_class" className="mt-4" onSubmit={save}>
                        <label className="label">
                            <span className="label-text">
                                Allow requests to join
                            </span>
                            <input
                                type="checkbox"
                                className="toggle toggle-sm toggle-primary"
                                checked={data.is_registration_open}
                                onChange={(e) =>
                                    setData(
                                        "is_registration_open",
                                        e.target.checked
                                    )
                                }
                            />
                        </label>
                    </form>

                    <div className="mt-4">
                        <label className="label">
                            <span className="label-text">
                                Delete this class
                            </span>
                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => deleteRef.current.showModal()}
                                disabled={processing}
                            >
                                Delete
                            </button>
                        </label>
                    </div>

                    <div className="modal-action">
                        <button
                            form="update_class"
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

                    {recentlySuccessful && (
                        <div className="text-sm font-medium text-success">
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
                    <h3 className="font-bold text-lg">Delete class</h3>

                    <p className="font-medium text-sm">
                        Are you sure you want to delete this class? All data
                        will be lost permanently.
                    </p>

                    <div className="modal-action">
                        <Link
                            className="btn btn-sm btn-error"
                            as="button"
                            href={route("faculty.classes.destroy", {
                                class: classModel.id,
                            })}
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
