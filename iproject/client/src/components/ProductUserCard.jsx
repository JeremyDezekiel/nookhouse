import React from 'react'

function ProductUserCard({ filteredProduct }) {
    return (
        <div className='max-h-96'>
            <img className='mx-auto' src={filteredProduct.images[0]} alt={filteredProduct.name} />
            <p className='mb-5'>{filteredProduct.name}</p>
            <div className='flex justify-between'>
                <span>Rp {filteredProduct.price.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default ProductUserCard