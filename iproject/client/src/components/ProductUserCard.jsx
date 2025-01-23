import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProductUserCard({ filteredProduct }) {
    const navigate = useNavigate()

    return (
        <div className='max-h-[450px] cursor-pointer min-h-[450px] group flex flex-col relative' onClick={() => navigate('/product/' + filteredProduct.id)}>
            {
                filteredProduct.images.length > 1 ? (
                    <div className='relative h-[280px]'>
                        <img className='mx-auto rounded-t-2xl opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out absolute inset-0' src={filteredProduct.images[0]} alt={filteredProduct.name} />
                        <img className='mx-auto rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out absolute inset-0' src={filteredProduct.images[1]} alt={filteredProduct.name} />
                    </div>
                ) : (
                        <div className='relative h-[280px]'>
                            <img className='mx-auto rounded-t-2xl opacity-100 group-hover:opacity-100 transition-opacity duration-300 ease-in-out absolute inset-0' src={filteredProduct.images[0]} alt={filteredProduct.name} />
                        </div>
                )
            }
            <p className='mb-5 mt-5'>{filteredProduct.name}</p>
            <div className='flex flex-col items-start'>
                <div className='flex gap-2 items-center'>
                    <p className={`${filteredProduct.discount !== 0 ? 'text-lg line-through' : 'text-xl'}`}>Rp {filteredProduct.price.toLocaleString()}</p>
                    {filteredProduct.discount !== 0 && <p className='bg-red-500 px-2 rounded-full text-white mb-2'>{filteredProduct.discount}%</p>}
                </div>
                {filteredProduct.discount !== 0 && (
                    <p className='text-xl text-red-500 ms-5'>Rp {filteredProduct.discountPrice.toLocaleString()}</p>
                )}
            </div>
        </div>
    )
}

export default ProductUserCard