import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
// import { deleteDoc, doc } from 'firebase/firestore'
// import { db } from '../config/firebase'
import { ProductAdminTable } from '../components/index'
// import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../app/actions'

function AdminPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate('')
    const { products, loadingProducts } = useSelector(state => state.product)
    const { user, isLoading } = useContext(AuthContext)

    const email = user?.email

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
        if (!loadingProducts && email) {
            dispatch(getProducts(email))
        }
    }, [user, isLoading, loadingProducts])

    if (isLoading) return (
        <div className='flex flex-col justify-center items-center h-[calc(100vh-100px)]'>
            <h1 className='text-2xl'>Loading...</h1>
        </div>
    )

    return (
        <main>
            <h1 className='font-bold text-4xl'>Welcome to Admin Page</h1>
            <h3>User: {user?.email}</h3>
            <ProductAdminTable products={products} />
        </main>
    )
}

export default AdminPage