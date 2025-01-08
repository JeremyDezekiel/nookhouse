import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import ProductAdminTable from '../components/ProductAdminTable'

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
            <ProductAdminTable products={products}/>
        </main>
    )
}

export default AdminPage