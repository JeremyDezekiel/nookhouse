import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ProductAdminTable } from '../components/index'
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
            <div className="flex justify-center items-center h-screen w-screen z-50 absolute top-0 left-0 right-0 bottom-0 bg-white">
                <div
                    className="w-40 h-40 border-4 border-gray-500 border-dashed rounded-full animate-spin"
                    style={{ animationDuration: '10s' }}>
                </div>
            </div>
        )
    }
    
    return (
        <main>
            <h1 className='font-bold md:text-4xl'>Welcome to Admin Page</h1>
            {!isLoading ? <h3 className='text-xs md:text-base'>User: {username} - {user?.email} - {role}</h3> : <h1>Loading User ...</h1>}
            {!isLoading && !loadingProducts ? <ProductAdminTable productsByEmail={productsByEmail}/> : <h1>Loading Data ...</h1>}
        </main>
    )
}

export default AdminPage