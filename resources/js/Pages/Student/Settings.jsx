import StudentLayout from "@/Layouts/StudentLayout";
import UpdateUserInformation from "../Profile/Partials/UpdateUserInformationForm";
import UpdatePasswordForm from "../Profile/Partials/UpdatePasswordForm";
import UpdateUserProfile from "../Profile/Partials/UpdateUserProfileForm";

export default function Settings({ auth, mustVerifyEmail, status }) {
    return (
        <StudentLayout user={auth.user} title="Settings">
            <div className="grow flex gap-8">
                <div className="grow max-w-4xl">
                    <div className="flex justify-between items-baseline">
                        <h2 className="font-bold text-2xl">Settings</h2>
                    </div>

                    <UpdateUserInformation
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="mt-4 grow"
                    />

                    <UpdateUserProfile className="mt-4 grow" />

                    <UpdatePasswordForm className="mt-4 grow" />
                </div>
            </div>
        </StudentLayout>
    );
}
