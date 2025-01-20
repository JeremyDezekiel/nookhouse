import React, { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'

function ProductCart({ productsCart, handleUpdate, handleDeleteProductInCart }) {
    const [qtyProductUser, setQtyProductUser] = useState(productsCart.quantity)
    const [totalPriceUser, setTotalPriceUser] = useState(productsCart.totalPrice)

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
                        <p>Product Weight: {productsCart.weight / 1000} Kg</p>
                        <p>Product Dimensions: {productsCart.length} x {productsCart.width} x {productsCart.height}</p>
                    </div>
                </div>
                <div className='flex gap-40'>
                    <div className='flex border m-auto rounded-full items-center justify-end h-fit'>
                        <button
                            className={`px-4 py-2 rounded-s-full ${qtyProductUser === 1 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
                            onClick={() => {
                                const newQty = qtyProductUser - 1
                                setQtyProductUser(newQty)
                                handleUpdate(newQty, productsCart.id, productsCart)
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
                                handleUpdate(newQty, productsCart.id, productsCart)
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
                <button onClick={() => handleDeleteProductInCart(productsCart.id)}>
                    <Trash2 />
                </button>
            </div>
        </div>
    )
}

export default ProductCart
