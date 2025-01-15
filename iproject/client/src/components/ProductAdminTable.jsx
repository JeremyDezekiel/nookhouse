import React from 'react'
import { ProductAdminRow } from '../components/index'

function ProductAdminTable({ productsByEmail }) {
    return (
        <div className='overflow-x-auto'>
            <table className='border border-collapse w-full mt-5 text-center table-auto overflow-scroll'>
                <thead>
                    <tr>
                        <th className='p-2 border'>No</th>
                        <th className='p-2 border'>Product Name</th>
                        <th className='p-2 border'>Image</th>
                        <th className='p-2 border'>Category</th>
                        <th className='p-2 border'>Price</th>
                        <th className='p-2 border'>Stock</th>
                        <th className='p-2 border hidden'>Product Specifications</th>
                        <th className='p-2 border'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsByEmail.length !== 0 ? (
                            productsByEmail.map((product, index) => {
                                return (
                                    <ProductAdminRow key={product.id} product={product} index={index}/>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center p-4">No data products</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductAdminTable