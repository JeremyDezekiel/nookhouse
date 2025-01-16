import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProduct } from '../app/actions'

function ProductDetailsPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { product } = useSelector(state => state.product)
    const [show, setShow] = useState(true)

    useEffect(() => {
        dispatch(getProduct(id))
    }, [])

    if (!product) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div
                    className="w-40 h-40 border-4 border-gray-500 border-dashed rounded-full animate-spin"
                    style={{ animationDuration: '10s' }}>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='grid grid-cols-2 my-14'>
                <div className='flex justify-center'>
                    <img src={product.images[0]} alt={product.name} />
                </div>
                <div className='grid '>
                    <h1 className='text-5xl'>{product.name}</h1>
                    <p>Rp{product.price.toLocaleString()}</p>
                </div>
            </div>
            <div className='border-y-[1px] cursor-pointer group mb-14 pb-5'>
                <div className='flex justify-between pt-5' onClick={() => setShow(prevState => !prevState)}>
                    <p className='text-lg text-[#967259] group-hover:underline'>Ringkasan</p>
                    <p className={`text-gray-400 duration-500 ${show ? 'rotate-0' : 'rotate-180'}`}>V</p>
                </div>
                { show && (
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