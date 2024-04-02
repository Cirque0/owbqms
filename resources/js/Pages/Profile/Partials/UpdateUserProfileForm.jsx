import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateUserProfile({ className = "" }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            first_name: user.profile.first_name || "",
            middle_name: user.profile.middle_name || "",
            last_name: user.profile.last_name || "",
            gender: user.profile.gender || "",
            contact_num: user.profile.contact_num || "",
        });

    const submit = (e) => {
        e.preventDefault();

        // patch(route("profile.update"));
    };

    return (
        <div className={"card bg-gray-100 " + className}>
            <div className="card-body">
                <h2 className="card-title">User Profile</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your profile and contact information.
                </p>

                <form onSubmit={submit} className="mt-2 space-y-2">
                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">First Name</span>
                        </div>
                        <input
                            type="text"
                            className="input input-sm input-bordered w-full"
                            value={data.first_name}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            required
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.first_name}
                            </span>
                        </div>
                    </label>

                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Middle Name</span>
                        </div>
                        <input
                            type="text"
                            className="input input-sm input-bordered w-full"
                            value={data.middle_name}
                            onChange={(e) =>
                                setData("middle_name", e.target.value)
                            }
                            required
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.middle_name}
                            </span>
                        </div>
                    </label>

                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Last Name</span>
                        </div>
                        <input
                            type="text"
                            className="input input-sm input-bordered w-full"
                            value={data.last_name}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            required
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.last_name}
                            </span>
                        </div>
                    </label>

                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Gender</span>
                        </div>
                        <select
                            className="select select-sm select-bordered"
                            value={data.gender}
                            onChange={(e) => setData("gender", e.target.value)}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.contact_num}
                            </span>
                        </div>
                    </label>

                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Contact Number</span>
                        </div>
                        <input
                            type="text"
                            className="input input-sm input-bordered w-full"
                            value={data.contact_num}
                            onChange={(e) =>
                                setData("contact_num", e.target.value)
                            }
                            required
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.contact_num}
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
