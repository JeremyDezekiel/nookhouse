import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { deleteProductInCart, editProductInCart, getCartByUser } from '../app/actions'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import Swal from 'sweetalert2'

function ProductCart({ productsCart, idUser, profile, setProfile, cartProduct }) {
    const dispatch = useDispatch()

    const idProduct = productsCart?.id

    const [qtyProductUser, setQtyProductUser] = useState(productsCart.quantity)
    const [totalPriceUser, setTotalPriceUser] = useState(productsCart.totalPrice)

    const total = cartProduct.reduce((acc, product) => acc + product.quantity, 0)

    const handleUpdate = async (qty) => {
        try {
            const updatedTotalPrice = productsCart.discount ? productsCart.discountPrice * qty : productsCart.price * qty
            dispatch(editProductInCart(idUser, idProduct, productsCart, qty, updatedTotalPrice))
            dispatch(getCartByUser(idUser))
        } catch (error) {
            console.log(error)
        }
    }
    const updateUser = async () => {
        try {
            await updateDoc(doc(db, 'users', idUser), {
                totalCartQty: total
            })
        } catch (error) {
            console.error()
        }
    }

    const handleDeleteProductInCart = () => {
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
                    text: "Your product has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    useEffect(() => {
        setProfile({
            ...profile,
            totalCartQty:total
        })
        if (idUser && total !== profile.totalCartQty) {
            updateUser()
        }
    }, [total])

    useEffect(() => {
        setTotalPriceUser(productsCart.totalPrice)
        setQtyProductUser(productsCart.quantity)
    }, [productsCart])
    return (
        <div className='border-b-[1px] py-5'>
            <div className='flex justify-between'>
                <div className='flex gap-10 items-center'>
                    <img className='size-40' src={productsCart.images[0]} alt={productsCart.name} />
                    <div className='grid gap-2'>
                        <h4>{productsCart.name}</h4>
                        <h4>{productsCart.category}</h4>
                        <div>
                            <h2 className={`${productsCart.discount !== 0 ? 'text-lg line-through' : 'text-2xl'}`}>Rp {productsCart.price.toLocaleString()}</h2>
                            {productsCart.discount !== 0 && (
                                <h2 className='text-red-500 text-2xl ms-5'>Rp {productsCart.discountPrice.toLocaleString()}</h2>
                            )}
                        </div>
                        <p>Berat Product: {productsCart.weight / 1000} Kg</p>
                        <p>Dimensi Product: {productsCart.length} x {productsCart.width} x {productsCart.height}</p>
                    </div>
                </div>
                <div className='flex gap-40'>
                    <div className='flex border m-auto rounded-full items-center justify-end h-fit'>
                        <button
                            className={`px-4 py-2 rounded-s-full ${qtyProductUser === 1 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
                            onClick={() => {
                                const newQty = qtyProductUser - 1
                                setQtyProductUser(newQty)
                                handleUpdate(newQty)
                            }}
                            disabled={qtyProductUser === 1}
                        >
                            -
                        </button>
                        <p className='px-4'>{qtyProductUser}</p>
                        <button
                            className={`px-4 py-2 rounded-e-full ${qtyProductUser === productsCart.stock ? 'text-gray-300' : 'hover:bg-gray-100'}`}
                            onClick={() => {
                                const newQty = qtyProductUser + 1
                                setQtyProductUser(newQty)
                                handleUpdate(newQty)
                            }}
                            disabled={qtyProductUser === productsCart.stock}
                        >
                            +
                        </button>
                    </div>
                    <div className='m-auto'>
                        <h1 className='text-3xl'>Rp {totalPriceUser.toLocaleString()}</h1>
                    </div>
                </div>
            </div>
            <div className='flex justify-end mt-5'>
                <button
                    onClick={() => handleDeleteProductInCart()}
                >
                    <Trash2 />
                </button>
            </div>
        </div>
    )
}

export default ProductCart