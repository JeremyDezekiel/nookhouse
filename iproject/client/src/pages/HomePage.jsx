import React, { useContext, useEffect, useState } from 'react'
import { ProductUserCard } from '../components'
import { getFilterProducts, getProducts } from '../app/actions'
import { useDispatch, useSelector } from 'react-redux'
import { setFilteredProducts, setSearch } from '../app/slices/productSlice'
import { AuthContext } from '../context/AuthContext'

const Page_Size = 10

function HomePage() {
    const dispatch = useDispatch()
    const { products, filteredProducts, search, loadingProducts } = useSelector(state => state.product)
    const { isLoading } = useContext(AuthContext)

    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState('')
    const [filterColor, setFilterColor] = useState('')
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    // console.log(totalPages)

    const handleReset = () => {
        setSort('')
        setFilter('')
        dispatch(setSearch(''))
        setFilterColor('')
    }

    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1)
    const handlePrevPage = () => setCurrentPage((prevPage) => prevPage - 1)
    
    useEffect(() => {
        const handleFilter = async () => {
            dispatch(getFilterProducts(filter, sort, search, filterColor, Page_Size, setTotalPages, setCurrentPage, currentPage))
        }
        handleFilter()
    }, [filter, sort, search, filterColor, currentPage])

    useEffect(() => {
            dispatch(getProducts())
            dispatch(setFilteredProducts(products))
    }, [])

    if (isLoading ) {
        return (
            <div className="flex justify-center items-center h-screen w-screen z-50 absolute top-0 left-0 right-0 bottom-0 bg-white">
                <div
                    className="w-40 h-40 border-4 border-gray-500 border-dashed rounded-full animate-spin"
                    style={{ animationDuration: '10s' }}>
                </div>
            </div>
        )
    }

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

                <select
                    className='border py-1 px-2 rounded-md cursor-pointer'
                    value={filterColor}
                    onChange={(e) => setFilterColor(e.target.value)}
                >
                    <option value='' hidden>Filter by Color</option>
                    <option value=''>All</option>
                    <option value='black'>Black</option>
                    <option value='white'>White</option>
                    <option value='brown'>Brown</option>
                    <option value='grey'>Grey</option>
                    <option value='cream'>Cream</option>
                    <option value='silver'>Silver</option>
                    <option value='yellow'>Yellow</option>
                </select>
                { filter || sort || search || filterColor ? <button className='py-1 px-2 border rounded-md' onClick={() => handleReset()}>Reset</button> : ''}
            </div>
            <div className='w-full text-center text-9xl'>
                Banner
            </div>
            <div>
                <div className="grid grid-cols-5 gap-5">
                    {
                        !filteredProducts || loadingProducts ? (
                            <div className="col-span-5 text-center text-4xl">
                                <h1>Loading ...</h1>
                            </div>
                        ) : (
                            filteredProducts.length !== 0 ? (
                                filteredProducts.map((filteredProduct) => {
                                    return (
                                        <ProductUserCard key={filteredProduct.id} filteredProduct={filteredProduct} />
                                    );
                                })
                            ) : (
                                <div className="col-span-5 text-center">
                                    <p>No Data Products</p>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            <div className='flex items-center justify-end gap-4 mt-10'>
                <button
                    className={`bg-blue-700 text-white py-1 px-2 rounded-lg ${currentPage === 1 || currentPage === 0 ? 'bg-gray-400' : 'hover:bg-blue-600'}`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1 || currentPage === 0}
                >
                    Prev
                </button>
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <button 
                    className={`bg-blue-700 text-white py-1 px-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-400' : 'hover:bg-blue-600'}`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default HomePage