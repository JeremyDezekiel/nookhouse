import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutCart, getCartByUser, deleteProductInCart, editProductInCart } from '../app/actions'
import Swal from 'sweetalert2'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { ProductCart } from '../components'

function CartPage() {
    const { user, isLoading, profile, setProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const idUser = user?.uid
    const { cartProduct } = useSelector(state => state.cart)

    const [totalProduct, setTotalProduct] = useState(0)

    const totalPriceInCart = cartProduct.reduce((acc, product) => acc + product.totalPrice, 0)

    const countQty = () => {
        const total = cartProduct.reduce((acc, product) => acc + product.quantity, 0)
        setTotalProduct(total)
    }

    const handleCheckout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to return!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Im sure!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(checkoutCart(idUser))
                Swal.fire({
                    title: "Sweet!",
                    text: "Your order has been received and is being processed.",
                    imageUrl: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXRjYmxpZTQ3djcwZHB3YzFua21hOHJqbHAzYjhsMzludWQxanY3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EEehD3gmtFcHmQ4nhI/giphy.gif",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image"
                })
            }
        })
    }

    const handleUpdate = async (qty, idProduct, productsCart) => {
        try {
            const updatedTotalPrice = productsCart.discount ? productsCart.discountPrice * qty : productsCart.price * qty
            dispatch(editProductInCart(idUser, idProduct, productsCart, qty, updatedTotalPrice))
            dispatch(getCartByUser(idUser))
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProductInCart = (idProduct) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProductInCart(idUser, idProduct))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your product has been delete.",
                    icon: "success"
                })
            }
        })
    }

    const updateUser = async () => {
        try {
            await updateDoc(doc(db, 'users', idUser), {
                totalCartQty: totalProduct
            })
        } catch (error) {
            console.error()
        }
    }

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
        if (idUser) {
            dispatch(getCartByUser(idUser))
        }
    }, [user, isLoading])

    useEffect(() => {
        countQty()
        setProfile({
            ...profile,
            totalCartQty: totalProduct
        })
        if (idUser && totalProduct !== profile.totalCartQty) {
            updateUser()
        }
    }, [cartProduct, totalProduct])

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen w-screen z-50 absolute top-0 left-0 right-0 bottom-0 bg-white">
                <div className="w-40 h-40 border-4 border-gray-500 border-dashed rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
            </div>
        )
    }

    return (
        <div>
            <div>
                <h1 className='text-4xl'>Your shopping cart</h1>
            </div>
            <div className='flex justify-end border-b-[1px] pb-5'>
                <div className='flex gap-52 text-xl text-end'>
                    <h3>Total</h3>
                    <h3>SubTotal</h3>
                </div>
            </div>
            {
                cartProduct.length !== 0 ? (
                    cartProduct.map((productsCart) => (
                        <ProductCart 
                            key={productsCart.id}
                            productsCart={productsCart}
                            idUser={idUser}
                            handleUpdate={handleUpdate}
                            handleDeleteProductInCart={handleDeleteProductInCart}
                        />
                    ))
                ) : (
                    <div className='border-b-[1px] py-5'>
                        <h1>No Product In Your Cart</h1>
                    </div>
                )
            }
            <div className='flex justify-end my-5 gap-14 items-center'>
                <div className='flex'>
                    <p className='me-2'>{profile.totalCartQty}</p>
                    {profile.totalCartQty !== 1 ? <h3>Products in your cart:</h3> : <h3>Product in your cart:</h3>}
                    <p className='ms-3'>Rp {totalPriceInCart.toLocaleString()}</p>
                </div>
                <button
                    className={`text-white py-2 px-5 rounded-full bg-blue-600 ${cartProduct.length !== 0 && 'hover:bg-blue-500'}`}
                    onClick={handleCheckout}
                    disabled={cartProduct.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default CartPage
