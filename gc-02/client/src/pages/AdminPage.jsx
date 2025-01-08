import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import { Edit, Trash } from 'lucide-react'

function AdminPage() {
    const { user, isLoading } = useContext(AuthContext)
    const navigate = useNavigate('')
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'))
            let productStore = []
            querySnapshot.forEach((doc) => {
                productStore.push(doc.data())
            })
            setProducts(productStore)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
        getProducts()
    }, [user, isLoading])

    if (isLoading) return <h1>Loading ...</h1>

    return (
        <main>
            <h1 className='font-bold text-4xl'>Welcome to Admin Page</h1>
            <h3>User: {user?.email}</h3>
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
                                <tr key={index}>
                                    <td className='p-2 border'>{index + 1}</td>
                                    <td className='p-2 border'>{product.productName}</td>
                                    <td className='p-2 border'>
                                        <img className='mx-auto' width={300} src={product.imageUrl.image1} alt={product.productName} />
                                    </td>
                                    <td className='p-2 border'>{product.category}</td>
                                    <td className='p-2 border'>Rp {product.price.toLocaleString()}</td>
                                    <td className='p-2 border'>{product.brand}</td>
                                    <td className='p-2 border text-start'>
                                        <ul className='grid justify-center'>
                                            <li>color: {product.productSpecifications.color}</li>
                                            <li>height: {product.productSpecifications.height} cm</li>
                                            <li>length: {product.productSpecifications.length} cm</li>
                                            <li>weight: {product.productSpecifications.weight} kg</li>
                                            <li>width: {product.productSpecifications.width} cm</li>
                                            {product.productSpecifications.material.map((material, idx) => {
                                                return <li key={idx}>{material}</li>
                                            })}

                                        </ul>
                                    </td>
                                    <td className='p-2 border'>
                                        <button><Edit /></button>
                                        <button><Trash /></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </main>
    )
}

export default AdminPage