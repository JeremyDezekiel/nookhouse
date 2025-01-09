import React from 'react'
import { Edit, Trash } from 'lucide-react'

function ProductAdminRow({ product, index , deleteProduct}) {

    return (
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
                    <li>material: {product.material.join(', ')}</li>
                    {/* {product.productSpecifications.material.map((material, idx) => {
                                                return <li key={idx}>{material}</li>
                                            })} */}
                </ul>
            </td>
            <td className='p-2 border'>
                <button><Edit /></button>
                <button className='p-2 hover:bg-red-500 rounded-md ms-5 text-black hover:text-white' onClick={() => deleteProduct(product.id)}><Trash /></button>
            </td>
        </tr>
    )
}

export default ProductAdminRow