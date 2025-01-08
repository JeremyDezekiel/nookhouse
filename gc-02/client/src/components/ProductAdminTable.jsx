import React from 'react'
import ProductAdminRow from '../components/ProductAdminRow'

function ProductAdminTable({ products }) {
    return (
        <table className='border border-collapse w-full mt-5 text-center'>
            <thead>
                <tr>
                    <th className='p-2 border'>ID</th>
                    <th className='p-2 border'>Product Name</th>
                    <th className='p-2 border'>Image</th>
                    <th className='p-2 border'>Category</th>
                    <th className='p-2 border'>Price</th>
                    <th className='p-2 border'>Brand</th>
                    <th className='p-2 border'>Product Specifications</th>
                    <th className='p-2 border'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product, index) => {
                        return (
                            <ProductAdminRow key={index} product={product} index={index} />
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default ProductAdminTable