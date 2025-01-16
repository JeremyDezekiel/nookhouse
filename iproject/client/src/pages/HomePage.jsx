import React, { useEffect, useState } from 'react'
import ProductUserCard from '../components/ProductUserCard'
import { getProducts } from '../app/actions'
import { useDispatch, useSelector } from 'react-redux'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { setErrorProducts, setLoadingProducts } from '../app/slices/productSlice'
import { db } from '../config/firebase'

function HomePage() {
    const dispatch = useDispatch()
    const { products, isLoading } = useSelector(state => state.product)

    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState('')
    const [filteredProducts, setFilterProducts] = useState([])

    const handleReset = () => {
        setSort('')
        setFilter('')
    }

    useEffect(() => {
        const filterProducts = async () => {
            let q = query(collection(db, 'products'))
            try {
                dispatch(setLoadingProducts(true))
                dispatch(setErrorProducts(null))
                if (filter) {
                    q = query(q, where('category', '==', filter))
                }

                if (sort == 'asc') {
                    q = query(q, orderBy('price', 'asc'))
                } else  if (sort == 'desc') {
                    q = query(q, orderBy('price', 'desc'))
                }

                const products = await getDocs(q)
                const productsStore = products.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setFilterProducts(productsStore)
            } catch (error) {
                console.error(error)
                dispatch(setErrorProducts(error.message))
            } finally {
                dispatch(setLoadingProducts(false))
            }
        }
        filterProducts()
    }, [filter, sort])

    useEffect(() => {
        dispatch(getProducts())
        setFilterProducts(products)
    }, [isLoading])

    return (
        <div>
            <div className='flex gap-5'>
                <select
                    className='border py-1 px-2 rounded-md cursor-pointer'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value='' hidden>Filter by Category</option>
                    <option value=''>All</option>
                    <option value='Furniture'>Furniture</option>
                    <option value='Shelves & Storage'>Shelves & Storage</option>
                    <option value='Minimalist Kitchen'>Minimalist Kitchen</option>
                    <option value='Electronics & Gadgets'>Electronics & Gadgets</option>
                    <option value='Household'>Household</option>
                    <option value='Home Improvement'>Home Improvement</option>
                    <option value='Bed & Bath'>Bed & Bath</option>
                    <option value='Hobbies & Lifestyle'>Hobbies & Lifestyle</option>
                    <option value='Health & Sports'>Health & Sports</option>
                    <option value='Toys & Babies'>Toys & Babies</option>
                    <option value='Automotive'>Automotive</option>
                </select>

                <select
                    className='border py-1 px-2 rounded-md cursor-pointer'
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value='' hidden>Sort By</option>
                    <option value='asc'>Price: Low to High</option>
                    <option value='desc'>price: High to Low</option>
                </select>
                { filter || sort ? <button className='py-1 px-2 border rounded-md' onClick={() => handleReset()}>Reset</button> : ''}
            </div>
            <div className='w-full text-center text-9xl'>Banner</div>
            <div>

            </div>
            <div>
                <h1 className='text-center'>Products</h1>
                <div className='grid grid-cols-6 gap-5'>
                    {
                        filteredProducts.length !== 0 ? (
                            filteredProducts.map((filteredProduct) => {
                                return (
                                    <ProductUserCard key={filteredProduct.id} filteredProduct={filteredProduct} />
                                )
                            })
                        ) : (
                            <div className='col-span-6 text-center'>
                                <p>No Data Products</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage