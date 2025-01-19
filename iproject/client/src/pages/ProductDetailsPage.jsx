import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addProductToCart, getCartByUser, getProduct } from '../app/actions'
import { ArrowLeftCircle, ArrowRightCircle, Circle, Drill, ThumbsUp, Truck, Warehouse } from 'lucide-react'
import ImagesDetailsProduct from '../components/ImagesDetailsProduct'
import { AuthContext } from '../context/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

function ProductDetailsPage() {
    const { user, isLoading, profile, setProfile } = useContext(AuthContext)
    const dispatch = useDispatch()
    const { id } = useParams()
    const { product } = useSelector(state => state.product)
    const { cartProduct } = useSelector(state => state.cart)
    const [show, setShow] = useState(true)

    const [imageIdx, setImageIdx] = useState(0)
    const [buyer, setBuyer] = useState('')
    const [qty, setQty] = useState(1)
    const [totalQuantity, setTotalQuantity] = useState(0)

    const color = {
        grey: 'bg-[#CBCBCB]',
        white: 'bg-[#FFFFFF]'
    }

    const dataCategory = [
        'Furniture',
        'Shelves & Storage',
        'Bed & Bath',
    ]

    const handleButtonImage = (idx) => {
        if (idx >= 0 && idx < product.images.length) {
            setImageIdx(idx)
        }
    }

    const changeImage = (idx) => {
        setImageIdx(idx)
    }

    const getRandomBuyer = () => {
        setBuyer(Math.floor(Math.random() * 10000) + 1)
    }

    const setColorProduct = (e) => {
        return color[e]
    }
    const idProduct = id
    const idUser = profile?.id

    
    const handleAddCart = async (qty) => {
        try {
            dispatch(addProductToCart(idUser, idProduct, product, qty))
            dispatch(getCartByUser(idUser))
        } catch (error) {
            console.log(error)
        }
    }
    
    const countQty = () => {
        const total = cartProduct.reduce((acc, product) => acc + product.quantity, 0)
        setTotalQuantity(total)
    }
    
    const updateUser = async () => {
        try {
            await updateDoc(doc(db, 'users', idUser), {
                totalCartQty: totalQuantity
            })
        } catch (error) {
            console.error()
        }
    }
    
    useEffect(() => {
        countQty()
        setProfile({
            ...profile,
            totalCartQty: totalQuantity
        })
        // if (idUser && totalQuantity !== profile?.totalCartQty) {
        //     updateUser()
        // }
    }, [cartProduct, totalQuantity])
    
    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
        if (idUser && idProduct) {
            dispatch(getProduct(idProduct))
            dispatch(getCartByUser(idUser))
        }
    }, [user, isLoading, idUser])
    
    useEffect(() => {
        getRandomBuyer()
    }, [])

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen w-screen z-50 absolute top-0 left-0 right-0 bottom-0 bg-white">
                <div
                    className="w-40 h-40 border-4 border-gray-500 border-dashed rounded-full animate-spin"
                    style={{ animationDuration: '10s' }}>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='grid grid-cols-3 mt-14 gap-5 items-start'>
                <div className='col-span-2 flex flex-col justify-center gap-5'>
                    <img className='size-[500px] mx-auto rounded-md' src={product.images[imageIdx]} alt={product.name} />
                    <div className='flex justify-center gap-3 group items-center relative'>
                        <button
                            className={`absolute left-20 hidden ${imageIdx !== 0 && 'group-hover:block'}`}
                            onClick={() => handleButtonImage(imageIdx - 1)}
                        >
                            <ArrowLeftCircle size={35} />
                        </button>
                        {product.images.map((image, idx) => (
                            <ImagesDetailsProduct key={idx} image={image} idx={idx} imageIdx={imageIdx} changeImage={changeImage} />
                        ))}
                        <button
                            className={`absolute hidden right-20 ${imageIdx !== (product.images.length - 1) && 'group-hover:block'}`}
                            onClick={() => handleButtonImage(imageIdx + 1)}
                        >
                            <ArrowRightCircle size={35} />
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-5xl'>{product.name}</h1>
                    <div>
                        <div className='flex gap-5 items-start mb-2'>
                            <h1 className={`${product.discount !== 0 ? 'text-3xl line-through' : 'text-4xl'}`}>Rp{product.price.toLocaleString()}</h1>
                            {product.discount !== 0 && <p className='bg-red-500 px-2 rounded-full'>{product.discount}%</p>}
                        </div>
                        {product.discount !== 0 && (
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-red-500 text-4xl'>Rp {product.discountPrice.toLocaleString()}</h1>
                                <p className='text-sm'>While supplies last</p>
                            </div>
                        )}
                        <p className='text-sm'>{buyer} people have bought this product</p>
                    </div>
                    <div className='flex gap-5 bg-yellow-300 py-2 px-4 rounded-md'>
                        <ThumbsUp />
                        <p className=''>{buyer} people have bought this product</p>
                    </div>
                    <div className='flex gap-3'>
                        <h1>Color :</h1>
                        <div className='flex gap-2 items-center'>
                            <div className={`${setColorProduct(product.color)} border-2 border-black size-5 rounded-full`}></div>
                            <p>{product.color}</p>
                        </div>
                    </div>
                    <div className='border-y-[1px] py-5 flex flex-col gap-5'>
                        <div className='flex justify-between items-center'>
                            <h3>Total :</h3>
                            <div className='flex border rounded-full items-center'>
                                <button
                                    className={`px-4 py-2  rounded-s-full ${qty === 1 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
                                    onClick={() => setQty(qty - 1)}
                                    disabled={qty === 1}
                                >
                                    -
                                </button>
                                <p className='px-4'>{qty}</p>
                                <button
                                    className={`px-4 py-2 hover:bg-gray-100 rounded-e-full  ${qty === product.stock ? 'text-gray-300' : 'hover:bg-gray-100'}`}
                                    onClick={() => setQty(qty + 1)}
                                    disabled={qty === product.stock}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            className='flex-1 py-4 px-5 rounded-full bg-blue-700 text-white hover:bg-blue-600'
                            onClick={() => handleAddCart(qty)}
                        >
                            Add to shopping cart
                        </button>
                    </div>
                    <div className='flex flex-col gap-3 pb-5 border-b-[1px]'>
                        <div className='flex gap-5'>
                            <Truck />
                            <h1 className='text-gray-500'>Shipping starts from Rp 29,900</h1>
                        </div>
                        {dataCategory.includes(product.category) && (
                            <div className='flex gap-5'>
                                <Drill />
                                <h1 className='text-gray-500'>Assembly starts from Rp 199,000</h1>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col gap-3 pb-5 border-b-[1px]'>
                        <div className='flex gap-5'>
                            <Warehouse />
                            <h1 className='text-gray-500'>Find the product in store</h1>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 pb-5'>
                        <div className='flex gap-5 items-center'>
                            <Circle size={20} className='text-green-600 bg-green-600 rounded-full' />
                            <h1 className='text-gray-500'>Stock available, {product.stock} in <b>Online</b></h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-y-[1px] cursor-pointer group mb-14 pb-5'>
                <div className='flex justify-between pt-5' onClick={() => setShow(prevState => !prevState)}>
                    <p className='text-lg text-[#967259] group-hover:underline'>Summary</p>
                    <p className={`text-gray-400 duration-500 ${show ? 'rotate-0' : 'rotate-180'}`}>V</p>
                </div>
                {show && (
                    <div className='flex justify-between gap-56 pt-3'>
                        <h1 className='text-2xl'>Description</h1>
                        <p className='text-lg'>{product.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetailsPage