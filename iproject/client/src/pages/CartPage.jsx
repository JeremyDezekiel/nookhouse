import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function CartPage() {
    const { user, isLoading } = useContext(AuthContext)
    const navigate = useNavigate()
    const id = user?.uid

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
    }, [user, isLoading])

    return (
        <div>CartPage {id}</div>
    )
}

export default CartPage