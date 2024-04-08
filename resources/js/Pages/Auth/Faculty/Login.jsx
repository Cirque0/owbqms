import Guest from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        username: "",
        password: "",
        rememberMe: false,
    });

    const login = (e) => {
        e.preventDefault();
        post(route("faculty.login.store"));
    };

    return (
        <Guest>
            <Head title="Login / Faculty" />
            <h2 className="mt-16 text-center text-2xl font-bold text-white">
                Login as Faculty
            </h2>
            <form onSubmit={login} className="w-full mt-4 flex flex-col items-center gap-4">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white">Username</span>
                    </div>
                    <div className="input input-bordered flex items-center gap-2">
                        <i className="bi bi-person-circle"></i>
                        <input
                            type="text"
                            className="grow"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />
                    </div>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white">Password</span>
                    </div>
                    <div className="input input-bordered flex items-center gap-2">
                        <i className="bi bi-lock-fill"></i>
                        <input
                            type="password"
                            className="grow"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
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
                    <div className="label cursor-pointer justify-normal gap-2">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-secondary bg-white"
                            checked={data.rememberMe}
                            onChange={(e) =>
                                setData("rememberMe", e.target.checked)
                            }
                        />
                        <span className="label-text text-white">Remember me</span>
                    </div>
                </label>

                <button
                    className="btn btn-sm btn-secondary"
                    disabled={processing}
                >
                    {processing ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        "Login"
                    )}
                </button>

                <div className="flex flex-col items-center gap-1">
                    <Link className="link link-hover text-white text-sm">Forgot password?</Link>
                    <Link href={route("faculty.register")} className="link link-hover text-white text-sm">
                        Don't have an account?
                    </Link>
                </div>
            </form>
        </Guest>
    );
}
