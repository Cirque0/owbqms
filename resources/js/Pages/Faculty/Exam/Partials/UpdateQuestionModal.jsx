import Combobox from "@/Components/Combobox";
import { useForm } from "@inertiajs/react";
import { forwardRef, useEffect, useState } from "react";

const UpdateQuestionModal = forwardRef(({ question }, ref) => {
    const { data, setData, patch, setDefaults, reset, errors, processing } = useForm({
        type: question?.type || "",
        description: question?.description || "",
        answer: question?.answer || "",
        choices: question?.choices || [],
    });

    useEffect(() => {
        setDefaults({
            type: question?.type || "",
            description: question?.description || "",
            answer: question?.answer || "",
            choices: question?.choices || [],
        });

        setData({
            type: question?.type || "",
            description: question?.description || "",
            answer: question?.answer || "",
            choices: question?.choices || [],
        });
    }, [question])

    const [newChoice, setNewChoice] = useState("");

    useEffect(() => {
        if(data.type === question?.type) {
            reset("answer", "choices");
        }
        else {
            setData({
                ...data,
                answer: '',
                choices: [],
            });
        }
        
        setNewChoice("");
    }, [data.type]);

    const submit = (e) => {
        e.preventDefault();
        patch(route("faculty.questions.update", { question: question.id }), {
            onSuccess: () => ref.current.close(),
        });
    };

    const createChoice = (e) => {
        e.preventDefault();

        if (newChoice) {
            setData("choices", [...data.choices, newChoice]);

            setNewChoice("");
        }
    };

    const removeChoice = (index) => {
        setData((prevState) => ({
            ...prevState,
            choices: prevState.choices.toSpliced(index, 1),
            answer: prevState.choices[index] === prevState.answer ? "" : prevState.answer,
        }));
    };

    return (
        <dialog ref={ref} className="modal modal-bottom md:modal-middle">
            <div className="modal-box md:overflow-auto">
                <h3 className="font-bold text-lg">Update question</h3>

                {JSON.stringify(errors)}

                <form id="update_question" className="mt-4" onSubmit={submit}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Type</span>
                        </div>
                        <Combobox
                            className={"w-full input input-sm input-bordered"}
                            value={data.type}
                            onChange={(value) => setData("type", value)}
                            placeholder="Select question type"
                            options={[
                                "Identification",
                                "True or False",
                                "Fill in the Blanks",
                                "Multiple Choice",
                                // "Essay",
                                // "Coding",
                            ]}
                            disableInput
                            canCreateOptions={false}
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.type}
                            </span>
                        </div>
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Question</span>
                        </div>
                        <textarea
                            className="w-full textarea textarea-sm textarea-bordered"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="What's the question?"
                        ></textarea>
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.description}
                            </span>
                        </div>
                    </label>

                    {(() => {
                        switch (data.type) {
                            case "Identification":
                            case "Fill in the Blanks":
                                return (
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">
                                                Answer
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full input input-sm input-bordered"
                                            value={data.answer}
                                            onChange={(e) =>
                                                setData(
                                                    "answer",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="What's the correct answer?"
                                        />
                                        <div className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.answer}
                                            </span>
                                        </div>
                                    </label>
                                );

                            case "True or False":
                                return (
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">
                                                Answer
                                            </span>
                                        </div>
                                        <Combobox
                                            type="text"
                                            className="w-full input input-sm input-bordered"
                                            value={data.answer}
                                            onChange={(value) =>
                                                setData("answer", value)
                                            }
                                            options={["True", "False"]}
                                            placeholder="Select the correct answer"
                                            disableInput
                                        />
                                        <div className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.answer}
                                            </span>
                                        </div>
                                    </label>
                                );

                            case "Multiple Choice":
                                return (
                                    <>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">
                                                    Choices
                                                </span>
                                            </div>
                                            <div className="w-full flex gap-1">
                                                <input
                                                    form="update_choice"
                                                    type="text"
                                                    className="grow input input-sm input-bordered"
                                                    value={newChoice}
                                                    onChange={(e) =>
                                                        setNewChoice(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Create a choice"
                                                />
                                                <button
                                                    className="btn btn-sm btn-info"
                                                    form="update_choice"
                                                >
                                                    <i className="bi bi-plus-lg"></i>
                                                </button>
                                            </div>
                                            <div className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.choices}
                                                </span>
                                            </div>
                                            <div className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.answer}
                                                </span>
                                            </div>
                                        </label>

                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Click or tap to select correct answer
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.choices.length ? (
                                                    data.choices.map(
                                                        (choice, index) => (
                                                            <tr className="hover">
                                                                <td>
                                                                    <div className="grow flex items-center justify-between gap-2">
                                                                        <div
                                                                            className="grow flex gap-2 items-center"
                                                                            onClick={() =>
                                                                                setData(
                                                                                    "answer",
                                                                                    choice
                                                                                )
                                                                            }
                                                                        >
                                                                            <span className="text-lg cursor-pointer">
                                                                                {data.answer ===
                                                                                choice ? (
                                                                                    <i className="bi bi-check-circle-fill text-success"></i>
                                                                                ) : (
                                                                                    <i className="bi bi-x-circle text-error opacity-50"></i>
                                                                                )}
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    choice
                                                                                }
                                                                            </span>
                                                                        </div>

                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-ghost btn-circle"
                                                                            onClick={() =>
                                                                                removeChoice(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="bi bi-x-lg"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                There are no
                                                                choices, yet.
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </>
                                );

                            default:
                                return null;
                        }
                    })()}
                </form>

                <form id="update_choice" hidden onSubmit={createChoice}></form>

                <div className="modal-action">
                    <button
                        className="btn btn-sm btn-info"
                        form="update_question"
                        disabled={processing}
                    >
                        {processing && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
                        Update question
                    </button>
                    <button
                        className="btn btn-sm"
                        onClick={() => reset()}
                        disabled={processing}
                    >
                        Reset
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

export default UpdateQuestionModal;
