import React from 'react'
import { X } from 'lucide-react'

function AddProductPage() {
    return (
        <main>
            <section>
                <h1 className='text-3xl font-bold'>Add Product</h1>
                <p>Make sure the product does not violate Intellectual Property Rights so that your product is not taken down.
                    <b className='cursor-pointer text-red-500'> Learn T&C</b>
                </p>
            </section>
            <section>
                <form className='grid gap-5'>
                    <fieldset className='border rounded-md p-10'>
                        <h1 className='mb-10 font-semibold text-xl'>Product Information</h1>
                        <div className='grid gap-10'>
                            <div className='grid grid-cols-6'>
                                <div className='col-span-2 pe-24'>
                                    <div className='flex gap-2'>
                                        <label className='text-lg'>Product Name</label>
                                        <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                    </div>
                                    <div className='text-sm text-[#606060] mt-3'>
                                        <p>Product name must be at least 25 characters by including the brand, product type, color, material, or type.
                                            <br />
                                            <br />
                                            It is recommended not to use excessive capital letters, include more than one brand, or use promotional words.
                                            <br />
                                            <br />
                                            The name cannot be changed after the product is sold.
                                        </p>
                                    </div>
                                </div>
                                <div className='w-full col-span-4 col-start-3'>
                                    <div className='border flex py-2 rounded-md peer-focus:outline-green-600'>
                                        <input
                                            className='w-full px-2 outline-none peer'
                                            type='text'
                                            placeholder={`Example: Men's Shoes (Product Type/Category) + Tokostore (Brand) + Black Canvas (Description)`}
                                        />
                                        <X className={`rounded-full me-5 peer-focus:text-white peer-focus:bg-green-600`} />
                                    </div>
                                    <div className='flex justify-between text-[#606060]'>
                                        <p className=''>Tip: Product Type + Product Brand + Additional Information</p>
                                        <div className='flex text-[#606060]'>
                                            <p>0</p>
                                            <p>/255</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-6'>
                                <div className='col-span-2 pe-24'>
                                    <div className='flex gap-2'>
                                        <label className='text-lg'>Category</label>
                                        <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                    </div>
                                    <div className='text-sm text-[#606060] mt-3'>
                                        <p>Choose the appropriate category as 
                                            <b>the service fee will depend on the category.</b>
                                            If the selected category is inappropriate, Tokopedia will change the category.
                                            <b className='text-red-500 cursor-pointer'>Learn More</b>
                                        </p>
                                    </div>
                                </div>
                                <div className='w-full col-span-4 col-start-3'>
                                    <div className='border flex py-2 rounded-md peer-focus:outline-green-600'>
                                        <select className='w-full px-2'>
                                            <option value='' hidden selected>Select Category</option>
                                            <option value='Furniture'>Furniture</option>
                                            <option value='Shelves & Storage'>Shelves & Storage</option>
                                            <option value='Minimalist Kitchen'>Minimalist Kitchen</option>
                                            <option value='Electronics & Gadgets'>Electronics & Gadgets</option>
                                            <option value='Household'>Household</option>
                                            <option value='Home Improvement'>Home Improvement</option>
                                            <option value='Bed & Bath'>Bed & Bath</option>
                                            <option value='Hobbies & Lifestyle'>Hobbies & Lifestyle</option>
                                            <option value='Health & Sports'>Health & Sports</option>
                                            <option value='Toys & Babies'>Toys & Babies</option>
                                            <option value='Automotive'>Automotive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}

export default AddProductPage