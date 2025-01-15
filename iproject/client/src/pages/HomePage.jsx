import React from 'react'
import ProductUserCard from '../components/ProductUserCard'

function HomePage() {
    return (
        <div>
            <div className='w-full text-center text-9xl'>Hero</div>
            <div>
                
            </div>
            <div>
                <h1 className='text-center'>Products</h1>
                <div className='grid grid-cols-6'>
                    <ProductUserCard/>
                </div>
            </div>
        </div>
    )
}

export default HomePage