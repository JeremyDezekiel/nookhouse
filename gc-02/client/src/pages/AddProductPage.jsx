import React, { useContext, useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
// import { addDoc, collection } from 'firebase/firestore'
// import { db } from '../config/firebase'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../app/actions'
import { useDispatch } from 'react-redux'

function AddProductPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading } = useContext(AuthContext)
    const email = user?.email

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')

    // 
    const [nameLength, setNameLength] = useState(0)
    const [descriptionLenght, setDescriptionLenght] = useState(0)
    const [isTouch, setIsTouch] = useState(false)

    const [nameError, setNameError] = useState('')
    const [categoryError, setCategoryError] = useState('')
    const [imageError, setImageError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [priceError, setPriceError] = useState('')
    const [stockError, setStockError] = useState('')

    const validateName = (name) => {
        if (name.length < 25) {
            setNameError('Product name must be at least 25 characters.')
        } else {
            setNameError('')
        }
    }

    const handleBlur = () => {
        setIsTouch(true)
    }

    useEffect(() => {
        validateName(name)
    }, [name])

    const validateCategory = (category) => {
        if (category === '') {
            setCategoryError('Product category is required.')
        } else {
            setCategoryError('')
        }
    }

    const validateImage = (image) => {
        if (image === '') {
            setImageError('Product must have at least 1 image.')
        } else {
            setImageError('')
        }
    }

    const validateDescription = (description) => {
        if (description === '') {
            setDescriptionError('Product description is required.')
        } else {
            setDescriptionError('')
        }
    }

    const validatePrice = (price) => {
        if (price === '') {
            setPriceError('The price is required to be filled in.')
        } else if (price < 100) {
            setPriceError('The minimum price of the product is Rp 100.')
        } else {
            setPriceError('')
        }
    }

    const validateStock = (stock) => {
        if (stock === '') {
            setStockError('The stock is required to be filled in.')
        } else {
            setStockError('')
        }
    }



    // 

    const handleAddProdcut = async (e) => {
        e.preventDefault()
        validateName(name)
        validateCategory(category)
        validateImage(image)
        validateDescription(description)
        validatePrice(price)
        validateStock(stock)
        if (nameError || categoryError || imageError || descriptionError || priceError || stockError) {
            return
        }
        try {
            dispatch(addProduct({ 
                name, category, image, description, price, stock, email
            }))
            Swal.fire({
                title: "Succes!",
                text: "Your product has been added",
                imageUrl: image,
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: name,
                icon: "success"
            })
            navigate('/admin')
            setName('')
            setCategory('')
            setImage('')
            setDescription('')
            setPrice('')
            setStock('')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
    }, [user, isLoading])

    return (
        <main>
            <section>
                <h1 className='text-3xl font-bold'>Add Product</h1>
                <p>Make sure the product does not violate Intellectual Property Rights so that your product is not taken down.
                    <b className='cursor-pointer text-red-500'> Learn T&C</b>
                </p>
            </section>
            <section>
                <form className='grid gap-5 mt-5' onSubmit={(e) => handleAddProdcut(e)}>
                    <div className='border rounded-md p-10 grid gap-10'>
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
                                <div className={`border flex py-2 rounded-md ${nameError ? 'border-red-600' : 'border-green-600'}`}>
                                    <input
                                        className='w-full px-2 outline-none peer'
                                        type='text'
                                        placeholder={`Example: Men's Shoes (Product Type/Category) + Tokostore (Brand) + Black Canvas (Description)`}
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            setNameLength(e.target.value.length)
                                            if (name.length >= 0) {
                                                validateName(name)
                                            }
                                        }}
                                        onBlur={() => {
                                            handleBlur()
                                        }}
                                    />
                                    {nameError ? <X className='rounded-full me-5 text-white bg-red-600' /> : <Check className='rounded-full me-5 text-white bg-green-600' />}
                                </div>
                                <div className='flex justify-between text-[#606060]'>
                                    {nameError ? <p className='text-red-500'>{nameError}</p> : <p>Tip: Product Type + Product Brand + Additional Information</p>}
                                    <div className={`flex ${nameError ? 'text-red-600' : 'text-[#606060]'}`}>
                                        <p>{nameLength}</p>
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
                                        <b className='text-red-500 cursor-pointer'> Learn More</b>
                                    </p>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className={`border py-2 rounded-md ${categoryError && 'border-red-600'}`}>
                                    <select className='w-full px-2 text-[#606060] outline-none cursor-pointer' value={category} onChange={(e) => setCategory(e.target.value)} onBlur={() => validateCategory(category)}>
                                        <option value='' hidden>Select Category</option>
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
                                {categoryError && <span className='text-red-600'>{categoryError}</span>}
                            </div>
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='flex gap-2'>
                                    <label className='text-lg'>Product Image</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                                <div className='text-sm text-[#606060] mt-3'>
                                    <p>The photo format must be .jpg, .jpeg, or .png, and the minimum size is 300 x 300 px (for optimal image quality, use a minimum size of 1,200 x 1,200 px).
                                        <br />
                                        <br />
                                        Select product images or drag and drop up to 9 images at once here. Upload at least 5 unique and appealing images to attract buyers' attention.
                                    </p>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className={`border py-2 rounded-md ${imageError && 'border-red-600'}`}>
                                    <input
                                        className='w-full px-2 outline-none peer'
                                        type='text'
                                        placeholder='Image Url'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        onBlur={() => validateImage(image)}
                                    />
                                </div>
                                {imageError && <span className='text-red-600'>{imageError}</span>}
                            </div>
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='flex gap-2'>
                                    <label className='text-lg'>Product Description</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                                <div className='text-sm text-[#606060] mt-3'>
                                    <p>
                                        Make sure the product description includes detailed information about your product so that buyers can easily understand and find it.
                                        <br />
                                        <br />
                                        It is recommended to <b>avoid including</b> personal information such as phone numbers, emails, etc., in the product description to protect your privacy.
                                    </p>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className='flex py-2 rounded-md'>
                                    <textarea className={`w-full border ${descriptionError && 'border-red-600'} focus:outline-green-600`} rows="13"
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                            setDescriptionLenght(e.target.value.length)
                                            // validateDescription(description)
                                        }}
                                        onBlur={() => validateDescription(description)}
                                        placeholder="Tokostore Men's Canvas Sneakers Black Series C28B

