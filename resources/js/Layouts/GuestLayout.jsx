export default function Guest({ children }) {
    return (
        <main className='relative min-h-screen w-full flex'>
                <div className="md:max-w-[32rem] w-full shrink-0 p-4 flex flex-col items-center bg-gradient-to-tr from-secondary to-40% to-primary">
                    {children}
                </div>

                <div className='md:block hidden w-full bg-[url("/images/student-banner-bg.jpg")] bg-cover bg-center'></div>
            </main>
    );
}
