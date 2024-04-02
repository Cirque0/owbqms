import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            username: user.username,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <div className={"card bg-gray-100 " + className}>
            <div className="card-body">
                <h2 className="card-title">User Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's information and email address.
                </p>
                <form onSubmit={submit} className="mt-2 space-y-2">
                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Username</span>
                        </div>
                        <input
                            type="text"
                            className="input input-sm input-bordered w-full"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            required
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.username}
                            </span>
                        </div>
                    </label>

                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="email"
                            className="input input-sm input-bordered w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.email}
                            </span>
                        </div>
                    </label>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800">
                                Your email address is unverified.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <button
                            className="btn btn-sm btn-primary"
                            disabled={processing}
                        >
                            Save
                        </button>

                        <div className={"flex gap-2 text-success font-bold " + (
                            recentlySuccessful ? "" : "hidden"
                        )}>
                            <i className="bi bi-check-circle-fill"></i>
                            Successfully saved changes.
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
