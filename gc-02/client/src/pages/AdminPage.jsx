import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { ProductAdminTable } from '../components/index'
import Swal from 'sweetalert2'

function AdminPage() {
    const { user, isLoading } = useContext(AuthContext)
    const navigate = useNavigate('')
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const products = await getDocs(collection(db, 'products'))
            const productsStore = products.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setProducts(productsStore)
        } catch (error) {
            console.error(error)
        }
    }

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
            }).then( async (result) => {
                if (result.isConfirmed) {
                    await deleteDoc(doc(db, 'products', id))
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success"
                    });
                    getProducts()
                }
            });
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
            <ProductAdminTable products={products} deleteProduct={deleteProduct}/>
        </main>
    )
}

export default AdminPage