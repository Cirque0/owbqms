import { Head, Link } from "@inertiajs/react";

export default function Login() {
    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <Head title="Login / Faculty" />
            <div className="card w-full max-w-md bg-base-200 shadow">
                <div className="card-body">
                    <h2 className="card-title">Login as Faculty</h2>
                    <form className="flex flex-col items-center gap-4">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                                    Username
                                </span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-person-circle"></i>
                                <input
                                    type="text"
                                    className="grow input-ghost"
                                />
                            </div>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                                    Password
                                </span>
                            </div>
                            <div className="input input-bordered flex items-center gap-2">
                                <i className="bi bi-lock-fill"></i>
                                <input
                                    type="password"
                                    className="grow input-ghost"
                                />
                            </div>
                        </label>

                        <button className="btn btn-sm btn-primary">Login</button>
                        <Link className="text-sm">Forgot password?</Link>
                        <Link href={route('faculty.register')} className="text-sm">Don't have an account?</Link>
                    </form>
                </div>
            </div>
        </main>
    );
}
