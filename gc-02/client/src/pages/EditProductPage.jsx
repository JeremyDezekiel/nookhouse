import { X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import Swal from 'sweetalert2'

function EditProductPage() {
    const { user, isLoading } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')

    const getProduct = async (id) => {
        try {
            const product = await getDoc(doc(db, 'products', id))
            setProduct(product.data())
        } catch (error) {
            console.error(error)
        }
    }

    const editProduct = async (e) => {
        e.preventDefault()
        try {
            const editProduct = doc(db, 'products', id)
            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then( async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    await updateDoc(editProduct, {
                        name: name,
                        category: category,
                        images: [image],
                        description: description,
                        price: Number(price),
                        stock: Number(stock),
                        // date: new Date()
                    })
                    Swal.fire({
                        title: "Edited!",
                        text: "Your product has been edited",
                        imageUrl: image,
                        imageWidth: 400,
                        imageHeight: 400,
                        imageAlt: name
                    });
                    navigate('/admin')
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                    navigate('/admin')
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
        getProduct(id)
    }, [user, isLoading])

    useEffect(() => {
        if (!isLoading && product) {
            setName(product.name)
            setCategory(product.category)
            setImage(product.images[0])
            setDescription(product.description)
            setPrice(product.price)
            setStock(product.stock)
        }
    }, [isLoading, product])

    return (
        <main>
            <section>
                <h1 className='text-3xl font-bold'>Edit Product</h1>
                <p>Make sure the product does not violate Intellectual Property Rights so that your product is not taken down.
                    <b className='cursor-pointer text-red-500'> Learn T&C</b>
                </p>
            </section>
            <section>
                <form className='grid gap-5 mt-5' onSubmit={(e) => editProduct(e)}>
                    <div className='border rounded-md p-10 grid gap-10'>
                        {product && (
                            <div className='flex justify-center'>
                                <img width={200} src={image} alt={name} />
                            </div>
                        )}
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
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
                                        <b className='text-red-500 cursor-pointer'> Learn More</b>
                                    </p>
                                </div>
                            </div>
                            <div className='w-full col-span-4 col-start-3'>
                                <div className='border flex py-2 rounded-md peer-focus:outline-green-600'>
                                    <select className='w-full px-2 text-[#606060] outline-none' value={category} onChange={(e) => setCategory(e.target.value)}>
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
                                <div className='border flex py-2 rounded-md peer-focus:outline-green-600'>
                                    <input
                                        className='w-full px-2 outline-none peer'
                                        type='text'
                                        placeholder='Image Url'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                </div>
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
                                <div className='border flex py-2 rounded-md peer-focus:outline-green-600'>
                                    <textarea className='w-full outline-none' rows="13" value={description} onChange={(e) => setDescription(e.target.value)}
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
                                    <p className=''>Write your product description with a minimum of 260 characters so that buyers can easily understand it.</p>
                                    <div className='flex text-[#606060]'>
                                        <p>0</p>
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
                                <div className='border flex rounded-md peer-focus:outline-green-600'>
                                    <h1 className='bg-[#F3F4F5] p-2 rounded-s-md'>Rp</h1>
                                    <input
                                        className='w-full px-2 outline-none peer'
                                        type='number'
                                        placeholder='Enter the price'
                                        min='0'
                                        step='100'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
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
                                <div className='border flex rounded-md peer-focus:outline-green-600 py-2'>
                                    <input
                                        className='w-full px-2 outline-none peer'
                                        type='number'
                                        placeholder='Enter the stock quantity'
                                        min='0'
                                        step='1'
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className='border border-green-500 px-10 py-2 rounded-md bg-green-400'>Edit Product</button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default EditProductPage