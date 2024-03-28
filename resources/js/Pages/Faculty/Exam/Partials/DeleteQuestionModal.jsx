import { router, useForm } from "@inertiajs/react";
import { forwardRef, useState } from "react";

const DeleteQuestionModal = forwardRef(({ question }, ref) => {
    const { delete: destroy, errors, processing } = useForm();

    // const [processing, setProcessing] = useState(false);

    // const destroy = () => {
    //     setProcessing(true);
    //     router.delete(route("faculty.questions.destroy", { question: question?.id }), {
    //         onSuccess: () => ref.current.close(),
    //         onFinish: () => setProcessing(false),
    //     });
    // }

    const deleteQuestion = () => {
        destroy(route("faculty.questions.destroy", { question: question?.id }), {
            preserveScroll: true,
            onSuccess: () => ref.current.close(),
        });
    }

    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-auto">
                <h3 className="font-bold text-lg">Are you sure you want to delete this question?</h3>

                <div className="mt-4 p-2 text-sm bg-gray-100 border-l-4 border-gray-400">
                    <p className="text-xs font-bold">{question?.type}</p>
                    <p className="mt-2 italic">
                        {question?.description}
                    </p>
                </div>

                <div className="label">
                    <span className="label-text-alt text-error">
                        {errors.question}
                    </span>
                </div>

                <div className="modal-action">
                    <button
                        className="btn btn-sm btn-error text-white"
                        onClick={deleteQuestion}
                        disabled={processing}
                    >
                        {processing && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
                        Delete question
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

export default DeleteQuestionModal;
