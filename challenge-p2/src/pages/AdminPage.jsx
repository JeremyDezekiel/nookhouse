import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminPage() {
    const navigate = useNavigate('')

    useEffect (() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
            } else {
                navigate('/login')
            }
        })

        return () => unsubscribe()
    }, [])

    return (
        <div>Welcome to Admin Page</div>
    )
}

export default AdminPage