- Simple model
- Comfortable to wear
- Available in black color
- PVC Sole (injection shoes) that is comfortable and durable for everyday use

Materials:
Upper: Semi Leather (does not crack)
Sole: Premium Rubber Sole

Size
39: 25.5 cm
40: 26 cm
41: 26.5 cm
42: 27 cm
43: 27.5 - 28 cm

Limited edition from Tokostore with a new and trendy design for you. Designed to be worn on various occasions. Very comfortable to wear, helping enhance your appearance and confidence. Buy now before it runs out!">

                                    </textarea>
                                </div>
                                <div className='flex justify-between text-[#606060]'>
                                    {descriptionError ? <p className='text-red-600'>{descriptionError}</p> : <p>Write your product description with a minimum of 260 characters so that buyers can easily understand it.</p>}
                                    <div className={`flex ${descriptionError ? 'text-red-600' : 'text-[#606060]'}`}>
                                        <p>{descriptionLenght}</p>
                                        <p>/5000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='flex gap-2'>
                                    <label className='text-lg'>Product Price</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className={`border flex rounded-md ${priceError && 'border-red-600'}`}>
                                    <h1 className='bg-[#F3F4F5] p-2 rounded-s-md'>Rp</h1>
                                    <input
                                        className='w-full px-2 outline-none peer'
                                        type='number'
                                        placeholder='Enter the price'
                                        min='0'
                                        step='100'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        onBlur={() => validatePrice(price)}
                                    />
                                </div>
                                {priceError && <p className='text-red-600'>{priceError}</p>}
                            </div>
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='flex gap-2'>
                                    <label className='text-lg'>Product Stock</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className='border flex rounded-md py-2'>
                                    <input
                                        className='w-full px-2 outline-none peer'
                                        type='number'
                                        placeholder='Enter the stock quantity'
                                        min='0'
                                        step='1'
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        onBlur={() => validateStock(stock)}
                                    />
                                </div>
                                {stockError && <p className='text-red-600'>{stockError}</p>}
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className='border border-green-500 px-10 py-2 rounded-md bg-green-400'>Add Product</button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default AddProductPage