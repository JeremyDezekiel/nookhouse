import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { collection, getDocs} from 'firebase/firestore'
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

    useEffect (() => {
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
                    <tr>
                        <td className='p-2 border'>1</td>
                        <td className='p-2 border'>Soleil Folding Chair</td>
                        <td className='p-2 border'>
                            <img className='mx-auto' src='https://cdn.ruparupa.io/fit-in/400x400/filters:format(webp)/filters:quality(90)/ruparupa-com/image/upload/Products/10150788_1.jpg' alt='soleilfoldingchair'/>
                        </td>
                        <td className='p-2 border'>chair</td>
                        <td className='p-2 border'>Rp 149.000</td>
                        <td className='p-2 border'>SOLEIL</td>
                        <td className='p-2 border'>
                            <ul>
                                <li>color: black</li>
                                <li>height: 80 cm</li>
                                <li>length: 44.5 cm</li>
                                <li>material: steel</li>
                                <li>weight: 2.15 kg</li>
                                <li>width: 49 cm</li>
                            </ul>
                        </td>
                        <td className='p-2 border'>
                            <button><Edit/></button>
                            <button><Trash/></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}

export default AdminPage