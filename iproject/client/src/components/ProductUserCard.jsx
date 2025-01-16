import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProductUserCard({ filteredProduct }) {
    const navigate = useNavigate()

    return (
        <div className='max-h-96 cursor-pointer' onClick={() => navigate('/product/' + filteredProduct.id)}>
            <img className='mx-auto' src={filteredProduct.images[0]} alt={filteredProduct.name} />
            <p className='mb-5'>{filteredProduct.name}</p>
            <div className='flex justify-between'>
                <span>Rp {filteredProduct.price.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default ProductUserCard