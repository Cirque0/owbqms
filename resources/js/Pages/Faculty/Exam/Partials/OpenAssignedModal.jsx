import { router, useForm } from "@inertiajs/react";
import { forwardRef, useState } from "react";

const OpenAssignedModal = forwardRef(({ exam, classModel, pivot }, ref) => {
    const { patch, errors, processing } = useForm({});

    const open = () => {
        patch(
            route("faculty.exams.classes.open", {
                exam: exam?.id,
                class: classModel?.id,
            }),
            {
                onSuccess: () => ref.current.close(),
            }
        );
    };

    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-auto">
                <h3 className="font-bold text-lg">
                    Are you sure you want to open the exam for this class?
                </h3>

                <div className="mt-4 p-2 text-sm bg-gray-100 border-l-4 border-gray-400">
                    <p className="text-xs font-bold">
                        {classModel?.section.name}
                    </p>
                    <p className="italic">
                        {exam?.subject.name} - {exam?.title}
                    </p>
                    <div className="mt-2 flex justify-between">
                        <span className="font-bold">Passing Score</span>
                        <span>{pivot?.passing_score}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold">Exam Period</span>
                        <span>{pivot?.exam_period} mins</span>
                    </div>
                </div>

                <div className="label">
                    <span className="label-text-alt text-error">
                        {errors?.class_exam}
                    </span>
                </div>

                <div className="modal-action">
                    <button
                        className="btn btn-sm btn-info text-white"
                        onClick={open}
                        disabled={processing}
                    >
                        {processing && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
                        Open Exam
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

export default OpenAssignedModal;
