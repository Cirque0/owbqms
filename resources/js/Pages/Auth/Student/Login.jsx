import { Head, Link, useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        username: "",
        birthdate: "",
        password: "",
        rememberMe: false,
    });

    const login = (e) => {
        e.preventDefault();
        post(route('student.login.store'));
    }

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <Head title="Login / Student" />
            <div className="card w-full max-w-md bg-base-200 shadow">
                <div className="card-body">
                    <h2 className="card-title">Login as Student</h2>
                    <form onSubmit={login} className="flex flex-col items-center gap-4">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Username</span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-person-circle"></i>
                                <input
                                    type="text"
                                    className="grow"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                />
                            </div>
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
                                    onChange={(e) => setData('birthdate', e.target.value)}
                                />
                            </div>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-lock-fill"></i>
                                <input
                                    type="password"
                                    className="grow"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
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
                                    className="checkbox checkbox-sm"
                                    checked={data.rememberMe}
                                    onChange={(e) =>
                                        setData("rememberMe", e.target.checked)
                                    }
                                />
                                <span className="label-text">Remember me</span>
                            </div>
                        </label>

                        <button className="btn btn-sm btn-primary" disabled={processing}>
                            {processing ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : 'Login'}
                        </button>

                        <div className="flex flex-col items-center gap-1">
                            <Link className="text-sm">Forgot password?</Link>
                            <Link
                                href={route("student.register")}
                                className="text-sm"
                            >
                                Don't have an account?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}