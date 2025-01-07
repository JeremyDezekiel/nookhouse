import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function AdminPage() {
    const { user, isLoading } = useContext(AuthContext)
    const navigate = useNavigate('')

    useEffect (() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
    }, [user, isLoading])
    
    if (isLoading) return <h1>Loading ...</h1>

    return (
        <main>
            <h1 className='font-bold text-4xl'>Welcome to Admin Page</h1>
            <h3>User: {user?.email}</h3>
        </main>
    )
}

export default AdminPage