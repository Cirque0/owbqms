import { Head } from "@inertiajs/react";
import ClassLayout from "./Partials/ClassLayout";

export default function Class({ auth, classModel }) {
    return (
        <>
            <Head
                title={`[${classModel.section.name}] ${classModel.subject.name}`}
            />
            <ClassLayout user={auth.user} classModel={classModel}>
                <div className="flex flex-col">
                    sup
                </div>
            </ClassLayout>
        </>
    );
}
