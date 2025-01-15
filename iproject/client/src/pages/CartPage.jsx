import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'

function CartPage() {
    const { user, isLoading } = useContext(AuthContext)
    const { id } = useParams()

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