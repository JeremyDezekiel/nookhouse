import React, { useContext } from 'react'
import { Edit, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../app/actions'
import { AuthContext } from '../context/AuthContext'

function ProductAdminRow({ product, index }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useContext(AuthContext)
    const email = user?.email

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id, email))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your product has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <tr>
            <td className='p-2 border'>{index + 1}</td>
            <td className='p-2 border'>{product.name}</td>
            <td className='p-2 border'>
                <img className='mx-auto' width={300} src={product.images[0]} alt={product.name} />
            </td>
            <td className='p-2 border'>{product.category}</td>
            <td className='p-2 border'>Rp {product.price.toLocaleString()}</td>
            <td className='p-2 border'>{product.stock}</td>
            <td className='p-2 border text-start hidden'>{product.description}</td>
            <td className='p-2 border'>
                <button className='p-2 hover:bg-blue-500 rounded-md text-black hover:text-white' onClick={() => navigate('/edit-product/' + product.id)}><Edit /></button>
                <button className='p-2 hover:bg-red-500 rounded-md xl:ms-5 text-black hover:text-white' onClick={() => handleDelete(product.id)}><Trash /></button>
            </td>
        </tr>
    )
}

export default ProductAdminRow