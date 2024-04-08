export default function Guest({ children }) {
    return (
        <main className='relative min-h-screen w-full flex'>
                <div className="md:max-w-96 w-full shrink-0 p-4 flex flex-col bg-maroon">
                    <img src="/images/LBQMS Logo.png" alt="OWBQMS logo" className='w-96' />

                    {children}
                </div>

                <div className='md:block hidden w-full bg-[url("/images/student-banner-bg.jpg")] bg-cover bg-center'></div>
            </main>
    );
}
