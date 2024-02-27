import { Link, Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <main className='relative min-h-screen w-full flex'>
                <div className="md:max-w-96 w-full shrink-0 p-4 flex flex-col bg-maroon text-white">
                    <img src="/images/LBQMS Logo.png" alt="OWBQMS logo" className='w-96' />

                    <p className='mt-16 text-center text-2xl font-bold'>Welcome!</p>

                    <div className="mx-4 mt-12 flex flex-col gap-4">
                        <p className='text-center text-xl'>Login as...</p>
                        <Link href={route('student.login')} className='btn btn-primary btn-lg'>Student</Link>
                        <div className="divider before:bg-white after:bg-white">OR</div>
                        <Link href={route('faculty.login')} className='btn btn-primary btn-lg'>Faculty</Link>
                    </div>
                </div>

                <div className='md:block hidden w-full bg-[url("/images/student-banner-bg.jpg")] bg-cover bg-center'></div>
            </main>
        </>
    );
}
