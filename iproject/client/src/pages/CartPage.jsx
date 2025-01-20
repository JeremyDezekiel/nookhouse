import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCartByUser } from '../app/actions'
import ProductCart from '../components/ProductCart'

function CartPage() {
    const { user, isLoading, profile, setProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const idUser = user?.uid
    const { cartProduct } = useSelector(state => state.cart)
    // console.log(cartProduct)

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
        if (idUser) {
            dispatch(getCartByUser(idUser))
        }
    }, [user, isLoading])

    if (!user) {
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
                cartProduct.lenght !== 0 ? (
                    cartProduct.map((productsCart) => {
                        return (
                            <ProductCart key={productsCart.id} productsCart={productsCart} idUser={idUser} profile={profile} setProfile={setProfile} cartProduct={cartProduct} />
                        )
                    })
                ) : (
                    <div>
                        <h1>No Product In Your Cart</h1>
                    </div>
                )
            }
            <div className='flex justify-end my-5'>
                <button
                    className='text-white py-2 px-5 rounded-full bg-blue-600 hover:bg-blue-500'
                >
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default CartPage