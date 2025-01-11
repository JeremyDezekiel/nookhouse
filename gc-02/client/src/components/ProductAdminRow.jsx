import React, { useContext } from 'react'
import { Edit, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { getProducts } from '../app/actions'
import { AuthContext } from '../context/AuthContext'

function ProductAdminRow({ product, index }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useContext(AuthContext)
    const email = user?.email
    
    const deleteProduct = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteDoc(doc(db, 'products', id))
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success"
                    });
                    dispatch(getProducts(email))
                }
            });
        } catch (error) {
            console.error(error)
        }
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
            <td className='p-2 border text-start w-96'>{product.description}</td>
            <td className='p-2 border'>
                <button className='p-2 hover:bg-blue-500 rounded-md text-black hover:text-white' onClick={() => navigate('/edit-product/' + product.id)}><Edit /></button>
                <button className='p-2 hover:bg-red-500 rounded-md ms-5 text-black hover:text-white' onClick={() => deleteProduct(product.id)}><Trash /></button>
            </td>
        </tr>
    )
}

export default ProductAdminRow