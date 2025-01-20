import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function Aside() {
    const { theme } = useContext(ThemeContext)
    
    return (
        <aside className='col-span-3 mt-10 pe-28 lg:flex flex-col gap-10 hidden'>
            <h1 className='text-3xl font-bold me-12'>Become a nookhouse member and<br />enjoy the benefits</h1>
            <div className='grid gap-5'>
                <section className={`flex gap-5 items-center border p-2 ${theme === 'dark' && 'border-[#757575]'}`}>
                    <div className='border rounded-full p-3 bg-[#ACACAC]'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" size="48" width="40" height="40">
                            <path d="M15.9978 22.8442C21.4731 22.8442 25.9117 18.3454 25.9117 12.7959C25.9117 7.24633 21.4731 2.74754 15.9978 2.74754C10.5225 2.74754 6.08382 7.24633 6.08382 12.7959C6.08382 18.3454 10.5225 22.8442 15.9978 22.8442ZM27.6359 12.7959C27.6359 19.3106 22.4253 24.5918 15.9978 24.5918C9.57022 24.5918 4.35966 19.3106 4.35966 12.7959C4.35966 6.28119 9.57022 1 15.9978 1C22.4253 1 27.6359 6.28119 27.6359 12.7959Z" fill="#EEEEEE"></path>
                            <path d="M24.5832 12.7958C24.5832 17.6001 20.7406 21.4947 16.0006 21.4947C11.2606 21.4947 7.41812 17.6001 7.41812 12.7958C7.41812 7.99156 11.2606 4.09694 16.0006 4.09694C20.7406 4.09694 24.5832 7.99156 24.5832 12.7958ZM14.2995 10.4988L10.9606 11.2508L13.238 13.9455L12.8877 17.5594L15.9998 16.0867L19.112 17.5594L18.7513 13.9455L21.039 11.2508L17.7002 10.4988L15.9998 7.35488L14.2995 10.4988Z" fill="#EEEEEE"></path>
                            <path d="M17.1466 24.5351L20.3404 30.5408C20.4969 30.835 20.8052 31.0129 21.1346 30.9993C21.4641 30.9856 21.757 30.7826 21.8891 30.4764L23.4087 26.9559L27.036 27.3937C27.3589 27.4327 27.6759 27.2842 27.8559 27.0097C28.0359 26.7352 28.0482 26.3814 27.8877 26.0948L24.7771 20.5401C22.8795 22.7481 20.1844 24.2335 17.1466 24.5351Z" fill="#EEEEEE"></path>
                            <path d="M15.1178 24.5585C11.9874 24.3213 9.20212 22.8288 7.25032 20.5762L4.11517 26.0897C3.9528 26.3753 3.96277 26.7292 4.14096 27.0049C4.31915 27.2806 4.63524 27.4312 4.95838 27.3944L8.82808 26.9535L10.2549 30.4594C10.381 30.7691 10.6705 30.9784 11.0004 30.9984C11.3303 31.0184 11.6424 30.8455 11.804 30.5533L15.1178 24.5585Z" fill="#EEEEEE"></path>
                        </svg>
                    </div>
                    <div>
                        <h2 className='font-semibold'>Large Marketing Network</h2>
                        <p>Join our large marketing network to expand your reach, boost sales, and enhance visibility with trusted partners.</p>
                    </div>
                </section>
                <section className={`flex gap-5 items-center border p-2 ${theme === 'dark' && 'border-[#757575]'}`}>
                    <div className='border rounded-full p-3 bg-[#ACACAC]'>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" size="48" fill="currentColor" width="40" height="40">
                            <path d="M22 9.69V5.02H2v4.67c1.38 0 2.5 1.04 2.5 2.33S3.38 14.35 2 14.35v4.67h20v-4.67c-1.38 0-2.5-1.04-2.5-2.33s1.12-2.33 2.5-2.33Zm-8.15 5.33L12 14.15l-1.85.87.21-2.13L9 11.3l1.99-.44L12 9.01l1.01 1.85 1.99.44-1.36 1.59.21 2.12v.01Z" fill="#EEEEEE"></path>
                        </svg>
                    </div>
                    <div>
                        <h2 className='font-semibold'>Member Exclusive Discount</h2>
                        <p>Get your exclusive discount for bulk purchase.</p>
                    </div>
                </section>
                <section className={`flex gap-5 items-center border p-2 ${theme === 'dark' && 'border-[#757575]'}`}>
                    <div className='border rounded-full p-3 bg-[#ACACAC]'>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" size="48" fill="currentColor" width="40" height="40">
                            <path d="M11 14.5A6.5 6.5 0 0 1 17.5 8c.17 0 .33.01.5.03V2.5H6l-4 5v15h16v-1.53c-.17.01-.33.03-.5.03a6.5 6.5 0 0 1-6.5-6.5Zm-2 3H4v-2h5v2Zm0-4H4v-2h5v2Z" fill="#EEEEEE"></path>
                            <path d="M17.5 10.01c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5S22 17 22 14.51s-2.01-4.5-4.5-4.5Zm2.83 5.65H16.5v-3.85H18v2.35h2.33v1.5Z" fill="#EEEEEE"></path>
                        </svg>
                    </div>
                    <div>
                        <h2 className='font-semibold'>Transaction History</h2>
                        <p>Track all of your online orders and purchases.</p>
                    </div>
                </section>
            </div>
        </aside>
    )
}

export default Aside