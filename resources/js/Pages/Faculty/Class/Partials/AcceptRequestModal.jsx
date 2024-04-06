import { Link } from "@inertiajs/react";
import { forwardRef } from "react";

const AcceptRequestModal = forwardRef(({ classId, request }, ref) => {
    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-auto">
                <h3 className="font-bold text-lg">Accept student</h3>

                <div className="mt-4">
                    <p className="font-medium">
                        Do you want to accept{" "}
                        <span className="italic font-bold">
                            {request?.profile.full_name}
                        </span>{" "}
                        to your class?
                    </p>
                </div>

                <div className="modal-action">
                    <Link
                        href={route("faculty.classes.requests.accept", {
                            class: classId,
                            student: request?.id || 0,
                        })}
                        as="button"
                        method="post"
                        className="btn btn-sm btn-success"
                        onClick={() => ref.current.close()}
                    >
                        <i className="bi bi-check-lg"></i>
                        Accept
                    </Link>
                    <button
                        className="btn btn-sm"
                        onClick={() => ref.current.close()}
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

export default AcceptRequestModal;
