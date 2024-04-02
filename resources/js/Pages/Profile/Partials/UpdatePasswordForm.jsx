import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <div className={"card bg-gray-100 " + className}>
            <div className="card-body">
                <h2 className="card-title">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
                <form onSubmit={updatePassword} className="mt-4 space-y-2">
                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Current Password</span>
                        </div>
                        <input
                            type="password"
                            className="input input-sm input-bordered w-full"
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            required
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.current_password}
                            </span>
                        </div>
                    </label>

                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">New Password</span>
                        </div>
                        <input
                            type="password"
                            className="input input-sm input-bordered w-full"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.password}
                            </span>
                        </div>
                    </label>

                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Confirm Password</span>
                        </div>
                        <input
                            type="password"
                            className="input input-sm input-bordered w-full"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.password_confirmation}
                            </span>
                        </div>
                    </label>

                    <div className="flex items-center gap-4">
                        <button
                            className="btn btn-sm btn-primary"
                            disabled={processing}
                        >
                            Save
                        </button>

                        <div
                            className={
                                "flex gap-2 text-success font-bold " +
                                (recentlySuccessful ? "" : "hidden")
                            }
                        >
                            <i className="bi bi-check-circle-fill"></i>
                            Successfully updated password.
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
