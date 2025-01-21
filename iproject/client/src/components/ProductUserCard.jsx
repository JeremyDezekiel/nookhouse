import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProductUserCard({ filteredProduct }) {
    const navigate = useNavigate()

    return (
        <div className='max-h-[450px] cursor-pointer h-full group grid' onClick={() => navigate('/product/' + filteredProduct.id)}>
            <img className='mx-auto rounded-t-2xl group-hover:hidden' src={filteredProduct.images[0]} alt={filteredProduct.name} />
            <img className='mx-auto rounded-t-2xl hidden group-hover:block' src={filteredProduct.images[1]} alt={filteredProduct.name} />
            <p className='mb-5'>{filteredProduct.name}</p>
            <div className='grid items-end'>
                <div className='flex gap-2 items-center'>
                    <p className={`${filteredProduct.discount !== 0 ? 'text-lg line-through' : 'text-xl'}`}>Rp {filteredProduct.price.toLocaleString()}</p>
                    {filteredProduct.discount !== 0 && <p className='bg-red-500 px-2 rounded-full'>{filteredProduct.discount}%</p>}
                </div>    
                { filteredProduct.discount !== 0 && (
                    <p className='text-xl text-red-500 ms-5'>Rp {filteredProduct.discountPrice.toLocaleString()}</p>
                )}
            </div>
        </div>
    )
}

export default ProductUserCard