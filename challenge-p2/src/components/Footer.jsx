import React, { useContext } from 'react'
import logo from '../assets/h_1.png'
import { ThemeContext } from '../context/ThemeContext'

function Footer() {
    const { theme } = useContext(ThemeContext)

    return (
        <div className='container mx-auto mt-5'>
            <div className='grid grid-cols-4'>
                <div>
                    <div className='mb-5'>
                        <img className='w-[50%] bg-[#CCCCCC] hover:bg-[#acacac] cursor-pointer pt-3 px-3' src={logo} alt='logo' />
                    </div>
                    <p>voilà.id is a luxury fashion shopping platform that
                        focuses on providing 100% authentic branded
                        collections. Offering more than 150+ luxury brands
                        and designers, voilà.id aspire to be the one-stop
                        shopping destination for fashion enthusiasts to find
                        their dream collections in one place.</p>
                    <div className='grid grid-cols-7 mt-8'>
                        <a href='https://www.instagram.com/'>
                            <svg data-test-id="icon-instagram" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.086 24.415c-1.428-.065-2.203-.302-2.719-.503a4.547 4.547 0 0 1-1.683-1.095c-.513-.512-.83-1-1.095-1.683-.201-.516-.438-1.291-.503-2.718C.014 16.873 0 16.41 0 12.5 0 8.592.016 8.13.085 6.586.15 5.158.389 4.385.588 3.867a4.565 4.565 0 0 1 1.095-1.684c.512-.512 1-.83 1.684-1.095.515-.2 1.29-.438 2.718-.503C7.63.515 8.092.5 12 .5c3.909 0 4.37.016 5.915.085 1.427.065 2.201.304 2.718.503a4.53 4.53 0 0 1 1.684 1.095c.512.513.828 1 1.095 1.684.2.515.438 1.29.503 2.718.07 1.544.085 2.007.085 5.915s-.014 4.371-.085 5.916c-.065 1.427-.304 2.202-.503 2.718a4.538 4.538 0 0 1-1.095 1.683 4.54 4.54 0 0 1-1.684 1.095c-.515.2-1.29.438-2.718.503-1.543.07-2.006.085-5.915.085-3.908 0-4.371-.014-5.914-.085Z" fill={`${theme === 'light' ? '#000' : '#FFFFFF'}`}></path>
                                <path d="M9.277 12.415a2.638 2.638 0 1 1 5.276 0 2.638 2.638 0 0 1-5.276 0Zm-1.426 0a4.064 4.064 0 1 0 8.128 0 4.064 4.064 0 0 0-8.128 0Zm7.34-4.225a.95.95 0 1 0 1.899 0 .95.95 0 0 0-1.9 0ZM8.716 18.858c-.771-.035-1.19-.164-1.47-.273a2.46 2.46 0 0 1-.91-.592 2.443 2.443 0 0 1-.592-.91c-.109-.278-.237-.698-.272-1.47-.039-.834-.046-1.084-.046-3.198s.008-2.363.046-3.198c.035-.772.164-1.19.272-1.47a2.46 2.46 0 0 1 .592-.91 2.44 2.44 0 0 1 .91-.593c.28-.108.699-.237 1.47-.272.835-.038 1.085-.046 3.198-.046s2.364.008 3.199.046c.771.035 1.19.165 1.47.272.369.144.633.316.91.592.277.277.448.541.592.91.109.28.237.699.272 1.47.039.836.046 1.086.046 3.2 0 2.113-.007 2.363-.046 3.198-.035.771-.164 1.191-.272 1.47-.144.37-.315.633-.592.91a2.46 2.46 0 0 1-.91.591c-.28.11-.699.238-1.47.273-.835.038-1.085.046-3.199.046s-2.364-.008-3.198-.046Zm-.065-14.31c-.843.038-1.419.172-1.921.368-.52.202-.962.473-1.402.913-.441.44-.711.88-.913 1.402-.196.503-.33 1.078-.368 1.92-.04.845-.048 1.114-.048 3.264 0 2.15.009 2.42.048 3.263.038.843.172 1.418.368 1.921.202.52.472.963.913 1.402.44.44.88.71 1.402.913.503.196 1.078.33 1.92.368.845.038 1.115.048 3.264.048 2.15 0 2.42-.009 3.263-.048.843-.038 1.418-.172 1.921-.368.52-.202.962-.473 1.402-.913.441-.44.71-.881.913-1.402.196-.503.33-1.078.368-1.92.038-.845.047-1.114.047-3.264 0-2.15-.009-2.42-.047-3.263s-.172-1.419-.368-1.921a3.892 3.892 0 0 0-.913-1.402c-.44-.441-.881-.711-1.401-.913-.504-.196-1.08-.33-1.921-.368-.844-.039-1.114-.048-3.263-.048-2.15 0-2.42.009-3.264.048Z" fill={`${theme === 'light' ? '#FFFFFF' : '#000'}`}></path>
                            </svg>
                        </a>
                        <a href='https://www.tiktok.com/id-ID/'>
                            <svg data-test-id="icon-tiktok" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M.5 6.5a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6h-12a6 6 0 0 1-6-6v-12Z" fill={`${theme === 'light' ? '#000' : '#FFFFFF'}`}></path>
                                <path d="M15.216 5.5h-2.607v10.081c0 1.201-1.003 2.188-2.251 2.188s-2.25-.987-2.25-2.188c0-1.18.98-2.145 2.183-2.188v-2.53C7.639 10.904 5.5 12.985 5.5 15.58c0 2.617 2.184 4.719 4.88 4.719 2.696 0 4.88-2.123 4.88-4.719v-5.17a6.218 6.218 0 0 0 3.454 1.116v-2.53c-1.96-.065-3.498-1.61-3.498-3.497Z" fill={`${theme === 'light' ? '#FFFFFF' : '#000'}`}></path>
                            </svg>
                        </a>
                        <a href='https://www.youtube.com/'>
                            <svg data-test-id="icon-youtube" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M.5 6.5a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6h-12a6 6 0 0 1-6-6v-12Z" fill={`${theme === 'light' ? '#000' : '#FFFFFF'}`}></path>
                                <path d="M19.488 9.065a1.79 1.79 0 0 0-1.259-1.26C17.112 7.5 12.641 7.5 12.641 7.5s-4.47 0-5.588.294c-.6.165-1.094.659-1.259 1.27C5.5 10.183 5.5 12.5 5.5 12.5s0 2.33.294 3.435a1.79 1.79 0 0 0 1.259 1.26c1.13.305 5.588.305 5.588.305s4.47 0 5.588-.294a1.79 1.79 0 0 0 1.26-1.259c.293-1.118.293-3.435.293-3.435s.012-2.33-.294-3.447Z" fill={`${theme === 'light' ? '#FFFFFF' : '#000'}`}></path>
                                <path d="m11.218 14.641 3.717-2.141-3.717-2.141v4.282Z" fill={`${theme === 'light' ? '#000' : '#FFFFFF'}`}></path>
                            </svg>
                        </a>
                        <a href='https://www.facebook.com/'>
                            <svg data-test-id="icon-facebook" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M.5 6.5a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6h-12a6 6 0 0 1-6-6v-12Z" fill={`${theme === 'light' ? '#000' : '#FFFFFF'}`}></path>
                                <path d="m17.171 15.969.532-3.469h-3.328v-2.25c0-.95.464-1.875 1.955-1.875h1.514V5.422s-1.374-.234-2.686-.234c-2.742 0-4.533 1.661-4.533 4.668V12.5H7.578v3.469h3.047V24.5h3.75v-8.531h2.796Z" fill={`${theme === 'light' ? '#FFFFFF' : '#000'}`}></path>
                            </svg>
                        </a>
                    </div>
                    <p className='mt-8 font-semibold text-lg'>Get the ultimate shopping experience on voilà.id app</p>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        <a href='https://play.google.com/'>
                            <img className={`${theme === 'light' ? 'border border-transparent' : 'border border-white rounded-md'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fstore%2Fgoogle-playstore.png@webp' alt='googleplay'/>
                        </a>
                        <a href='https://www.apple.com/id/app-store/'>
                            <img className={`${theme === 'light' ? 'border border-transparent' : 'border border-white rounded-md'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fstore%2Fapple-store.png@webp' alt='appstore'/>
                        </a>
                    </div>
                </div>
                <div className='ps-20'>
                    <h1 className='font-bold mb-5'>About Us</h1>
                    <div className='grid gap-2'>
                        <p className='cursor-pointer hover:underline'>About nookhouse</p>
                        <p className='cursor-pointer hover:underline'>Our Store</p>
                        <p className='cursor-pointer hover:underline'>Promotions</p>
                        <p className='cursor-pointer hover:underline'>Programs & Partnerships</p>
                        <p className='cursor-pointer hover:underline'>Shop by Request</p>
                        <p className='cursor-pointer hover:underline'>Carrers</p>
                        <p className='cursor-pointer hover:underline'>nookhouse x JeanneDe</p>
                    </div>
                </div>
                <div>
                    <h1 className='font-bold mb-5'>Customer Service</h1>
                    <div className='grid gap-2'>
                        <p className='cursor-pointer hover:underline'>Contact Us</p>
                        <p className='cursor-pointer hover:underline'>Help Center</p>
                        <p className='cursor-pointer hover:underline'>Terms & Conditions</p>
                        <p className='cursor-pointer hover:underline'>Privacy Policy</p>
                    </div>
                </div>
                <div>
                    <div className='border-b-[1px] pb-5'>
                        <h1 className='font-bold mb-5'>Official Store</h1>
                        <div className='grid grid-cols-4 items-center gap-5'>
                            <a href='https://www.tokopedia.com/'>
                                <img src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fstore%2Ftokopedia.png@webp' alt='tokopedia' />
                            </a>
                            <a href='https://shopee.co.id/'>
                                <img src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fstore%2Fshopee.png@webp' alt='shopee' />
                            </a>
                            <a href='https://www.blibli.com/'>
                                <img src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fstore%2Fblibli.png@webp' alt='blibli.com' />
                            </a>
                            <a href='https://shop-id.tokopedia.com/'>
                                <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fstore%2Ftiktok.png@webp' alt='tiktokshop' />
                            </a>
                        </div>
                    </div>
                    <div className='border-b-[1px] pb-5'>
                        <h1 className='font-bold mb-5 mt-5'>Payment Options</h1>
                        <div className='grid grid-cols-5 items-center gap-5'>
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fbca.png@webp' alt='bca' />
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fmandiri.png@webp' alt='mandiri' />
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fbri.png@webp' alt='bri' />
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fbni.png@webp' alt='bni' />
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fcimb.png@webp' alt='cimb' />
                            <img src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fdigibank.png@webp' alt='digibank' />
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fmega.png@webp' alt='mega' />
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fpermata.svg@webp' alt='permata' />
                            <img src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fjenius.png@webp' alt='jenius' />
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fmayapada-new.png@webp' alt='mayapada' />
                            <img src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fvisa.png@webp' alt='visa' />
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fmastercard.png@webp' alt='mastercard' />
                            <img src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Fjcb.png@webp' alt='jcb' />
                            <img src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fbank%2Famericanexpress.png@webp' alt='americanexpress' />
                        </div>
                    </div>
                    <div className='pb-5'>
                        <h1 className='font-bold mb-5 mt-5'>Shipping Options</h1>
                        <div className='grid grid-cols-4 items-center gap-5'>
                            <img  src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fshipping%2Fjne.png@webp' alt='JNE' />
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white px-1'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fshipping%2Fgosend.png@webp' alt='gosend' />
                            <img className={`${theme === 'light' ? 'bg-transparent' : 'bg-white'}`} src='https://images.voila.id/pr:sharp/rs:fit:128:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fshipping%2Fpaxel.png@webp' alt='paxel' />
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Footer