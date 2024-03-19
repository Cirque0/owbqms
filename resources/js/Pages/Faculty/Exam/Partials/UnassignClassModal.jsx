import { router } from "@inertiajs/react";
import { forwardRef, useState } from "react";

const UnassignClassModal = forwardRef(({ exam, classModel }, ref) => {
    const [processing, setProcessing] = useState(false);

    const destroy = () => {
        setProcessing(true);
        router.delete(route("faculty.exams.classes.destroy", { exam: exam?.id, class: classModel?.id }), {
            onSuccess: () => ref.current.close(),
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-auto">
                <h3 className="font-bold text-lg">Are you sure you want to unassign the exam for this class?</h3>

                <div className="mt-4 p-2 text-sm bg-gray-100 border-l-4 border-gray-400">
                    <p className="text-xs font-bold">{classModel?.section.name}</p>
                    <p className="mt-2 italic">
                        {exam?.subject.name} - {exam?.title}
                    </p>
                </div>

                <div className="modal-action">
                    <button
                        className="btn btn-sm btn-error text-white"
                        onClick={destroy}
                        disabled={processing}
                    >
                        {processing && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
                        Unassign
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

export default UnassignClassModal;
