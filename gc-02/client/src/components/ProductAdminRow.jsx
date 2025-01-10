import React from 'react'
import { Edit, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ProductAdminRow({ product, index , deleteProduct}) {
    const navigate = useNavigate()

    return (
        <tr>
            <td className='p-2 border'>{index + 1}</td>
            <td className='p-2 border'>{product.name}</td>
            <td className='p-2 border'>
                <img className='mx-auto' width={300} src={product.images[0]} alt={product.name} />
            </td>
            <td className='p-2 border'>{product.category}</td>
            <td className='p-2 border'>Rp {product.price.toLocaleString()}</td>
            <td className='p-2 border text-start w-96'>{product.description}</td>
            <td className='p-2 border'>
                <button className='p-2 hover:bg-blue-500 rounded-md text-black hover:text-white' onClick={() => navigate('/edit-product/' + product.id)}><Edit /></button>
                <button className='p-2 hover:bg-red-500 rounded-md ms-5 text-black hover:text-white' onClick={() => deleteProduct(product.id)}><Trash /></button>
            </td>
        </tr>
    )
}

export default ProductAdminRow