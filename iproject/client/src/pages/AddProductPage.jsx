import React, { useContext, useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../app/actions'
import { useDispatch } from 'react-redux'
import UploadWidget from '../components/UploadWidget'
import ImagesAddProduct from '../components/imagesAddProduct'

function AddProductPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading } = useContext(AuthContext)
    const email = user?.email

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [images, setImages] = useState([])
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [weight, setWeight] = useState('')
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [color, setColor] = useState('')
    const [discount, setDiscount] = useState('')

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
    const [weightError, setWeightError] = useState('')
    const [lengthError, setLengthError] = useState('')
    const [widthError, setWidthError] = useState('')
    const [heightError, setHeightError] = useState('')
    const [colorError, setColorError] = useState('')

    const handleDeleteImage = (indexToDelete) => {
        setImages((prevImages) => prevImages.filter((_, index) => index !== indexToDelete))
    }

    const validateName = (name) => {
        if (name.length < 25) {
            setNameError('Product name must be at least 25 characters.')
        } else {
            setNameError('')
        }
    }

    const handleTouch = () => {
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

    const validateImage = (images) => {
        if (images.length < 1) {
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

    const validateWeight = (weight) => {
        if (weight === '' || weight < 1 || weight > 500000) {
            setWeightError('The weight must be between 1 gram and 500,000 grams.')
        } else {
            setWeightError('')
        }
    }

    const validateLength = (length) => {
        if (length === '' || length < 1 || length > 1000) {
            setLengthError('The dimensions must be between 1 cm and 1000 cm.')
        } else {
            setLengthError('')
        }
    }

    const validateWidth = (width) => {
        if (width === '' || width < 1 || width > 1000) {
            setWidthError('The dimensions must be between 1 cm and 1000 cm.')
        } else {
            setWidthError('')
        }
    }

    const validateHeight = (height) => {
        if (height === '' || height < 1 || height > 1000) {
            setHeightError('The dimensions must be between 1 cm and 1000 cm.')
        } else {
            setHeightError('')
        }
    }

    const validateColor = (color) => {
        if (color === '') {
            setColorError('Product description is required.')
        } else {
            setColorError('')
        }
    }

    // 

    const handleAddProdcut = async (e) => {
        e.preventDefault()
        validateName(name)
        validateCategory(category)
        validateImage(images)
        validateDescription(description)
        validatePrice(price)
        validateStock(stock)
        validateWeight(weight)
        validateLength(length)
        validateWidth(width)
        validateHeight(height)
        validateColor(color)
        if (nameError || categoryError || imageError || descriptionError || priceError || stockError || weightError || lengthError || widthError || heightError || colorError) {
            return
        }
        try {
            dispatch(addProduct({
                name, category, images, description, price, stock, email, weight, length, width, height, color, discount
            }))
            Swal.fire({
                title: "Succes!",
                text: "Your product has been added",
                imageUrl: images[0],
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: name,
                icon: "success"
            })
            navigate('/admin')
            setName('')
            setCategory('')
            setImages([])
            setDescription('')
            setPrice('')
            setStock('')
            setWeight('')
            setLength('')
            setWidth('')
            setHeight('')
            setColor('')
            setDiscount('')
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
                <h1 className='text-lg lg:text-3xl font-bold px-2 lg:px-0'>Add Product</h1>
                <p className='text-sm lg:text-base px-2 lg:px-0'>Make sure the product does not violate Intellectual Property Rights so that your product is not taken down.
                    <b className='cursor-pointer text-red-500'> Learn T&C</b>
                </p>
            </section>
            <section>
                <form className='grid gap-5 mt-5' onSubmit={(e) => handleAddProdcut(e)}>
                    <div className='border rounded-md p-10 grid gap-10'>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='grid lg:flex gap-2'>
                                    <label className='text-lg'>Product Name</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                                <div className='text-sm text-[#606060] mt-3 hidden lg:block'>
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
                                <div className={`border flex py-2 rounded-md ${isTouch ? nameError ? 'border-red-600' : 'border-green-600' : ''}`}>
                                    <input
                                        className='w-full px-2 outline-none peer'
                                        type='text'
                                        placeholder={`Example: Men's Shoes (Product Type/Category) + Tokostore (Brand) + Black Canvas (Description)`}
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            setNameLength(e.target.value.length)
                                        }}
                                        onBlur={() => {
                                            handleTouch()
                                            validateName(name)
                                        }}
                                    />
                                    {isTouch ? nameError ? <X className='rounded-full me-5 text-white bg-red-600' /> : <Check className='rounded-full me-5 text-white bg-green-600' /> : ''}
                                </div>
                                <div className='flex justify-between text-[#606060]'>
                                    {isTouch ? nameError ? <p className='text-red-500'>{nameError}</p> : <p>Tip: Product Type + Product Brand + Additional Information</p> : <p>Tip: Product Type + Product Brand + Additional Information</p>}
                                    <div className={`flex ${isTouch ? nameError ? 'text-red-600' : 'text-[#606060]' : 'text-[#606060]'}`}>
                                        <p>{nameLength}</p>
                                        <p>/255</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='grid lg:flex gap-2'>
                                    <label className='text-lg'>Category</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                                <div className='text-sm text-[#606060] mt-3 hidden lg:block'>
                                    <p>Choose the appropriate category as
                                        <b> the service fee will depend on the category. </b>
                                        If the selected category is inappropriate, Tokopedia will change the category.
                                        <b className='text-red-500 cursor-pointer'> Learn More</b>
                                    </p>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className={`border py-2 rounded-md ${categoryError && 'border-red-600'}`}>
                                    <select
                                        className='w-full px-2 text-[#606060] outline-none cursor-pointer'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        onBlur={() => validateCategory(category)}
                                    >
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
                                <div className='grid lg:flex gap-2'>
                                    <label className='text-lg'>Color</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                            </div>
                            <div className='col-span-4 col-start-3'>
                                <div className={`w-fit border py-2 rounded-md ${colorError && 'border-red-600'}`}>
                                    <select
                                        className='w-full px-2 text-[#606060] outline-none cursor-pointer'
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        onBlur={() => validateColor(color)}
                                    >
                                        <option value='' hidden>Select Color</option>
                                        <option value='Black'>Black</option>
                                        <option value='White'>White</option>
                                        <option value='Brown'>Brown</option>
                                        <option value='Grey'>Grey</option>
                                        <option value='Cream'>Cream</option>
                                        {/* <option value='Home Improvement'>Home Improvement</option>
                                        <option value='Bed & Bath'>Bed & Bath</option>
                                        <option value='Hobbies & Lifestyle'>Hobbies & Lifestyle</option>
                                        <option value='Health & Sports'>Health & Sports</option>
                                        <option value='Toys & Babies'>Toys & Babies</option>
                                        <option value='Automotive'>Automotive</option> */}
                                    </select>
                                </div>
                                {colorError && <span className='text-red-600'>{colorError}</span>}
                            </div>
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='grid lg:flex gap-2'>
                                    <label className='text-lg'>Product Image</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                                <div className='text-sm text-[#606060] mt-3 hidden lg:block'>
                                    <p>The photo format must be .jpg, .jpeg, or .png, and the minimum size is 300 x 300 px (for optimal image quality, use a minimum size of 1,200 x 1,200 px).
                                        <br />
                                        <br />
                                        Select product images or drag and drop up to 8 images at once here. Upload at least 5 unique and appealing images to attract buyers' attention.
                                    </p>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                {images.length > 0 && (
                                    <div className='grid grid-cols-4 gap-5 mt-5'>
                                        {images.map((image, index) => (
                                            <ImagesAddProduct key={index} image={image} index={index} handleDeleteImage={handleDeleteImage}/>
                                        ))}
                                    </div>
                                )}
                                <div className='grid lg:grid mt-5'>
                                    {/* <input
                                        className={`border p-2 rounded-md outline-none peer flex-1 ${imageError && 'border-red-600'}`}
                                        type='text'
                                        placeholder='Image Url'
                                        value={images}
                                        onChange={(e) => setImages(e.target.value)}
                                        onBlur={() => validateImage(images)}
                                        disabled
                                    /> */}
                                    <UploadWidget images={images} setImages={setImages} validateImage={validateImage}/>
                                    {imageError && <span className='text-red-600'>{imageError}</span>}
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='grid lg:flex gap-2'>
                                    <label className='text-lg'>Product Description</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                                <div className='text-sm text-[#606060] mt-3 hidden lg:block'>
                                    <p>
                                        Make sure the product description includes detailed information about your product so that buyers can easily understand and find it.
                                        <br />
                                        <br />
                                        It is recommended to <b>avoid including</b> personal information such as phone numbers, emails, etc., in the product description to protect your privacy.
                                    </p>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className='flex py-2'>
                                    <textarea
                                        className={`w-full border rounded-md ${descriptionError && 'border-red-600'} focus:outline-green-600 px-2`}
                                        rows="7"
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                            setDescriptionLenght(e.target.value.length)
                                        }}
                                        onBlur={() => validateDescription(description)}
                                        placeholder="The Krisbow Tori series metal rack offers a functional and rust-resistant storage solution. This rack features a strong construction capable of holding up to 175 kg on each shelf. With adjustable shelf spacing, it can easily accommodate items of various sizes. The easy installation and sturdy construction make it an ideal choice for storing household tools, equipment, or other items. Perfect for providing an efficient and durable storage solution in warehouses, schools, offices, hospitals, or factories.">
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
                                <div className='grid lg:flex gap-2'>
                                    <label className='text-lg'>Product Weight</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                                <div className='text-sm text-[#606060] mt-3 hidden lg:block'>
                                    <p>Enter the weight by weighing the product after it is packaged. Make sure the weight is accurate to avoid discrepancies in shipping costs with the courier.
                                        <b className='text-red-500 cursor-pointer'> Learn More</b>
                                    </p>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className={`border w-[50%] flex rounded-md group-focus:border-green-400 ${weightError && 'border-red-600'}`}>
                                    <input
                                        className='w-full px-2 outline-none group rounded-s-md'
                                        type='number'
                                        placeholder='Product Weight'
                                        min='0'
                                        step='1'
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        onBlur={() => validateWeight(weight)}
                                    />
                                    <h1 className='bg-[#F3F4F5] p-2 rounded-e-md text-gray-500'>gram</h1>
                                </div>
                                {weightError && <p className='text-red-600'>{weightError}</p>}
                            </div>
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='grid lg:flex gap-2'>
                                    <label className='text-lg'>Product Size</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                                <div className='text-sm text-[#606060] mt-3 hidden lg:block'>
                                    <p>Enter the product dimensions after packaging to calculate the volumetric weight
                                        <br />
                                        <b className='text-red-500 cursor-pointer'> Learn about Volumetric Weight</b>
                                    </p>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className='grid grid-cols-4 gap-5'>
                                    <div>
                                        <div className={`border flex rounded-md ${lengthError && 'border-red-600'}`}>
                                            <input
                                                className='w-full px-2 outline-none peer rounded-s-md'
                                                type='number'
                                                placeholder='Length'
                                                min='0'
                                                step='1'
                                                value={length}
                                                onChange={(e) => setLength(e.target.value)}
                                                onBlur={() => validateLength(length)}
                                            />
                                            <h1 className='bg-[#F3F4F5] p-2 rounded-e-md text-gray-500'>cm</h1>
                                        </div>
                                        {lengthError && <p className='text-red-600'>{lengthError}</p>}
                                    </div>
                                    <div>
                                        <div className={`border flex rounded-md ${widthError && 'border-red-600'}`}>
                                            <input
                                                className='w-full px-2 outline-none peer rounded-s-md'
                                                type='number'
                                                placeholder='Width'
                                                min='0'
                                                step='1'
                                                value={width}
                                                onChange={(e) => setWidth(e.target.value)}
                                                onBlur={() => validateWidth(width)}
                                            />
                                            <h1 className='bg-[#F3F4F5] p-2 rounded-e-md text-gray-500'>cm</h1>
                                        </div>
                                        {widthError && <p className='text-red-600'>{widthError}</p>}
                                    </div>
                                    <div>
                                        <div className={`border flex rounded-md ${heightError && 'border-red-600'}`}>
                                            <input
                                                className='w-full px-2 outline-none peer rounded-s-md'
                                                type='number'
                                                placeholder='Height'
                                                min='0'
                                                step='1'
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                onBlur={() => validateHeight(height)}
                                            />
                                            <h1 className='bg-[#F3F4F5] p-2 rounded-e-md text-gray-500'>cm</h1>
                                        </div>
                                        {heightError && <p className='text-red-600'>{heightError}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='grid lg:flex gap-2'>
                                    <label className='text-lg'>Product Price</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className={`border flex rounded-md ${priceError && 'border-red-600'}`}>
                                    <h1 className='bg-[#F3F4F5] p-2 rounded-s-md text-gray-500'>Rp</h1>
                                    <input
                                        className='w-full rounded-e-md px-2 outline-none peer'
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
                                <label className='text-lg'>Discount</label>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className={`w-[25%] border flex rounded-md`}>
                                    <input
                                        className='w-full rounded-md p-2 outline-none peer'
                                        type='number'
                                        placeholder='Enter the discount'
                                        min='0'
                                        step='10'
                                        max='90'
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                    />
                                    <h1 className='bg-[#F3F4F5] p-2 rounded-e-md text-gray-500'>%</h1>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-2 pe-24'>
                                <div className='grid lg:flex gap-2'>
                                    <label className='text-lg'>Product Stock</label>
                                    <span className='rounded-md bg-[#F3F4F5] px-1 text-gray-400'>required</span>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className={`border flex rounded-md py-2 ${stockError && 'border-red-600'}`}>
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