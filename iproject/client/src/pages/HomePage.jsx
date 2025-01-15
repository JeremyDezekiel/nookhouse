import React, { useEffect } from 'react'
import ProductUserCard from '../components/ProductUserCard'
import { getProducts } from '../app/actions'
import { useDispatch, useSelector } from 'react-redux'

function HomePage() {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <div>
            <div className='w-full text-center text-9xl'>Hero</div>
            <div>
                
            </div>
            <div>
                <h1 className='text-center'>Products</h1>
                <div className='grid grid-cols-6 gap-5'>
                    {
                        products.map((product) => {
                            return(
                                <ProductUserCard key={product.id} product={product}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage