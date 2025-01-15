import React from 'react'

function ProductUserCard({ product }) {
    return (
        <div className='max-h-96'>
            <img className='mx-auto' src={product.images[0]} alt={product.name} />
            <p className='mb-5'>{product.name}</p>
            <div className='flex justify-between'>
                <span>Rp {product.price.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default ProductUserCard