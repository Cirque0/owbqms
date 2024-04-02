import StudentLayout from "@/Layouts/StudentLayout";
import UpdateProfileInformation from "../Profile/Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "../Profile/Partials/UpdatePasswordForm";

export default function Settings({ auth, mustVerifyEmail, status }) {
    return (
        <StudentLayout user={auth.user}>
            <div className="grow flex gap-8">
                <div className="grow max-w-4xl">
                    <div className="flex justify-between items-baseline">
                        <h2 className="font-bold text-2xl">Settings</h2>
                    </div>

                    <UpdateProfileInformation
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="mt-4 grow"
                    />

                    <UpdatePasswordForm className="mt-4 grow" />
                </div>
            </div>
        </StudentLayout>
    );
}
