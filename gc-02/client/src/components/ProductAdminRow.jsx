import React from 'react'
import { Edit, Trash } from 'lucide-react'

function ProductAdminRow({ product, index }) {
    return (
        <>
            { product ? 
            <tr>
                <td className='p-2 border'>{index + 1}</td>
                <td className='p-2 border'>{product.name}</td>
                <td className='p-2 border'>
                    <img className='mx-auto' width={300} src={product.imageUrl[0]} alt={product.name} />
                </td>
                <td className='p-2 border'>{product.category}</td>
                <td className='p-2 border'>Rp {product.price.toLocaleString()}</td>
                <td className='p-2 border'>{product.brand}</td>
                <td className='p-2 border text-start'>
                    <ul className='grid justify-center'>
                        <li>color: {product.color}</li>
                        <li>height: {product.height} cm</li>
                        <li>length: {product.length} cm</li>
                        <li>weight: {product.weight} kg</li>
                        <li>width: {product.width} cm</li>
                        <li>material: {product.material[0]}</li>
                        <li>material: {product.material[1]}</li>
                        {/* {product.productSpecifications.material.map((material, idx) => {
                                                return <li key={idx}>{material}</li>
                                            })} */}
                    </ul>
                </td>
                <td className='p-2 border'>
                    <button><Edit /></button>
                    <button><Trash /></button>
                </td>
            </tr> : 
            <tr>
                <td colSpan={8} className='text-center align-middle p-2 border'>No Data Products</td>
            </tr>
            }
        </>
    )
}

export default ProductAdminRow