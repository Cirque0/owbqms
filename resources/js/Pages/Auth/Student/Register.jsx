import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, errors, processing } = useForm({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        birthdate: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        contact_num: "",
    });

    const register = (e) => {
        e.preventDefault();
        post(route("student.register.store"));
    };

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <Head title="Register / Faculty" />
            <div className="card md:min-h-fit min-h-screen w-full max-w-xl md:bg-base-200 md:shadow">
                <div className="card-body">
                    <h2 className="card-title">
                        Register for a student account
                    </h2>
                    <form
                        onSubmit={register}
                        className="flex flex-col items-center gap-4"
                    >
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Username</span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-person"></i>
                                <input
                                    type="text"
                                    className="grow"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                />
                            </div>
                            {errors.username && (
                                <div className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.username}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-at"></i>
                                <input
                                    type="email"
                                    className="grow"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            {errors.email && (
                                <div className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.email}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-lock"></i>
                                <input
                                    type="password"
                                    className="grow"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>
                            {errors.password && (
                                <div className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.password}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-lock"></i>
                                <input
                                    type="password"
                                    className="grow"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            {errors.password_confirmation && (
                                <div className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.password_confirmation}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Birthdate</span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-cake2"></i>
                                <input
                                    type="date"
                                    className="grow"
                                    value={data.birthdate}
                                    onChange={(e) =>
                                        setData("birthdate", e.target.value)
                                    }
                                />
                            </div>
                            {errors.birthdate && (
                                <div className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.birthdate}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">First Name</span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-person"></i>
                                <input
                                    type="text"
                                    className="grow"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                />
                            </div>
                            {errors.first_name && (
                                <div className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.first_name}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Middle Name</span>
                                <span className="label-text-alt">optional</span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-person"></i>
                                <input
                                    type="text"
                                    className="grow"
                                    value={data.middle_name}
                                    onChange={(e) =>
                                        setData("middle_name", e.target.value)
                                    }
                                />
                            </div>
                            {errors.middle_name && (
                                <div className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.middle_name}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Last Name</span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-person"></i>
                                <input
                                    type="text"
                                    className="grow"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                />
                            </div>
                            {errors.last_name && (
                                <div className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.last_name}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <select
                                className="select select-bordered"
                                defaultValue={""}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                            >
                                <option value={""} disabled>
                                    Select gender
                                </option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                            </select>
                            {errors.gender && (
                                <div className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.gender}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                                    Contact Number
                                </span>
                                <span className="label-text-alt">optional</span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-telephone"></i>
                                <input
                                    type="text"
                                    className="grow"
                                    value={data.contact_num}
                                    onChange={(e) =>
                                        setData("contact_num", e.target.value)
                                    }
                                />
                            </div>
                            {errors.contact_num && (
                                <div className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.contact_num}
                                    </span>
                                </div>
                            )}
                        </label>

                        <div className="w-full flex justify-end">
                            <button
                                className="btn btn-sm btn-primary"
                                disabled={processing}
                            >
                                {processing ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Register"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
