import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { LoadingPage, ProductAdminTable } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByEmail } from '../app/actions'

function AdminPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate('')
    const { productsByEmail, loadingProducts } = useSelector(state => state.product)
    const { user, isLoading, role, username } = useContext(AuthContext)

    const email = user?.email

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
        if (!loadingProducts && email) {
            dispatch(getProductsByEmail(email))
        }
    }, [user, isLoading])
    
    if (isLoading) {
        return (
            <LoadingPage/>
        )
    }
    
    return (
        <main>
            <h1 className='font-bold md:text-4xl'>Welcome to Admin Page</h1>
            {!isLoading ? <h3 className='text-xs md:text-base'>User: {username} - {user?.email} - {role}</h3> : <h1>Loading User ...</h1>}
            {!isLoading && !loadingProducts ? <ProductAdminTable productsByEmail={productsByEmail}/> : <h1 className='text-4xl text-center'>Loading Data ...</h1>}
        </main>
    )
}

export default AdminPage